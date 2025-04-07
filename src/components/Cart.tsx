'use client'

import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Package, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/context/UseCart.tsx'

interface CartProps {
  onPlaceOrder: () => void
  isSubmitting: boolean
}

const Cart = ({ onPlaceOrder, isSubmitting }: CartProps) => {
  const { cart, removeFromCart, clearCart } = useCart()

  const getHoneyName = (type: string): string => {
    const names: Record<string, string> = {
      acacia: 'Acacia Honey',
      herbal: 'Herbal Honey',
      linden: 'Linden Honey',
      wildflower: 'Wildflower Honey',
      rapeseed: 'Rapeseed Honey',
    }
    return names[type] || type
  }

  const isEmpty = cart.length === 0

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2 border-b border-amber-200 pb-4">
        <ShoppingCart className="size-5 text-amber-600" />
        <h2 className="text-xl font-semibold text-amber-800">Your Cart</h2>
      </div>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
          <div className="rounded-full bg-amber-100 p-6">
            <ShoppingCart className="size-10 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some delicious honey to get started!
            </p>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 pr-4">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.type}
                  className="flex items-center justify-between rounded-lg border border-amber-100 bg-white p-3 shadow-sm"
                >
                  <div>
                    <h3 className="font-medium text-amber-800">
                      {getHoneyName(item.type)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.type)}
                    className="size-8 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>

          <div className="mt-6 space-y-4 border-t border-amber-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
              >
                <Trash2 className="mr-2 size-4" />
                Clear Cart
              </Button>

              <Button
                onClick={onPlaceOrder}
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Package className="mr-2 size-4" />
                {isSubmitting ? 'Ordering...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
