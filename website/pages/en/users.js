/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const Container = CompLibrary.Container

const CWD = process.cwd()

const siteConfig = require(CWD + '/siteConfig.js')
const Button = require(CWD + '/core/Button.js')

const Users = () => {
  const editUrl = siteConfig.editUrl + '../website/users.js'
  const showcase = siteConfig.users.map((user, i) => {
    return (
      <a href={user.infoLink} key={i}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    )
  })

  return (
    <div className="mainContainer">
      <Container padding={['bottom', 'top']}>
        <div className="showcaseSection">
          <div className="prose">
            <h1>Who's Using This?</h1>
          </div>

          <div className="logos">
            {showcase}
          </div>

          <p>Are you using this project?</p>
          <Button href={editUrl}>
            Add your company
          </Button>
        </div>
      </Container>
    </div>
  )
}

Users.title = 'Awesome Users'

module.exports = Users
