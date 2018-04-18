import * as React from 'react';
import Link from 'gatsby-link';

interface MenuProps {
  title: string;
  pathname: string;
  links: { title: string; to: string }[];
}

interface MenuState {
  isOpen: boolean;
}

export class SidebarMenu extends React.Component<MenuProps, MenuState> {
  state = {
    isOpen: false,
  };

  render() {
    const { title, links } = this.props;
    console.log({ links, pathname: this.props.pathname });
    return (
      <div className="mb-2">
        <a
          href="#"
          onClick={this.toggle}
          className={`font-serif block text-grey-darker text-sm py-4 px-4 hover:bg-purple hover:text-white ${
            this.showMenu() ? 'bg-purple text-white' : ''
          }`}
        >
          {title}
        </a>
        {this.showMenu() && (
          <ul className="list-reset ml-4">
            {links.map(link => (
              <li>
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-grey-dark py-2 px-4 block hover:bg-white"
                  activeClassName="bg-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  private toggle = (e: any) => {
    e.preventDefault();
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  private showMenu = () => {
    if (this.state.isOpen) {
      return true;
    }

    return this.props.links.reduce((show, link) => {
      if (show === true) {
        return true;
      }
      return this.props.pathname === link.to;
    }, false);
  };
}
