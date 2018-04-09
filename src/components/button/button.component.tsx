import * as React from 'react';
import Link from 'gatsby-link';

interface Props {
  href: string;
}

export const LinkBtn: React.SFC<Props> = ({ children, href }) => (
  <Link
    to={href}
    className="bg-purple-light px-8 py-4 text-white text-xs uppercase font-bold hover:bg-purple tracking-wide"
    activeClassName="bg-purple"
  >
    {children}
  </Link>
);
