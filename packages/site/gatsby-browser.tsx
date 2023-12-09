import type { GatsbyBrowser } from 'gatsby';
import { StrictMode } from 'react';

// Bootstrap & Bootstrap Icons
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom CSS
import './src/styles.css';

// App & Root
import { App } from './src/App';
import { Root } from './src/Root';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <App>{element}</App>;
