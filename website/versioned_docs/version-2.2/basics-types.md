---
id: version-2.2-types
title: Types
original_id: types
---

A GraphQL schema is made out of types. This section describes the different set of types
and how they can be defined to work with Lighthouse. For a more in-depth reference about types,
look into the [GraphQL documentation](https://graphql.org/learn/schema/)

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

type Query {
  users: [User!]!
  user(id: ID!): User
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
  updated_at: DateTime
}
```

To register scalars with Lighthouse, you need to define them in your schema and
use the [@scalar](directives#scalar) directive to point to an implementing class.
[Learn how to implement your own scalar.](http://webonyx.github.io/graphql-php/type-system/scalar-types/)

## Enum Types

Enums are types with a restricted set of values (similar to `enum` found in database migrations).
They are defined as a list of `UPPERCASE` string keys. You can define the actual values through
the [@enum](directives#enum) directive.


```graphql
enum EmploymentStatus {
  INTERN @enum(value: 0)
  EMPLOYEE @enum(value: 1)
  TERMINATED @enum(value: 2)
}
```

Now we can use the enum as part of our schema.

```graphql
type Employee {
  id: ID!
  name: String
  status: EmploymentStatus!
}

type Query {
  employees: [Employee!]! @all
}
```

In this example, the underlying values are actually integers. When the models are retrieved from
the database, the mapping is applied and the integers are converted to the defined string keys.

Queries now return meaningful names instead of magic numbers.

```graphql
{
  employees {
    name
    status
  }
}
```


```json
{
  "data": {
    "employees": [
      {"name": "Hans", "status": "INTERN"},
      {"name": "Pamela", "status": "EMPLOYEE"},
      {"name": "Gerhard", "status": "FIRED"}
    ]
  }
}
```

## Input Types

Input types can be used to describe complex objects for for field arguments.
Beware that while they look similar to Object Types, they behave differently:
The fields of an Input Type are treated similar to arguments.

```graphql
input CreateUserInput {
  name: String!
  email: String
}

type User {
  id: ID!
  name: String!
  email: String
}

type Mutation {
  createUser(input: CreateUserInput!): User
} 
```

## Interface Types

The GraphQL `interface` type is similar to a PHP `Interface`.
It defines a set of common fields that all implementing types must also provide.
A common use-case for interfaces with a Laravel project would be polymorphic relationships.

```graphql
interface Named @interface(resolver: "App\\GraphQL\\Interfaces\\Named@resolveType"){
  name: String!
}
```

Object types can implement that interface, given that they provide all its fields.

```graphql
type User implements Named {
  id: ID!
  name: String!
}
```

The following definition would be invalid.

```graphql
type User implements Named {
  id: ID!
}
```

Interfaces need a way of determining which concrete Object Type is returned by a
particular query. Use the [@interface](directives#interface) directive to return a concrete implementation.

Read more about them in the [GraphQL Reference](https://graphql.org/learn/schema/#interfaces) and the
[docs for graphql-php](http://webonyx.github.io/graphql-php/type-system/interfaces/)

## Union Types

A Union is an abstract type that simply enumerates other Object Types.
They are similar to interfaces in that they can return different types, but they can not
have fields defined.

```graphql
union Person @union(resolver: "App\\GraphQL\\UnionResolver@person") =
    User
  | Employee

type User {
  id: ID!
}

type Employee {
  employeeId: ID!
}
```

Unions need a way of determining which concrete Object Type is returned by a
particular query. Use the [@union](directives#union) directive to return a concrete implementation.

Read more about them in the [GraphQL Reference](https://graphql.org/learn/schema/#union-types) and the
[docs for graphql-php](http://webonyx.github.io/graphql-php/type-system/unions/)
