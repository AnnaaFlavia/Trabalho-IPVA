import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './containers/Home';

import './styles/style.css';
import './styles/mobile.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
