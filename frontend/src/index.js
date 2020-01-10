import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';


//Wrap the app in an Apollo Provider
const link = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});


ReactDOM.render(
    <Suspense fallback="spinner">
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Suspense>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
