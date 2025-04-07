import { createContext } from 'react'
import { HoneyType } from '@/interfaces/honeyType.type.ts'
import { CartItem } from '@/interfaces/cartItem.interface.ts'

interface CartContextType {
  cart: CartItem[]
  addToCart: (type: HoneyType, quantity: number) => void
  removeFromCart: (type: HoneyType) => void
  clearCart: () => void
  getItemQuantity: (type: HoneyType) => number
  totalItems: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
