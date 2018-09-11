---
id: resolvers
title: Resolvers
---

To fetch data from your GraphQL endpoint, you need to define resolvers for your fields.
Lighthouse makes this easy by providing easy to use, pre-built resolvers that work
great together with your Eloquent models.

<br/>

## Hello World!

As is the tradition of our people, this section will teach you how to say "hello world!" through Lighthouse.
The most basic form of defining a resolver is to use the [@field](directives#field) directive.

```graphql
type Query {
  hello: String! @field(resolver: "App\\GraphQL\\Hello@resolve") 
}
```

You need to implement the actual resolver in the class that was specified.

```php
<?php

namespace App\GraphQL;

class Hello
{
    public static function resolve(): string
    {
        return 'world!';
    }
}
```

Now your schema can be queried.

```graphql
{
  hello
}
```

And will return the following response:

```json
{
  "data": {
    "hello": "world!"
  }
}
```

## Query data

Lighthouse provides many resolvers that are already built-in, so you do not have to define them yourself.
The following is not a comprehensive list of all resolvers but should give you an idea of what you can do.

### Fetch a list of models

Since you are already using Laravel, you might as well use Eloquent to fetch the data for your Query.
Let's say you defined your `User` type like this:

```graphql
type User {
  id: ID!
  name: String!
}
```

Instead of defining your own resolver manually, you can just rely on Lighthouse to build the Query for you.

```graphql
type Query {
  users: [User!]! @all
}
```

The [@all](directives#all) directive will assume the name of your model to be the same as
the return type of the Field you are trying to resolve and automatically uses Eloquent to resolve the field.

The following query:

```graphql
{
  users {
    id
    name
  }
}  
```

Will return the following result:

```json
{
  "data": {
    "users": [
      {"id": 1, "name": "James Bond"},
      {"id": 2, "name": "Madonna"}
    ]
  }
}
```

### Query with arguments

You may have noticed how fields correspond 1:1 with resolver functions. Just like functions,
fields can take arguments.

```graphql
type Query {
  user(id: ID! @eq): User @find
}
```

You can query this field like this:

```graphql
{
  user(id: 69){
    name
  }
}
```

And, if found, receive a result like this:

```json
{
  "data": {
    "user": {
      "name": "Chuck Norris"
    }
  }
}
```
