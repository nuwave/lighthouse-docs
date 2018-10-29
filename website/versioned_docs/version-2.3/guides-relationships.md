---
id: version-2.3-relationships
title: Eloquent Relationships
original_id: relationships
---

Eloquent relationships can be accessed just like any other properties.
This makes it super easy to use in your schema.

Suppose you have defined the following model:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    
    public function author(): HasMany
    {
        return $this->belongsTo(User::class);
    }
}
```

Just add fields to your type that are named just like the relationships:

```graphql
type Post {
  author: User
  comments: [Comment!]
}
```

While this approach is fine if you only ever fetch a single post, performance might not be
optimal when you are fetching a list of posts. Lighthouse has got you covered with specialized
directives that optimize the Queries for you.

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

Now, when you query a list of users, Lighthouse is able to batch the relationship queries
for the Posts together.

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
