import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './useContext/userContext';
import "./global.css"

// import usecontext
// import { UserContextProvider } from './components/Context/UserContext';

// import react-query
import { QueryClient, QueryClientProvider } from 'react-query';


// init client
const client = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
          <App />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
  
);
