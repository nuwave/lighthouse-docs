---
id: version-2.1-directives-queries
original_id: 
title: Eloquent Queries
original_id: directives-queries
---

Query directives can help you filter your data.

_Note: These query filters should be used w/ the `@hasMany` or `@paginate` directives. They will manipulate the query to filter down the data._

<br />
[**@eq** directive](#eq)<br />
[**@neq** directive](#neq)<br />
[**@in** directive](#in)<br />
[**@notIn** directive](#notIn)<br />
[**@whereBetween** directive](#whereBetween)<br />
[**@whereNotBetween** directive](#whereNotBetween)<br />
[**@where** directive](#where)<br />
[**@find** directive](#find)<br />
[**@first** directive](#first)<br />
<br />

## @eq

The `@eq` directive can be used to place a equal operator on a eloquent query.

```graphql
type User {
  # this will filter a user's posts by the category.
  postsByCategory(category: String @eq): [Post] @hasMany
}
```

## @neq

The `@eq` directive can be used to place a not equals operator on a eloquent query.

```graphql
type User {
  # this will filter a user's posts that do not have the provided category.
  postsByCategory(category: String @neq): [Post] @hasMany
}
```

## @in

The `@in` directive can be used to filter a column by an array.

```graphql
type Query {
  # this will filter a user's posts by the category id(s).
  postsByCategory(category_id: [Int] @in): [Post] @hasMany
}
```

## @notIn

The `@notIn` directive can be used to filter a column by an array.

```graphql
type Query {
  # this will filter a user's posts that are not in the array of id(s).
  postsByCategory(category_id: [Int] @notIn): [Post] @hasMany
}
```

## @whereBetween

The `@whereBetween` directive can be used to filter a column by a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts between a set of dates.
  postsBetweenDates(
    start_date: String! @whereBetween(key: "created_at")
    end_date: String! @whereBetween(key: "created_at")
  ): [Post] @hasMany
}
```

## @whereNotBetween

The `@whereNotBetween` directive can be used to filter a column outside a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts that are not between the provided dates.
  postsBetweenDates(
    start_date: String! @whereNotBetween(key: "created_at")
    end_date: String! @whereNotBetween(key: "created_at")
  ): [Post] @hasMany
}
```

## @where

The `@where` directive can be used to filter a column by a set of dates.

_Note: You will need to add a `key` to the column to want to query for each date_

```graphql
type Query {
  # this will filter a user's posts have a title "like" the argument provided.
  postsSearchTitle(title: String! @where(operator: "like")): [Post] @hasMany

  # this will filter a user's posts by year (note the "clause" argument)
  postsByYear(created_at: Int! @where(clause: "whereYear")): [Post] @hasMany
}
```

## @find

The `@find` directive can be used to find a model based on the arguments provided.

_Note: You should provide unique fields to search by, if more than one model is returned an error will be thrown._

```graphql
type Query {
  userById(id: ID!): User @find(model: "App\\User")
}
```

## @first

The `@first` directive is similar to `@find`, however, if more than one model is found it will return the first item rather than throwing an error.

```graphql
type Query {
  userByFirstName(first_name: String!): User @first(model: "App\\User")
}
```
