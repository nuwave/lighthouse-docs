---
id: directives-args
title: Arguments
---

Argument directives can be used on any field of an Object Type.

Node directives can be placed on Object/Input Type nodes.

<br />
[**@bcrypt** directive](#bcrypt) used to run the `bcrypt` on the attached argument.<br /><br />
[**@validate** directive](#validate) used to validate the input of a field.<br />
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
