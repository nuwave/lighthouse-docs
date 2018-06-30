---
id: version-2.1-schema-extending
title: Extending the Schema
original_id: schema-extending
---

GraphQL allows you to "extend" your schema type definitions. This is great for dividing up your GraphQL schema into multiple files to keep your types organized. In the example below, we have the original `Query` type defined with the `me` field (which will return the authenticated user since it has the `@auth` directive assigned). In a separate file, we define a `Post` type and we "extend" the `Query` type to add the `posts` field.

_Note: to import other .graphql files, just use the `#import ./file.graphql` syntax_

```graphql
# routes/schema.graphql

#import ./posts.graphql
type Query {
  me: User
}

# routes/posts.graphql
type Post {
  title: String
  # ...
}

extend type Query {
  posts: [Post] @paginate(model: "App\\Post")
}
```
