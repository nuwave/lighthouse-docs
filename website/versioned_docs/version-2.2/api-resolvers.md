---
id: version-2.2-resolvers
title: Resolvers
original_id: resolvers
---

## Resolver function signature

Resolvers are always called with the same 4 arguments:

```php
use GraphQL\Type\Definition\ResolveInfo;

public function resolve($rootValue, array $args, $context, ResolveInfo $resolveInfo);
```

1. `$rootValue`: The object that contains the result returned from the resolver on the parent field
2. `$args`: A array that contains the arguments that were passed into the field.
For example, for a field call like `user(name: "Bob")` it would be `['name' => 'Bob']`
3. `$context`: This can contain arbitrary data that is shared between all fields of a single query. Lighthouse
passes in an instance of `Nuwave\Lighthouse\Schema\Context` by default.
4. `$resolveInfo`: An instance of `GraphQL\Type\Definition\ResolveInfo`. Contains information about
the query itself, such as the execution state of the query, including the field name, path to the field from the root, and more.

## Complexity function signature

The complexity function is used to calculate a query complexity score for a field.
You can define your own complexity function with the [@complexity](directives#complexity) directive.

```php
<?php

public function complexity(int $childrenComplexity, array $args): int
```

1. `$childrenComplexity`: The complexity of the children of the field. In case you expect to return
multiple children, it can be useful to do some maths on this.
2. `array $args`: The arguments that were passed into the field.
For example, for a field call like `user(name: "Bob")` it would be `['name' => 'Bob']`

Read more about query complexity in the [webonyx/graphql-php docs]([Read More](http://webonyx.github.io/graphql-php/security/#query-complexity-analysis))
