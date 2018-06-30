---
id: version-2.1-directives-laravel
original_id:   
title: Laravel Helpers
original_id: directives-laravel
---

Lighthouse comes with several Laravel specific directives that should help keep things familiar.

<br />
[**@bcrypt** directive](#bcrypt)<br />
[**@event** directive](#event)<br />
[**@validate** directive](#validate)<br />
<br />

## @bcrypt

The `@bcrypt` directive can be used to run the `bcrypt` on the attached argument.

```graphql
type Mutation {
  createUser(name: String, password: String @bcrypt): User
    @field(resolver: "App\\Http\\GraphQL\\Mutators\\UserMutator@create")
}
```

When you resolve the field, the argument will hold the `bcrypt` value.

```php
class UserMutator
{
    public function create($root, array $args)
    {
        return User::create([
          'name' => $args['name'],
          // This will be the bcrypt value of the password argument
          'password' => $args['password']
        ]);
    }
}
```

## @event

The `@event` directive allows you to fire an event after a mutation has taken place. It requires the `fire` argument that should be the class name of the event you want to fire.

```graphql
type Mutation {
  createPost(title: String!, content: String!): Post
    @event(fire: "App\\Events\\PostCreated")
}
```

## @validate

The `@validate` directive can be used to validate the input of a field. You can use the pre-defined rules provided by Laravel and place them in the `rules` argument as an array.

```graphql
type Mutation {
  createUser(
    name: String @validate(rules: ["required", "min:4"])
    email: String @validate(rules: ["required", "email", "unique:users,email"])
  ): User
}
```
