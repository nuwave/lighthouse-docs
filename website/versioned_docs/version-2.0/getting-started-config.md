---
id: version-2.0-configuration
title: Configuration
original_id: configuration
---

## Directive Registry

Lighthouse makes heavy use of server-side directives. With this setting, you can point Lighthouse to your own custom directives folder. Any classes defined here will be automatically be included when parsing the schema file(s).

```php
// config/lighthouse.php
return [
    // ...
    'directives' => [__DIR__.'/../app/Http/GraphQL/Directives'],
];
```

## GraphQL Controller

Lighthouse provides it's own Laravel Controller by default, but if you would like to use your own, just define it where and point to the controller's namespace and method.

```php
// config/lighthouse.php
return [
    // ...
    'controller' => 'App\Http\Controllers\GraphQLController@execute',
];
```

## Schema Location

Lighthouse generates a schema class based on your graphql file(s). Use the `schema.register` configuration to point Lighthouse to your primary schema file.

```php
// config/lighthouse.php
return [
    // ...
    'schema' => [
        'register' => base_path('routes/graphql/schema.graphql')
    ],
];
```
