---
id: installation
title: Installation
---

Install the package via composer

```bash
$ composer require nuwave/lighthouse
```

If you are using Laravel < 5.4, add the service provider to your `config/app.php`

```php
'providers' => [
    // ...
    Nuwave\Lighthouse\Providers\LighthouseServiceProvider::class,
]
```

## Using the Facade

If you want to use the GraphQL facade, add it to your `config/app.php` file

```php
'aliases' => [
    // ...
    'GraphQL' => Nuwave\Lighthouse\Support\Facades\GraphQLFacade::class,
]
```
