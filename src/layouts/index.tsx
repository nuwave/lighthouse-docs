import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Footer, Header, Navigation } from '../components';
import './index.css';

interface TemplateProps extends RouteComponentProps<{}> {
  children: () => JSX.Element;
}

const TemplateWrapper: React.SFC<TemplateProps> = ({ children, location }) => (
  <div>
    <Helmet
      title="Lighthouse - GraphQL Server for Laravel"
      meta={[
        { name: 'description', content: 'Lighthouse is a PHP package that allows you to serve a GraphQL endpoint from your Laravel application. It greatly reduces the boilerplate required to create a schema, it integrates well with any Laravel project, and it\'s highly customizable giving you full control over your data.' },
        { name: 'keywords', content: 'lighthouse, laravel, graphql' },
      ]}
      link={[
        {
          href: 'https://fonts.googleapis.com/css?family=Miriam+Libre|Roboto',
          rel: 'stylesheet',
        },
      ]}
    />
    <Header url={location.pathname}>
      <Navigation />
    </Header>
    {children()}
    <Footer />
  </div>
);

export default TemplateWrapper;
