---
id: introduction
title: Introduction
---

Lighthouse allows you to create a [GraphQL](http://facebook.github.io/graphql/) Server with [Laravel](https://laravel.com/docs). This package extends [graphql-php](https://github.com/webonyx/graphql-php) and works with [Relay Modern](https://facebook.github.io/relay/), [Apollo Client](https://www.apollographql.com/client), [urql](https://github.com/FormidableLabs/urql) and any other client that works with GraphQL backends (or that are capable of making POST requests).

Lighthouse v2.0 takes a step closer to "schema first" development by allowing you to create `.graphql` schema file(s) to describe your data while leveraging a directives to enhance/customize the schema to fit your data requirements.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]! @hasMany
}

type Post {
  id: ID!
  title: String!
  content: String!
  created_at: String!
  updated_at: String
  author: User @belongsTo
}

type Query {
  me: User @auth
}
```

With just this schema file (along w/ Eloquent models and migrations set up), you have a fully functioning GraphQL server with no additional code! The docs will walk you through what directives are available, how you can create your own and how to create your own resolvers, so let's get started!
