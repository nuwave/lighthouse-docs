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
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
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
