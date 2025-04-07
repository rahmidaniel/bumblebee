import { type ReactNode, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import type { HoneyItem } from '@/interfaces/honeyItem.interface'
import type { CartItem } from '@/interfaces/cartItem.interface'

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (honey: HoneyItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.honey.id === honey.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.honey.id === honey.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { honey, quantity }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.honey.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getItemQuantity = (id: number) => {
    const item = cart.find((item) => item.honey.id === id)
    return item ? item.quantity : 0
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    totalItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
