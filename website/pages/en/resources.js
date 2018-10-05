const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock
const Container = CompLibrary.Container

const CWD = process.cwd()

const siteConfig = require(CWD + '/siteConfig.js')
const Button = require(CWD + '/core/Button.js')
const editUrl = siteConfig.editUrl + '../website/resources.js'

const Resources = () => (
  <div className="mainContainer">
    <Container padding={['bottom']}>
      <MarkdownBlock>
        {`
# Plugins

<br/>

- [deinternetjongens/lighthouse-utils](https://github.com/deInternetJongens/Lighthouse-Utils)

<br/>
# Tutorials

- [Video Walkthrough by Christopher Moore](https://youtu.be/y19EaW2X7ac)
- [GraphQL in Laravel done right](https://medium.com/@olivernybroe/graphql-in-laravel-done-right-9cf123d5601b)
- [Testing GraphQL with Laravel](https://medium.com/@olivernybroe/testing-graphql-with-laravel-4d6201b40f68)

<br/>
# Recommended Packages

- [mll-lab/laravel-graphql-playground](https://github.com/mll-lab/laravel-graphql-playground)
- [mll-lab/graphql-php-scalars](https://github.com/mll-lab/graphql-php-scalars)
`}
      </MarkdownBlock>
    </Container>
      
    <div className="text-center">
      <p>Have you made a plugin, tutorial or other related package?</p>
      <Button href={editUrl}>
        Edit this page
      </Button>
    </div>
  </div>
)

Resources.title = 'Awesome Resources'

module.exports = Resources
