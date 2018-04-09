import * as React from 'react';

interface LinkProps {
  to: string;
  target?: '_blank' | '_self' | '_parent';
}

const NavLink: React.SFC<LinkProps> = ({ to, children, ...props }) => (
  <a
    href={to}
    className="block px-4 mr-8 py-2 text-sm text-white font-sans hover:text-purple"
    {...props}
  >
    {children}
  </a>
);

export const Navigation: React.SFC = props => (
  <nav className="flex">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/docs/2.0/installation">Documentation</NavLink>
    <NavLink to="/">Walkthrough</NavLink>
    <NavLink to="https://github.com/nuwave/lighthouse" target="_blank">
      Code
    </NavLink>
    <NavLink to="https://github.com/nuwave/lighthouse/issues" target="_blank">
      Issues
    </NavLink>
  </nav>
);
