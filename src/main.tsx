import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import { CartProvider } from '@/context/CartProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </CartProvider>
  </StrictMode>
)
