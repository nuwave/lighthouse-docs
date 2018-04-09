import * as React from 'react';
import Link from 'gatsby-link';

interface LinkProps {
  to: string;
}

const SidebarLink: React.SFC<LinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="font-serif block text-grey-darker text-sm py-4 px-4 mb-2 hover:bg-purple hover:text-white"
    activeClassName="bg-purple text-white"
  >
    {children}
  </Link>
);

export const Sidebar: React.SFC = props => (
  <aside className="py-4">
    <nav>
      <SidebarLink to="/docs/2.0/installation">Installation</SidebarLink>
      <SidebarLink to="/docs/2.0/config">Configuration</SidebarLink>
      <SidebarLink to="/docs/2.0/schema">Schema</SidebarLink>
      <SidebarLink to="/docs/2.0/directives">Directives</SidebarLink>
      <SidebarLink to="/docs/2.0/walkthrough">Walkthrough</SidebarLink>
    </nav>
  </aside>
);
