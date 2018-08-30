---
id: directives
title: Directives
---

## @auth

Return the currently authenticated user as the result of a query.

```graphql
type Query {
  me: User @auth
}
```

## @all

Fetch all Eloquent models for a field.

```graphql
type Query {
  users: [User] @all
}
```

## @belongsTo

Eager loads the eloquent relationship so it should only be used on a type that resolved to an Eloquent model. The `@belongsTo` directive accepts a `relation` argument if your relationship has a different name than the field. For example, let's assume we have the following models:

```php
class User extends Model {
  // ...
}

class Post extends Model {
  // ...
  public function author()
  {
      return $this->belongsTo(User::class);
  }
}
```

## @bcrypt

Run the `bcrypt` function on the argument it is defined on.

```graphql
type Mutation {
  createUser(name: String, password: String @bcrypt): User
    @field(resolver: "App\\Http\\GraphQL\\Mutators\\UserMutator@create")
}
```

When you resolve the field, the argument will hold the `bcrypt` value.

```php
class UserMutator
{
    public function create($root, array $args)
    {
        return User::create([
          'name' => $args['name'],
          // This will be the bcrypt value of the password argument
          'password' => $args['password']
        ]);
    }
}
```

## @can

Check a Laravel Policy to ensure the current user is authorized to access a field.
Set the name of the policy and the model to check against.

```graphql
type Mutation {
  createPost(input: PostInput): Post @can(if: "create", model: "App\\Post")
}
```

