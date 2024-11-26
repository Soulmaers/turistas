import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyProvider } from './modules/servises/contexs/contexts';
import { ProviderForm } from './modules/servises/contexs/contextCloseForm'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MyProvider>
    <ProviderForm>
      <App />
    </ProviderForm>
  </MyProvider>
);

reportWebVitals();
