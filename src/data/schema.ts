/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface DocPageQueryQueryVariables {
  path: string,
};

export interface DocPageQueryQuery {
  page:  {
    html: string | null,
    details:  {
      title: string | null,
      date: string | null,
      path: string | null,
      tags: Array< string | null > | null,
      excerpt: string | null,
    } | null,
  } | null,
  // Connection to all MarkdownRemark nodes
  pages:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge
      post:  {
        // The id of this node.
        id: string,
        details:  {
          title: string | null,
          path: string | null,
        } | null,
      } | null,
    } | null > | null,
  } | null,
};

export interface IndexQueryQuery {
  markdownRemark:  {
    // The id of this node.
    id: string,
    html: string | null,
    frontmatter:  {
      title: string | null,
      path: string | null,
      date: string | null,
      excerpt: string | null,
    } | null,
  } | null,
};
