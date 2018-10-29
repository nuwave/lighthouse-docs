---
id: version-2.2-schema-organization
title: Schema organization
original_id: schema-organization
---

As you add more and more types to your schema, it can grow quite large.
Learn how to split your schema across multiple files and organize your types.

## Schema Imports

Suppose you created your schema files likes this:

```
graphql/
|-- schema.graphql
|-- user.graphql
```

Lighthouse reads your schema from a single entrypoint, in this case `schema.graphql`.
You can import other schema files from there to split up your schema into multiple files.

```graphql
type Query {
  user: User
}

#import user.graphql
```

Imports always begin on a seperate line with `#import `, followed by the relative path
to the imported file. The contents of `user.graphql` are new pasted in the final schema.

```graphql
type Query {
  user: User
}

type User {
    name: String!
}
```

The import statements are followed recursively, so it is easy to organize even the most complex of schemas.

## Type Extensions

Suppose you want to add a new type `Post` to your schema. First step, you create a new file `post.graphql`
to contain the schema for that type.

```graphql
type Post {
  title: String
  author: User @belongsTo
}
```

Then you add an import to your main schema file.
    
    #import post.graphql

Now you want to add a few queries to actually fetch posts. You could add them to the main `Query` type
in your main file, but that spreads the definition apart and could also grow quite large over time.
Another way would be to extend the `Query` type and colocate the type definition with its Queries in `post.graphql`.

```graphql
type Post {
  title: String
  author: User @belongsTo
}

extend type Query {
  posts: [Post] @paginate
}
```
