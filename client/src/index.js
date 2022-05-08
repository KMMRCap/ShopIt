import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { loadUser } from './redux/slices/authSlice'

import App from './App';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';


axios.get('/api/v1/stripeapi').then(result => {
  store.dispatch(loadUser()).then((res) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <HelmetProvider>
            <Provider store={store}>
              <Elements stripe={loadStripe(result.data.stripeApiKey)}>
                <App
                  stripeApiKey={result.data.stripeApiKey}
                  isAdmin={res.payload.user.role === 'admin' ? true : false}
                />
                <ToastContainer autoClose={3000} position='top-center' />
              </Elements>
            </Provider>
          </HelmetProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
})

