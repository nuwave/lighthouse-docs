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

Fetch all Eloquent models and return the collection as the result for a field.

```graphql
type Query {
  users: [User!]! @all
}
```

This assumes your model has the same name as the type you are returning and is defined
in the default model namespace `App\Models`. [You can change this configuration](configuration). 

If you need to use a different model for a single field, you can pass a class name as the `model` argument.

```graphql
type Query {
  posts: [Post!]! @all(model: "App\\Blog\\BlogEntry")
}
```

## @belongsTo

Resolves a field through the Eloquent `BelongsTo` relationship.

```graphql
type Post {
  author: User @belongsTo
}
```

It assumes both the field and the relationship method to have the same name.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model 
{
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

The directive accepts an optional `relation` argument if your relationship method
has a different name than the field.

```graphql
type Post {
  user: User @belongsTo(relation: "author")
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
Pass a class and a method to the `resolver` argument and seperate them with an `@` symbol.

```graphql
type Mutation {
  createPost(title: String!): Post
    @field(resolver: "App\\Http\\GraphQL\\Mutations\\PostMutator@create")
}
```

By default, Lighthouse looks for a class with the capitalized name of the field in `App\Http\GraphQL\Queries`
or `App\Http\GraphQL\Mutations` and calls its `resolve` function with [the usual resolver arguments](). If you stick to that convention,
you will not need to specify a directive at all.

For example, the following field expects a class at `App\Http\GraphQL\Queries\LatestPost` that has a `public function resolve($rootValue, array $args, $context, ResolveInfo $resolveInfo)`

```graphql
type Query {
  latestPost: Post!
}
```

Be aware you can this this to resolve any kind of field, so you may also use this to
transform the value of scalar fields, e.g. reformat a date.

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
  userById(id: ID! @eq): User @find(model: "App\\User")
}
```

This throws when more then one result is returned.
Use [@first](#first) if you can not ensure that.

## @first

Get the first query result from a collection of Eloquent models.

```graphql
type Query {
  userByFirstName(first_name: String! @eq): User @first(model: "App\\User")
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

Converts an ID to a global ID.

```graphql
type User {
  id: ID! @globalId
  name: String
}
```

Instead of the original ID, the `id` field will now return a base64-encoded String that globally identifies the User and can be used
for querying the `node` endpoint.

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

Store a type's resolver functions in Lighthouse's node registry.
The `resolver` argument has to specify a function which will be passed the
decoded `id` and resolves to a result.

```graphql
type User @node(resolver: "App\\GraphQL\\NodeResolver@resolveUser") {
  name: String!
}
```

```php
public function resolveUser(string $id): \App\User
```

The `typeResolver` is responsible for determining the GraphQL type the result
belongs to. Lighthouse provides a default implementation, but you can override
it if the need arises.

```grapqhl
type User @node(
  resolver: "App\\GraphQL\\NodeResolver@resolveUser"
  typeResolver: "App\\GraphQL\\NodeResolver@resolveNodeType"
  ) {
  name: String!
}
```

```php
public function resolveNodeType($value): \GraphQL\Type\Definition\Type
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

Return a paginated list. This transforms the schema definition and automatically adds
additional arguments and inbetween types.

```graphql
type Query {
  posts: [Post!]! @paginate
}
```

The `type` of pagination defaults to `paginator`, but may also be set to a Relay
compliant `connection`.

```graphql
type Query {
  posts: [Post!]! @paginate(type: "connection")
}
```

By default, this looks for an Eloquent model in the configured default namespace, with the same
name as the returned type. You can overwrite this by setting the `model` argument.

```graphql
type Query {
  posts: [Post!]! @paginate(model: "App\\Blog\\BlogPost")
}
```

If simply querying Eloquent does not fit your use-case, you can specify a custom `builder`.


```graphql
type Query {
  posts: [Post!]! @paginate(builder: "App\\Blog@visiblePosts")
}
```

Your method receives the typical resolver arguments and has to return an instance of `Illuminate\Database\Query\Builder`.

```php
<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use GraphQL\Type\Definition\ResolveInfo;

class Blog
{
    public function visiblePosts($root, array $args, $context, ResolveInfo $resolveInfo): Builder
    {
        return DB::table('posts')
            ->where('visible', true)
            ->where('posted_at', '>', $args['after']);
    }
}
```

## @rename

Rename a field on the server side, e.g. convert from snake_case to camelCase.

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

Specify that an argument is used as a [where filter](https://laravel.com/docs/5.7/queries#where-clauses).

You can specify simple operators:

```graphql
type Query {
  postsSearchTitle(title: String! @where(operator: "like")): [Post] @hasMany
}
```

Or use the additional clauses that Laravel provides:

```graphql
type Query {
  postsByYear(created_at: Int! @where(clause: "whereYear")): [Post] @hasMany
}
```

## @whereBetween

Verify that a column's value is between two values.

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

Verify that a column's value lies outside of two values.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  postsBetweenDates(
    start_date: String! @whereNotBetween(key: "created_at")
    end_date: String! @whereNotBetween(key: "created_at")
  ): [Post] @hasMany
}
```