This is currently limited to doing [general checks on a resource and not a specific instance](https://laravel.com/docs/5.6/authorization#methods-without-models).
The defined functions receive the currently authenticated user.

```php
class PostPolicy
{
    public function create(User $user): bool
    {
        return $user->is_admin;
    }
}
```

## @complexity

Place on fields to perform analysis to calculate a query complexity score before execution. [Read More](http://webonyx.github.io/graphql-php/security/#query-complexity-analysis)

```graphql
type Query {
  posts: [Post!]! @complexity
}
```

You can provide your own function to calculate complexity.

```graphql
type Query {
  posts: [Post!]!
    @complexity(resolver: "App\\Security\\ComplexityAnalyzer@userPosts")
}
```

## @create

Applies to fields to create a new Eloquent model with the given arguments.

```graphql
type Mutation {
  createPost(title: String!): Post @create
}
```

## @delete

Delete a model with a given id field. The field must be an `ID` type.

```graphql
type Mutation {
  deletePost(id: ID!): Post @delete
  # If you use global ids, you can set the `globalId` argument to true like so:
  deletePost(id: ID!): Post @delete(globalId: true)
}
```

## @field

Specify a custom resolver function for a single field.
You can either pass in seperate arguments for `class` and `method`, or add both in
a single argument `resolver` and seperate them with an `@` symbol.


```graphql
type Mutation {
  createPost(title: String!): Post
    @field(class: "App\\Http\\GraphQL\\Mutations\\PostMutator", method: "create")
}
```

Be aware you can this this to resolve any kind of field, so you may also use this to
transform scalars.

```graphql
type User {
  created_at: String!
    @field(resolver: "App\\Http\\GraphQL\\Types\\UserType@created_at")
}
```

## @find

Find a model based on the arguments provided.

```graphql
type Query {
  userById(id: ID!): User @find(model: "App\\User")
}
```

This throws when more then one result is returned.
Use [@first](#first) if you can not ensure that.

## @first

Get the first query result from a collection of Eloquent models.

```graphql
type Query {
  userByFirstName(first_name: String!): User @first(model: "App\\User")
}
```

Other then [@find](#find), this will not throw an error if more then one items are in the collection.

## @enum

Map the underlying value to an enum key. When dealing with the Enum type in your code,
you will recieve the defined value instead of the string key.

```graphql
enum Role {
  ADMIN @enum(value: 1)
  EMPLOYEE @enum(value: 2)
}
```

## @eq

Place an equal operator on a eloquent query.

```graphql
type User {
  # this will filter a user's posts by the category.
  postsByCategory(category: String @eq): [Post] @hasMany
}
```

## @event

Fire an event after a mutation has taken place. It requires the `fire` argument that should be the class name of the event you want to fire.

```graphql
type Mutation {
  createPost(title: String!, content: String!): Post
    @event(fire: "App\\Events\\PostCreated")
}
```

## @globalId

Convert a globalId field back to it's original id. This can be useful for mutations that accept a global id, but you need the original id to query the database.

```graphql
type Mutation {
  # In your resolver the $args['id'] will be the original id of the post
  updatePost(id: ID! @globalId, title: String): Post
}
```

## @group

Apply common settings to all fields of an Object Type.

Simplify field directive definitions by defining a common namespace.

```graphql
extend type Query @group(namespace: "App\\Models") {
  activeUsers @field(resolver: "User@getActiveUsers")
}
```

Set common middleware on a set of Queries/Mutations.

```graphql
type Mutation @group(middleware: ["api:auth"]) {
  createPost(title: String!): Post
}
```

## @hasMany

Corresponds to [Eloquent's HasMany-Relationship](https://laravel.com/docs/eloquent-relationships#one-to-many).

```graphql
type User {
  posts: [Post!]! @hasMany
}
```

You can return the related models paginated by setting the `type`.

```graphql
type User {
  postsPaginated: [Post!]! @hasMany(type: "paginator")
  postsRelayConnection: [Post!]! @hasMany(type: "connection")
}
```

If the name of the relationship on the Eloquent model is different than the field name,
you can override it by setting `relation`.

```graphql
type User {
  posts: [Post!]! @hasMany(relation: "articles")
}
```

## @hasOne

Corresponds to [Eloquent's HasOne-Relationship](https://laravel.com/docs/eloquent-relationships#one-to-one).

```graphql
type User {
  phone: Phone @hasOne
}
```

If the name of the relationship on the Eloquent model is different than the field name,
you can override it by setting `relation`.

```graphql
type User {
  phone: Phone @hasOne(relation: "telephone")
}
```

## @in

Filter a column by an array.

```graphql
type Query {
  # this will filter a user's posts by the category id(s).
  postsByCategory(category_id: [Int] @in): [Post] @hasMany
}
```

## @inject

Inject a value from the context object into the arguments. This is really useful with the `@create` directive that rely on the authenticated user's `id` that you don't want the client to fill in themselves.

```graphql
type Mutation {
  createPost(title: String!, content: String!): Post
    @create(model: "App\\Post")
    @inject(context: "user.id", name: "user_id")
}
```

## @interface

Define interface types in your schema.
Set the `resolver` argument to a function that returns the implementing Object Type.

```graphql
interface Commentable @interface(resolver: "App\\GraphQL\\Interfaces\\Commentable@resolveType") {
  id: ID!
}
```

The function receives the value of the parent field as its single argument and must
return an Object Type. Get the appropriate Object Type from Lighthouse's type registry.

```php
class Commentable
{
    public function resolveType($value): \GraphQL\Type\Definition\ObjectType
    {
        if ($value instanceof \App\Post) {
            return graphql()->types()->get('Post');
        } else if ($value instanceof \App\Video) {
            return graphql()->types()->get('Video');
        }
    }
}
```

## @method

Call a method on the target model.
This comes in handy if the data is not accessible as an attribute (e.g. `$model->myData`)
but rather via a method like `$model->myData()`. It requires the `name` argument.

```graphql
type User {
  mySpecialData: String! @method(name: "findMySpecialData")
}
```

## @middleware

Run middleware on a specific field.

```graphql
type Query {
  # the "auth:api" middleware will be run prior to resolving the list of users
  users: [User] @middleware(checks: ["auth:api"])
}
```

## @model

Enable fetching an Eloquent model by its global id, may be used for Relay.
Behind the scenes, Lighthouse will decode the global id sent from the client to find the model by it's primary id in the database.

```graphql
type User @model(class: "App\\User") {
  id: ID! @globalId
}
```

## @neq

Place a not equals operator `!=` on an Eloquent query.

```graphql
type User {
  # this will filter a user's posts that do not have the provided category.
  postsByCategory(category: String @neq): [Post] @hasMany
}
```

## @node

Store a type's resolver functions in Lighthouse's node registry. The `@node` directive requires the `resolver` argument which will be passed the id so you can resolve the type (whether it be from your DB or a third-party service's REST API).

```graphql
type User @node(resolver: "App\\GraphQL\\NodeResolver@resolveUser") {
  name: String!
}
```

## @notIn

Filter a column by an array.

```graphql
type Query {
  # this will filter a user's posts that are not in the array of id(s).
  postsByCategory(category_id: [Int] @notIn): [Post] @hasMany
}
```

## @paginate

Return a paginated list of Eloquent models. This transforms the schema definition and automatically adds additional arguments
and types.

The `type` of pagination can be `paginator` (default) or `connection` (for Relay).

```graphql
type Query {
  posts: [Post] @paginate
  postsRelay: [Post] @paginate(type: "connection")
}
```

## @rename

Rename an argument on the server side, e.g. convert from snake_case to camelCase.

```graphql
type User {
  createdAt: String! @rename(attribute: "created_at")
}
```

## @rules

Validate an argument using [Laravel's built-in validation rules](https://laravel.com/docs/5.6/validation#available-validation-rules).
Can be defined on Field Arguments and Input Object Values.

```graphql
type Query {
  users(
    countryCode: String @rules(apply: ["string", "size:2"])
  ): User
}

input CreatePostInput {
  title: String @rules(apply: ["required"])
  content: String @rules(apply: ["min:50", "max:150"])
}
```

You can customize the error message for a particular argument.

```graphql
@create(apply: ["max:140"], message: "Tweets have a limit of 140 characters")
```

To use a completely custom validator, use the [@validate](#validate) directive.

## @scalar

Point Lighthouse to your scalar definition class.
[Learn how to implement your own scalar.](http://webonyx.github.io/graphql-php/type-system/scalar-types/)

```graphql
scalar DateTime @scalar
```

Pass the class name if it is different from the scalar type.

```graphql
scalar DateTime @scalar(class: "DateTimeScalar")
```

Lighthouse looks for scalar classes in the default namespace defined in the configuration.
You may override that by passing a fully qualified class name.

```graphql
scalar DateTime @scalar(class: "App\\GraphQL\\Scalars\\DateTimeScalar")
```

## @update

Update an Eloquent model.

```graphql
type Mutation {
  updatePost(id: ID!, content: String): Post @update
}
```

If the name of the Eloquent model does not match the return type of the field, set it with the `model` argument.

```graphql
type Mutation {
  updateAuthor(id: ID!, name: String): Author
    @update(model: "App\\User")
}
```

## @union

Point Lighthouse to the function used to determine which implementation a value represents. [Read More](http://webonyx.github.io/graphql-php/type-system/unions/)

```graphql
type User {
  id: ID!
}

type Employee {
  employeeId: ID!
}

union Person @union(resolver: "App\\GraphQL\\UnionResolver@person") =
    User
  | Employee
```

The function receives the value of the parent field as its single argument and must
return an Object Type. Get the appropriate Object Type from Lighthouse's type registry.

```php
class UnionResolver
{
    public function person($value): \GraphQL\Type\Definition\ObjectType
    {
        if ($value instanceof \App\User) {
            return graphql()->types()->get('User');
        } else if ($value instanceof \App\Employee) {
            return graphql()->types()->get('Employee');
        }
    }
}
```

## @validate

Use a custom validator class for validating the contents of a complete field.
The validator class must extend `Nuwave\Lighthouse\Support\Validator\Validator`.

```graphql
type Mutation {
  createUser @validate(validator: "App\\GraphQL\\Validators\\CreateUserValidator")(
    name: String
    email: String
  ): User
}
```

In most cases, it is sufficient to define inline rules directly on your arguments,
use the [@rules](#rules) directive.

## @where

Filter a column by a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts have a title "like" the argument provided.
  postsSearchTitle(title: String! @where(operator: "like")): [Post] @hasMany

  # this will filter a user's posts by year (note the "clause" argument)
  postsByYear(created_at: Int! @where(clause: "whereYear")): [Post] @hasMany
}
```

## @whereBetween

Filter a column by a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts between a set of dates.
  postsBetweenDates(
    start_date: String! @whereBetween(key: "created_at")
    end_date: String! @whereBetween(key: "created_at")
  ): [Post] @hasMany
}
```

## @whereNotBetween

Filter a column outside a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts that are not between the provided dates.
  postsBetweenDates(
    start_date: String! @whereNotBetween(key: "created_at")
    end_date: String! @whereNotBetween(key: "created_at")
  ): [Post] @hasMany
}
```
