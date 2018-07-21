/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + "docs/" + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + "/" : "") + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl("introduction.html", this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl("directives-args.html", this.props.language)}>
              Lighthouse Directives
            </a>
            <a href={this.docUrl("walkthrough.html", this.props.language)}>
              Walkthrough
            </a>
          </div>
          <div>
            <h5>Walkthrough</h5>
            <a href="https://youtu.be/y19EaW2X7ac">Video</a>
            <a href={this.docUrl("walkthrough.html", this.props.language)}>
              Documentation
            </a>
          </div>
          <div>
            <h5>Repository</h5>
            <a href="https://github.com/nuwave/lighthouse">GitHub</a>
            <a href="https://github.com/nuwave/lighthouse/issues">Issues</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/nuwave/lighthouse"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
