/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock

const CWD = process.cwd()

const Button = require(CWD + '/core/Button.js')

const Index = () => (
  <div className="home-container">
    <section
      className="bg-purple-darkest bg-no-repeat bg-cover"
      style={{
        backgroundImage: 'url(/img/bg-hero.png)',
      }}
    >
      <div className="container py-4">
        <div className="flex flex-wrap items-center py-8">
          <img
            src="/img/logo.svg"
            height={170}
            width={170}
            className="mx-auto mb-4 sm:mx-0 sm:mb-0 shadow-lg"
          />
          <div className="w-full md:flex-1 pl-8">
            <h2 className="text-white text-4xl font-light leading-normal mb-2">
              Lighthouse
            </h2>
            <h3 className="text-purple mb-2">GraphQL Server for Laravel</h3>
            <p className="text-sm text-white">
              Lighthouse is a PHP package that allows you to serve a GraphQL
              endpoint from your Laravel application. It greatly reduces the
              boilerplate required to create a schema, integrates well
              with any Laravel project, and is highly customizable giving
              you full control over your data.
            </p>
          </div>
          <div className="w-1/5" />
        </div>
      </div>
    </section>
    <section className="bg-white">
      <div className="container py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 pt-8 pb-8">
            <p>
              Lighthouse enables schema-first development by allowing you to use the native Schema Definition Language to describe your data.
              Leverage server-side directives to add functionality and bring your schema to life.
            </p>
            <p>
              With nothing more than this schema file (along w/ Eloquent
              models and migrations set up), you have a fully functional
              GraphQL server with no additional code! But don't worry, you
              can extend Lighthouse to fit just about any data requirements.
              The docs will walk you through what directives are available,
              how to create your own directives and how to create your own
              resolvers, so let's get started!
            </p>
            <Button href="/docs/installation">Get Started</Button>
          </div>
          <div className="w-full md:w-1/3">
            <div className="md:-mt-16 shadow-md">
              <MarkdownBlock>
                {`
\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!] @hasMany
}

type Post {
  title: String!
  content: String!
  author: User @belongsTo
}

type Query {
  me: User @auth
  posts: [Post!] @paginate
}
\`\`\`
`}
              </MarkdownBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-grey-lightest">
      <div className="container py-16">
        <h3 className="text-center mb-4 text-2xl">
          Rapid GraphQL Development
        </h3>
        <h4 className="text-center text-lg mb-4 font-sans text-grey-dark">
          Fully customizable to fit your data requirements.
        </h4>
        <div className="flex flex-wrap pt-6">
          <div className="w-full mb-4 md:w-1/3 md:mb-0 px-4">
            <h4 className="font-serif text-purple-darkest text-xl mb-2">
              Schema Directives
            </h4>
            <p className="mb-2">
              Lighthouse provides you with a handful of helpful Schema
              Directives to get you up and running in no time. But it also
              allows you to create your own when needed.
            </p>
          </div>
          <div className="w-full mb-4 md:w-1/3 md:mb-0 px-4">
            <h4 className="font-serif text-purple-darkest text-xl mb-2">
              Laravel Friendly
            </h4>
            <p className="mb-2">
              Lighthouse integrates with your Laravel application without
              the need to re-write your entire domain. Just build a GraphQL
              schema on top of your current logic and start querying!
            </p>
          </div>
          <div className="w-full md:w-1/3 md:mb-0 px-4">
            <h4 className="font-serif text-purple-darkest text-xl mb-2">
              Optimized for Eloquent
            </h4>
            <p className="mb-2">
              Eloquent is an extremely powerful ORM. Lighthouse leverages
              your current model relationships and creates optimized database queries.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white">
      <div className="container pt-16 pb-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 px-2">
            <MarkdownBlock>
              {`
\`\`\`graphql
type Mutation {
  createPost(
    title: String! @rules(apply: ["min:2"])
    content: String! @rules(apply: ["min:12"])
  ): Post
  # Automatically create a new post model
  @create(model: "Post")
  # Inject the current user's id
  @inject(context: "user.id", attr: "user.id")
  # Fire an event with the newly created model
  @event(fire: "App\\\\Events\\\\PostCreated")
}
\`\`\`
`}
            </MarkdownBlock>
          </div>
          <div className="w-full md:w-1/2 pl-6 pr-2">
            <h3 className="mb-4 text-xl">Laravel &amp; GraphQL</h3>
            <p>
              Lighthouse dramatically reduces the
              amount of boilerplate needed to get a GraphQL project up and
              running. Many of the familiar concepts from Laravel are converted
              into Lighthouse directives, so you can reuse existing logic and
              work the way you are used to.
            </p>
            <p>
              If you already have your models and
              migrations set up, it only takes minutes to get a GraphQL
              server up and running with Lighthouse!
            </p>
            <Button href="/docs/installation">Read the Docs</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
)

module.exports = Index
