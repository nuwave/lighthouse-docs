import * as React from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { DocPageQueryQuery } from '../data/schema';
import { Sidebar } from '../components';

interface Props extends RouteComponentProps<{}> {
  data: DocPageQueryQuery;
}

const Template: React.SFC<Props> = ({ data, location }) => (
  <section className="container">
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/5 pt-4">
        <Sidebar pathname={location.pathname} />
      </div>
      <div className="w-full md:w-4/5">
        <div className="py-8">
          <div className="bg-white px-8 py-8">
            <Helmet title={data.page.details.title} />
            <div
              className="doc-content"
              dangerouslySetInnerHTML={{ __html: data.page.html }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const pageQuery = graphql`
  query DocPageQuery($path: String!) {
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      details: frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
    pages: allMarkdownRemark(
      filter: { frontmatter: { path: { ne: "/introduction" } } }
    ) {
      edges {
        post: node {
          id
          details: frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default Template;
