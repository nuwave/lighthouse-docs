---
id: version-2.2-relationships
title: Eloquent Relationships
original_id: relationships
---

## HasMany

Just like in Laravel, you can define [Eloquent's HasMany-Relationship](https://laravel.com/docs/eloquent-relationships#one-to-many) in your schema.
Use the [@hasMany](directives#hasMany) directive to mark a field as related.

```graphql
type User {
  posts: [Post!]! @hasMany
}
```

The Eloquent class underneath should look like this:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
```

Lighthouse does some nifty optimization under the hood to batch relationship queries
together.

## BelongsTo

The [@belongsTo](directives#belongsTo) directive resolves a field through the Eloquent `BelongsTo` relationship.

```graphql
type Post {
  author: User @belongsTo
}
```

It assumes both the field and the relationship method to have the same name.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model 
{
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```
