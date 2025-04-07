import { createContext } from 'react'
import type { HoneyItem } from '@/interfaces/honeyItem.interface'
import type { CartItem } from '@/interfaces/cartItem.interface'

interface CartContextType {
  cart: CartItem[]
  addToCart: (honey: HoneyItem, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getItemQuantity: (id: number) => number
  totalItems: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
