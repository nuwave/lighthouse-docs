---
id: version-2.1-directives-relationships
title: Eloquent Relationships
original_id: directives-relationships
---

Lighthouse provides some directives to help you manage relationships.

<br />
[**@belongsTo** directive](#belongsTo)<br />
[**@hasMany** directive](#hasMany)<br />
<br />

## @belongsTo

The `@belongsTo` directive eager loads the eloquent relationship so it should only be used on a type that resolved to an Eloquent model. The `@belongsTo` directive accepts a `relation` argument if your relationship has a different name than the field. For example, let's assume we have the following models:

```php
class User extends Model {
  // ...
}

class Post extends Model {
  // ...
  public function author()
  {
      return $this->belongsTo(User::class);
  }
}
```

We can express our GraphQL types like so:

```graphql
type User {
  # ....
}

type Post {
  # ...
  author @belongsTo

  # or we could use the `relation` argument and use
  # a different field name
  user @belongsTo(relation: "author")
}
```

## @hasMany

The `@hasMany` directive can be used to create a connection between two eloquent models. It also accepts a `relation` argument if the name of the relationship is different than the field. It also accepts a `type` argument that can be set to `paginator` or `relay` to convert the relationship to a pagination field.

```graphql
type User {
  posts: [Post!]! @hasMany
  # for a Paginator field
  posts: [Post!]! @hasMany(type: "paginator")
  # for a Relay connection field
  posts: [Post!]! @hasMany(type: "relay")
  # if the relationship on your user model was named `articles`
  posts: [Post!]! @hasMany(relation: "articles")
}
```
