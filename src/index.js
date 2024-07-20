import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './assets/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'https://cms.samespace.com/graphql', 
  cache: new InMemoryCache(),
});

// Render the application
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();