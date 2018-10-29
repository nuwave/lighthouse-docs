---
id: version-2.0-schema-scalars
title: Scalar types
original_id: schema-scalars
---

As we learned earlier, we can use Scalar types to serialize, deserialize and validate values. 
To use these scalar types we have to define them in our schema.

## DateTime

If you are using Eloquent, it is very likely that your `created_at` and `updated_at` fields are returned as a [Carbon](https://carbon.nesbot.com/) instance.
A DateTime scalar type can be used to return these fields correcly in your API. You can use it inside your schema like this:

```graphql
scalar DateTime @scalar(class: "Nuwave\\Lighthouse\\Schema\\Types\\Scalars\\DateTime")

type User {
  id: ID!
  name: String!
  email: String!
  created_at: DateTime!
  updated_at: DateTime
}
```

The DateTime scalar deserializes the Carbon instance into a `Y-m-d H:i:s` format when the field is selected by the GraphQL consumer. 
When you are using mutations to persist data to your database, it also expects this format. 
