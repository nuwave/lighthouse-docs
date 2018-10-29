/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary')
const Container = CompLibrary.Container

const CWD = process.cwd()

const siteConfig = require(CWD + '/siteConfig.js')
const versions = require(CWD + '/versions.json')

const Versions = () => {
  const latestVersion = versions[0]
  const releasesBaseUrl = `${siteConfig.repoUrl}/releases/tag/v`
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h2>{siteConfig.title + ' Versions'}</h2>
          </header>
          <p>New versions of this project are released every so often.</p>
          <h3 id="latest">Current version (Stable)</h3>
          <table className="versions">
            <tbody>
            <tr>
              <th>{latestVersion}</th>
              <td>
                <a href={`${siteConfig.baseUrl}docs/installation`}>Documentation</a>
              </td>
              <td>
                <a href={releasesBaseUrl + latestVersion}>Release Notes</a>
              </td>
            </tr>
            </tbody>
          </table>
          <h3 id="rc">Latest Version</h3>
          Here you can find the latest documentation and unreleased code.
          <table className="versions">
            <tbody>
            <tr>
              <th>master</th>
              <td>
                <a
                  href={`${siteConfig.baseUrl}docs/next/installation`}>
                  Documentation
                </a>
              </td>
              <td>
                <a href={siteConfig.repoUrl}>Source Code</a>
              </td>
            </tr>
            </tbody>
          </table>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
            <tbody>
            {versions.map(
              version =>
                version !== latestVersion && (
                  <tr key={version}>
                    <th>{version}</th>
                    <td>
                      <a href={`/docs/${version}/installation`}>
                        Documentation
                      </a>
                    </td>
                    <td>
                      <a href={releasesBaseUrl + version}>Release Notes</a>
                    </td>
                  </tr>
                ),
            )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on{' '}
            <a href={`${siteConfig.repoUrl}/releases`}>GitHub</a>.
          </p>
        </div>
      </Container>
    </div>
  )
}

Versions.title = 'Awesome Versions'

module.exports = Versions
