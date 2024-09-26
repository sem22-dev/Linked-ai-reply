
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../components/App';


export default function renderApp(container: HTMLElement) {
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}