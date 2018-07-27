---
id: types
title: Types
---

A GraphQL schema is made out of types. This section describes the different set of types
and how they can be defined to work with Lighthouse. For a more in-depth reference about types,
look into the [GraphQL documentation](https://graphql.org/learn/schema/)

<br/>

## Object Types

Object types define the resources of your API and are closely related to Eloquent models.
They must have a unique name and have a set of fields.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  created_at: String!
  updated_at: String
}
```

## Scalar

Scalar types are the most basic elements of a GraphQL schema. There are a
few built in scalars, such as `String` or `Int`. You can also define your own and
use them in your schema.

```graphql
scalar DateTime @scalar

type User {
  ...
  created_at: DateTime!
  updatedAt: DateTime
}
```

## Enum Types

Enums are custom scalars with a restricted set of values (similar to `enum` found in database migrations). Enums also require a `directive` which we will cover later.

```graphql
enum Status {
  INTERN @enum(value: "intern")
  EMPLOYEE @enum(value: "employee")
  TERMINATED @enum(value: "terminated")
}
```

## Input Types

Input types can be used to describe complex objects for for field arguments.

```graphql
input CreateUserInput {
  name: String!
  email: String!
  password: String!
  password_confirmation: String!
}
```

## Interface Types

A GraphQL `interface` is similar to a PHP `interface`. It's an abstract type which describes the fields which must be included.

```graphql
interface Model {
  id: ID!
  created_at: String!
  updated_at: String!
}
```

## Union Types

Union types are almost identical to `Interfaces` except you don't define `fields` on them. They require `directives` which we will discuss later.

```graphql
union Person @union(resolver: "PersonUnion") = User | Employee
```
