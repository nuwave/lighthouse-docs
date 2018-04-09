/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve('./src/templates/doc-page.tsx'),
      });
    });
  });
};
