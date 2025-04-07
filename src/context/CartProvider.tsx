import { type ReactNode, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartContext.tsx'
import { HoneyType } from '@/interfaces/honeyType.type.ts'
import { CartItem } from '@/interfaces/cartItem.interface.ts'

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

  const addToCart = (type: HoneyType, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.type === type)

      if (existingItem) {
        return prevCart.map((item) =>
          item.type === type
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { type, quantity }]
      }
    })
  }

  const removeFromCart = (type: HoneyType) => {
    setCart((prevCart) => prevCart.filter((item) => item.type !== type))
  }

  const clearCart = () => {
    setCart([])
  }

  const getItemQuantity = (type: HoneyType) => {
    const item = cart.find((item) => item.type === type)
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
