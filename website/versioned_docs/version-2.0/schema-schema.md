---
id: version-2.0-schema
title: Schema Definition
original_id: schema
---

In order for GraphQL to register your types/mutations/queries, we must create a schema file.

## Object Types

Object Types are the primary building blocks of a GraphQL schema. They describe the types of objects available from your API and which fields that can be queried. In terms of Laravel, they will likely represent most of your Eloquent models.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  created_at: String!
  updated_at: String
}
```

### Queries

Every GraphQL schema should have a `Query` type which serves as an "entry point" and allows clients to query the data in your API.

```graphql
type Query {
  me: User
}
```

### Mutations

In order to change data such as creating/updating/deleting, a `Mutation` type should be added to your schema.

```graphql
type Mutation {
  login(username: String!, password: String!): User
}
```

## Scalar Types

Scalar types are custom types that require a `directive` (which we'll learn about later) to serialize, deserialize and validate values.

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
