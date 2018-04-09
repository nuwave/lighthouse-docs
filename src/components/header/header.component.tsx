import * as React from 'react';

const logo = require('../../assets/svgs/logo.svg');

interface HeaderProps {
  url: string;
}

export const Header: React.SFC<HeaderProps> = props => (
  <header
    className={`${props.url === '/' ? 'bg-transparent' : 'bg-purple-darkest'}`}
  >
    <div className="container pt-8">
      <div className="flex justify-start items-center pb-4">
        <a href="/">
          <img src={logo} className="shadow-md" />
        </a>

        <div className="w-px bg-white h-8 mx-6 opacity-25" />
        <h3 className="font-serif text-white">Lighthouse</h3>
      </div>
      {props.children}
    </div>
  </header>
);
