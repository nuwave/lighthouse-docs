---
id: version-2.1-directives-crud
original_id:   
title: Eloquent CRUD
original_id: directives-crud
---

Lighthouse provides some directives to make basic CRUD a breeze.

<br />
[**@create** directive](#create)<br />
[**@update** directive](#update)<br />
[**@delete** directive](#delete)<br />
<br />

## @create

The `@create` directive can be used to create a new model. It requires a `model` argument which should be the namespace of the model you want to create. In the following example, the `createPost` mutation will autofill a new `Post` eloquent model with the `title` and `content` arguments.

Most of the time, you'll likely need to grab something like the authenticated user's `id` and inject it into the arguments (since we don't want the client to decide what user `id` to fill). In that case, use `@create` with the `@inject` directive (listed below).

```graphql
type Mutation {
  createPost(title: String!, content: String!): Post @create(model: "App\\Post")
}
```

## @update

The `@update` directive can be used to find and fill a model from the database. It requires a `model` argument as well and a field marked with the `ID` type.

```graphql
type Mutation {
  updatePost(id: ID!, content: String, title: String): Post
    @update(model: "App\\Post")
}
```

## @delete

The `@delete` directive can be used to delete a model with a given id field. The field must be an `ID` type.

```graphql
type Mutation {
  deletePost(id: ID!): Post @delete
  # If you use global ids, you can set the `globalId` argument to true like so:
  deletePost(id: ID!): Post @delete(globalId: true)
}
```
