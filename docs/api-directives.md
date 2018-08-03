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
type User {
  posts: [Post!]! @complexity @hasMany
}

# if you would like to calculate complexity w/ your own function:
type User {
  posts: [Post!]!
    @complexity(resolver: "App\\Security\\ComplexityAnalyzer@userPosts")
    @hasMany
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

Be aware you can this this to resolve any kind of field, so you may also use this to
transform scalars.

```graphql
type User {
  created_at: String!
    @field(resolver: "App\\Http\\GraphQL\\Types\\UserType@created_at")
}

type Mutation {
  createPost(title: String!): Post
    @field(class: "App\\Http\\GraphQL\\Mutations\\PostMutator", method: "create")
}
```

## @find

Find a model based on the arguments provided.

_Note: You should provide unique fields to search by, if more than one model is returned an error will be thrown._

```graphql
type Query {
  userById(id: ID!): User @find(model: "App\\User")
}
```

## @first

The `@first` directive is similar to `@find`, however,
if more than one model is found it will return the first item rather than throwing an error.

```graphql
type Query {
  userByFirstName(first_name: String!): User @first(model: "App\\User")
}
```

## @enum

Define the value used to represent a GraphQL enum type.

```graphql
enum Role {
  ADMIN @enum(value: "admin")
  EMPLOYEE @enum(value: "employee")
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

## @hasMany

Corresponds to Eloquent's HasMany-Relationship.


 

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

Define Interfaces in your schema. It requires a `resolver` argument so Lighthouse knows how to resolve the interface.

_A common use-case for interfaces with a Laravel project would be polymorphic relationships._

```graphql
interface Commentable
  @interface(
    resolver: "App\\Http\\GraphQL\\Interfaces\\Commentable@resolveType"
  ) {
  id: ID!
}

type Post implements Commentable {
  id: ID!
  # ...
}

type Video implements Commentable {
  id: ID!
  # ...
}

type Comment {
  # ...

  # resolves to either a Video or Post type
  commentable: Commentable
}
```

```php
class Commentable
{
    public function resolveType($value)
    {
        if ($value instanceof \App\Post) {
            return schema()->instance('Post');
        } else if ($value instanceof \App\Video) {
          return schema()->instance('Video');
        }

        return null;
    }
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

## @scalar

Point Lighthouse to your scalar definition class. [Read More](http://webonyx.github.io/graphql-php/type-system/scalar-types/)

```graphql
scalar DateTime @scalar(class: "App\\GraphQL\\Scalars\\DateTimeScalar")
```

## @security

Set [security rules](http://webonyx.github.io/graphql-php/security/). Must be used on the `Query` type.

```graphql
type Query @security(depth: 4, complexity: 100, introspection: false) {
  #...
}
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

## @validate

Validate the input of a field by setting an array of [Laravel validation rules](https://laravel.com/docs/5.6/validation#available-validation-rules)

```graphql
type Mutation {
  createUser(
    name: String @validate(rules: ["required", "min:4"])
    email: String @validate(rules: ["required", "email", "unique:users,email"])
  ): User
}
```

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
