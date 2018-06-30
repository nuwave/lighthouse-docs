---
id: version-2.1-directives-schema
title: Schema Directives
original_id: directives-schema
---

Lighthouse has several directives that help define your schema.

<br />
[**@field** directive](#field)<br />
[**@enum** directive](#enum)<br />
[**@interface** directive](#interface)<br />
[**@scalar** directive](#scalar)<br />
[**@union** directive](#union)<br />
<br />

## @field

The `@field` directive points to a class and method used to resolve a field. This can be use to resolve a query or mutation field, or you could also use it to manipulate the output of a field on a registered type (i.e., format a Carbon instance)

```graphql
type User {
  created_at: String!
    @field(resolver: "App\\Http\\GraphQL\\Types\\UserType@created_at")
}

type Mutation {
  createPost(title: String!): Post
    @field(resolver: "App\\Http\\GraphQL\\Mutations\\PostMutator@create")
  updatePost(title: String!): Post
    @field(resolver: "App\\Http\\GraphQL\\Mutations\\PostMutator@update")
  deletePost(title: String!): Post
    @field(resolver: "App\\Http\\GraphQL\\Mutations\\PostMutator@delete")
}
```

## @enum

The `@enum` directive allows you to quickly define the value used to represent a GraphQL enum type.

```graphql
enum Role {
  ADMIN @enum(value: "admin")
  EMPLOYEE @enum(value: "employee")
}
```

## @interface

The `@interface` directive can be used when defining Interfaces in your schema. It requires a `resolver` argument so Lighthouse knows how to resolve the interface.

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

## @scalar

The `@scalar` directive can be used to point Lighthouse to your scalar definition class. [Read More](http://webonyx.github.io/graphql-php/type-system/scalar-types/)

```graphql
scalar DateTime @scalar(class: "App\\GraphQL\\Scalars\\DateTimeScalar")
```

## @union

The `@union` directive point Lighthouse to the function used to determine which implementation a value represents. [Read More](http://webonyx.github.io/graphql-php/type-system/unions/)

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
