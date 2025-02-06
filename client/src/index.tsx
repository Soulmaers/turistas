import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProviderForm } from './modules/servises/contexs/contextCloseForm'
import { ProvideActivTour } from './modules/servises/contexs/contextActivId'
import { TourDataProvider } from './modules/servises/contexs/contextStateTourData'

import { Provider } from 'react-redux';
import { store } from './GlobalStor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <TourDataProvider>
      <ProviderForm>
        <ProvideActivTour>
          <App />
        </ProvideActivTour>
      </ProviderForm>
    </TourDataProvider>
  </Provider>
);

reportWebVitals();
