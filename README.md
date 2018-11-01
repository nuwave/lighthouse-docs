<img src="logo.png" width="150" height="150">

# Lighthouse Docs

[![GitHub license](https://img.shields.io/github/license/nuwave/lighthouse.svg)](https://github.com/nuwave/lighthouse/blob/master/LICENSE)
[![Get on Slack](https://img.shields.io/badge/slack-join-orange.svg)](https://join.slack.com/t/lighthouse-php/shared_invite/enQtMzc1NzQwNTUxMjk3LWI1ZDQ1YWM1NmM2MmQ0NTU0NGNjZWFkMTJhY2VjMDAwZmMyZDFlZTc1Mjc3ZGY0MWM1Y2Q5MWNjYmJmYWJkYmU)

These are the docs for Lighthouse, a GraphQL server for Laravel.

**For more information, head over [to the main project](https://github.com/nuwave/lighthouse)**
**or take a look at the [documentation website](https://lighthouse-php.netlify.com/)**

The docs are built with [Docusaurus](https://docusaurus.io/).

## Contribute to the docs

1. Fork the project
1. Create a new branch
1. Make changes to the code
1. Commit with a concise title line and a few more lines detailing the change
1. Open a PR detailing your changes

### Setup

You can build and view the docs locally.
You either need `yarn`/`npm` or `docker` installed.

First, go ahead and `git clone` this repo (or your fork) and `cd` in the project root.

#### Docker

    docker-compose up -d

#### Node

    cd website
    yarn
    yarn run start

### Tag a new version

    yarn run version x.y.z
