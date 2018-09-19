---
id: version-2.1-directives-misc
title: Miscellaneous
original_id: directives-misc
---

<br />
[**@inject** directive](#inject)<br />
[**@rename** directive](#rename)<br />
<br />

## @inject

The `@inject` directive can be used to inject a value from the context object into the arguments. This is really useful with the `@create` directive that rely on the authenticated user's `id` that you don't want the client to fill in themselves.

```graphql
type Mutation {
  createPost(title: String!, content: String!): Post
    @create(model: "App\\Post")
    @inject(context: "user.id", name: "user_id")
}
```

## @rename

The `@rename` directive can be used to rename a field on the server side. This comes in handy if you want to use snake_case on the server side but camelCase on the client side. It requires the `attribute` argument

```graphql
type User {
  createdAt: String! @rename(attribute: "created_at")
}
```
