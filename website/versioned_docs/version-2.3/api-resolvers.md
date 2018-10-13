---
id: version-2.3-resolvers
title: Resolvers
original_id: resolvers
---

## Resolver function signature

Resolvers are always called with the same 4 arguments:

```php
use GraphQL\Type\Definition\ResolveInfo;

public function resolve($rootValue, array $args, $context, ResolveInfo $resolveInfo);
```

1. `$rootValue`: The result that was returned from the parent field.
When resolving a field that sits on one of the root types (`Query`, `Mutation`) this is `null`.
2. `array $args`: The arguments that were passed into the field.
For example, for a field call like `user(name: "Bob")` it would be `['name' => 'Bob']`
3. `$context`: Arbitrary data that is shared between all fields of a single query.
Lighthouse passes in an instance of `Nuwave\Lighthouse\Schema\Context` by default.
4. `ResolveInfo $resolveInfo`: Information about the query itself,
such as the execution state, the field name, path to the field from the root, and more.
