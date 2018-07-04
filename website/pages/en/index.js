/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

const topSnippet = `
<div class="gatsby-highlight">
      <pre class="language-graphql"><code class="language-graphql">type User <span class="token punctuation">{</span>
  <span class="token attr-name">id</span><span class="token punctuation">:</span> ID<span class="token operator">!</span>
  <span class="token attr-name">name</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">email</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">posts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Post<span class="token punctuation">]</span><span class="token operator">!</span> <span class="token directive function">@hasMany</span>
<span class="token punctuation">}</span>
type Post <span class="token punctuation">{</span>
  <span class="token attr-name">title</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">content</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">author</span><span class="token punctuation">:</span> User<span class="token operator">!</span> <span class="token directive function">@belongsTo</span>
<span class="token punctuation">}</span>
type Query <span class="token punctuation">{</span>
  <span class="token attr-name">me</span><span class="token punctuation">:</span> User <span class="token directive function">@auth</span>
<span class="token punctuation">}</span>
</code></pre>
</div>
`;

const bottomSnippet = `
<div class="gatsby-highlight">
      <pre class="language-graphql"><code class="language-graphql">type Query <span class="token punctuation">{</span>
  <span class="token attr-name">me</span><span class="token punctuation">:</span> User <span class="token directive function">@auth</span>
  <span class="token attr-name">posts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Post<span class="token operator">!</span><span class="token punctuation">]</span><span class="token operator">!</span> <span class="token directive function">@paginate</span><span class="token punctuation">(</span><span class="token attr-name">model</span><span class="token punctuation">:</span> <span class="token string">"User"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
type Mutation <span class="token punctuation">{</span>
  createPost<span class="token punctuation">(</span>
    <span class="token attr-name">title</span><span class="token punctuation">:</span> String<span class="token operator">!</span> <span class="token directive function">@validate</span><span class="token punctuation">(</span><span class="token attr-name">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"min:2"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token attr-name">content</span><span class="token punctuation">:</span> String<span class="token operator">!</span> <span class="token directive function">@validate</span><span class="token punctuation">(</span><span class="token attr-name">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"min:12"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">:</span> Post
    <span class="token comment"># Autofill a new post model with the</span>
    <span class="token comment"># arguments from the mutation.</span>
    <span class="token directive function">@create</span><span class="token punctuation">(</span><span class="token attr-name">model</span><span class="token punctuation">:</span> <span class="token string">"Post"</span><span class="token punctuation">)</span>
    <span class="token comment"># Inject the authenticated user's "id"</span>
    <span class="token comment"># into the Post's "user_id" column.</span>
    <span class="token directive function">@inject</span><span class="token punctuation">(</span><span class="token attr-name">context</span><span class="token punctuation">:</span> <span class="token string">"user.id"</span><span class="token punctuation">,</span> <span class="token attr-name">attr</span><span class="token punctuation">:</span> <span class="token string">"user_id"</span><span class="token punctuation">)</span>
    <span class="token comment"># Fire an event w/ the newly created model.</span>
    <span class="token directive function">@event</span><span class="token punctuation">(</span><span class="token attr-name">fire</span><span class="token punctuation">:</span> <span class="token string">"App\\Events\\PostCreated"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre>
</div>
`;

const Button = props => {
  return (
    <a href={props.href} className="button mt-8">
      {props.children}
    </a>
  );
};

class Index extends React.Component {
  render() {
    const heroStyles = {
      backgroundImage: "url(/img/bg-hero@2x.png)"
    };
    return (
      <div className="home-container">
        <section
          className="bg-purple-darkest bg-no-repeat bg-cover"
          style={heroStyles}
        >
          <div className="container py-4">
            <div className="flex flex-wrap items-center py-8">
              <img
                src="/img/logo-md.svg"
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
                  boilerplate required to create a schema, it integrates well
                  with any Laravel project, and it's highly customizable giving
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
                  v2.0 takes Lighthouse one step closer to a "schema first"
                  development pattern by allowing you to simply create schema
                  file(s) to describe your Laravel data layer while leveraging
                  directives to enhance/customize the GraphQL schema to fit your
                  data requirements.
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
                  <div
                    className="shadow-md"
                    dangerouslySetInnerHTML={{ __html: topSnippet }}
                  />
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
                <a href="#" className="font-bold uppercase text-sm">
                  Read More
                </a>
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
                <a href="#" className="font-bold uppercase text-sm">
                  Read More
                </a>
              </div>
              <div className="w-full md:w-1/3 md:mb-0 px-4">
                <h4 className="font-serif text-purple-darkest text-xl mb-2">
                  Optimized for Eloquent
                </h4>
                <p className="mb-2">
                  Eloquent is an extremly powerful ORM. Lighthouse leverages
                  your current model relationships and, in most cases, creates
                  optizmized queries to minimize round trips to your database.
                </p>
                <a href="#" className="font-bold uppercase text-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="container pt-16 pb-8">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 px-2">
                <div
                  className="shadow-md"
                  dangerouslySetInnerHTML={{ __html: bottomSnippet }}
                />
              </div>
              <div className="w-full md:w-1/2 pl-6 pr-2">
                <h3 className="mb-4 text-xl">Laravel &amp; GraphQL</h3>
                <p>
                  Lighthouse leverages directives to dramatically reduce the
                  amount of boilerplate needed to get a GraphQL project up and
                  running. Many of the tools Laravel provides you are converted
                  into Lighthouse directives which makes it easy to reuse and
                  reduces the amount of changes you need to make in your
                  application's logic.
                </p>
                <p>
                  Lighthouse attempts to bring a "schema-first" design pattern
                  to PHP &amp; GraphQL. If you already have your models and
                  migrations set up, then it only takes minutes to get a GraphQL
                  server up and running with Lighthouse!
                </p>
                <Button href="/docs/2.0/installation">Read the Docs</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

module.exports = Index;
