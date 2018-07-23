/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const Footer = ({config}) => {
  const docUrl = doc => {
    return config.baseUrl + 'docs/' + doc
  }
  
  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <a href={config.baseUrl} className="nav-home">
          {config.footerIcon && (
            <img
              src={config.baseUrl + config.footerIcon}
              alt={config.title}
              width="66"
              height="58"
            />
          )}
        </a>
        <div>
          <h5>Docs</h5>
          <a href={docUrl('installation')}>
            Getting Started
          </a>
          <a href={docUrl('directives')}>
            Directives
          </a>
        </div>
        <div>
          <h5>Community</h5>
          <a className="github-button"
             href={config.repoUrl}
             data-count-href={`${config.repoUrl}/stargazers`}
             data-show-count="true"
             data-count-aria-label="# stargazers on GitHub"
             aria-label="Star this project on GitHub"
          >
            {config.projectName}
          </a>
          <a
            href="https://join.slack.com/t/lighthouse-php/shared_invite/enQtMzc1NzQwNTUxMjk3LWI1ZDQ1YWM1NmM2MmQ0NTU0NGNjZWFkMTJhY2VjMDAwZmMyZDFlZTc1Mjc3ZGY0MWM1Y2Q5MWNjYmJmYWJkYmU"
            target="_blank">
            <img src="https://img.shields.io/badge/slack-join-orange.svg" />
          </a>
        </div>
      </section>
      <section className="copyright">{config.copyright}</section>
    </footer>
  )
}

module.exports = Footer
