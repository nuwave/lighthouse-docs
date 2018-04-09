import * as React from 'react';
import Link from 'gatsby-link';

export const Footer: React.SFC = props => (
  <footer className="bg-purple-darkest">
    <div className="container pb-8 pt-16">
      <h4 className="text-white text-center mb-8">Lighthouse</h4>
      <ul className="flex justify-center list-reset mb-8">
        <li>
          <Link to="/" className="px-8 text-white text-xs uppercase font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/docs/2.0/installation"
            className="px-8 text-white text-xs uppercase font-bold"
          >
            Documentation
          </Link>
        </li>
        <li>
          <Link
            to="/docs/2.0/walkthrough"
            className="px-8 text-white text-xs uppercase font-bold"
          >
            Walkthrough
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/nuwave/lighthouse"
            target="_blank"
            className="px-8 text-white text-xs uppercase font-bold"
          >
            Code
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nuwave/lighthouse/issues"
            target="_blank"
            className="px-8 text-white text-xs uppercase font-bold"
          >
            Issues
          </a>
        </li>
      </ul>
      <p className="text-white text-center text-xs mb-0">
        Created by Christopher Moore
      </p>
    </div>
  </footer>
);
