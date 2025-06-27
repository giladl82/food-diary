import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then(
//       (registration) => {
//         console.log('Service Worker registered:', registration);
//       },
//       (err) => {
//         console.error('Service Worker registration failed:', err);
//       }
//     );
//   });
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
