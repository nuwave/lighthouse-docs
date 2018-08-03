---
id: auth
title: Authentication & Authorization
---

## Authentication

### Get the current user

Lighthouse provides a really simple way to fetch the information of the currently authenticated user.
Just add a field that returns your `User` type and decorate it with the [@auth](directives#auth) directive.

```graphql
type Query {
  me: User @auth
}
```

Sending the following query will return the authenticated user's info
or `null` if the request is not authenticated.

```graphql
query Me {
  me {
    name
    email
  }
}
```

## Authorization

### Restrict access to fields

Lighthouse allows you to restrict field operations to a certain group of users.
Use the [@can](directives#can) directive to leverage [Laravel Policies](https://laravel.com/docs/5.6/authorization) for authorization.
