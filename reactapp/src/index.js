import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store.js';
import './index.css';
import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       {/* <CartProvider>  */}
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       {/* </CartProvider> */}
//     </QueryClientProvider>
//   </Provider>
// );

// reportWebVitals();
