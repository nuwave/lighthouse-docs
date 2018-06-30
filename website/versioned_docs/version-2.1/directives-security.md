---
id: version-2.1-directives-security
original_id:   
title: Security
original_id: directives-security
---

Security directives can be used to limit access to certain fields in your schema.

<br />
[**@auth** directive](#auth)<br />
[**@can** directive](#can)<br />
[**@complexity** directive](#complexity)<br />
[**@middleware** directive](#middleware)<br />
[**@group** directive](#group)<br />
[**@security** directive](#security)<br />
<br />

## @auth

The `@auth` directive provides the currently authenticated user. This comes in handy on the root query. For example:

```graphql
type Query {
  me: User @auth
}
```

Sending the following query will return the authenticated user, or if the request is not authenticated null will be returned.

```graphql
query Me {
  me {
    name
    email
  }
}
```

## @can

The `@can` directive can be used to check a Laravel Policy to ensure the user is authorized to perform an action on a certain field.

```graphql
type Mutation {
  createUser(input: UserInput): User
    # This will check if the authenticated user has the `create` policy on the `App\User` model,
    # if not, an authorization error will be thrown.
    @can(if: "create", model: "App\\User")
}
```

## @complexity

The `@complexity` directive can be placed on fields to perform analysis to calculate a query complexity score before execution. [Read More](http://webonyx.github.io/graphql-php/security/#query-complexity-analysis)

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

## @middleware

The `@middleware` directive can be used to run middleware on a selected field(s).

```graphql
type Query {
  # the "auth:api" middleware will be run prior to resolving the list of users
  users: [User] @middleware(checks: ["auth:api"])
}
```

## @group

The `@group` directive can be handy when you want to place middleware on a set of fields.

```graphql
# the "auth:api" middleware will be run on all fields
type Query @middleware(checks: ["auth:api"]) {
  users: [User]
  posts: [Post]
}
```

## @security

The `@security` directive can be used to set a max depth or max complexity. It must be used on the `Query` type.

```graphql
type Query @security(depth: 4, complexity: 100) {
  #...
}
```

type Query @security(depth: 3) {
me: String
}
