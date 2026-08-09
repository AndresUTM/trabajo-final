// src/main.jsx
// Punto de entrada de la SPA. Monta el componente raiz App dentro del
// BrowserRouter, habilitando el enrutado del lado del cliente.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
