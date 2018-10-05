const React = require('react')

const Button = props => (
  <a href={props.href} className="button mt-8">
    {props.children}
  </a>
)

module.exports = Button
