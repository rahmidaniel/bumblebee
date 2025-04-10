'use client'

import { useEffect, useState } from 'react'
import HoneyCard from '../components/HoneyCard'
import Cart from '../components/Cart'
import { Button } from '../components/ui/button'
import { BeakerIcon as Bee, LogOut, ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { toast } from 'sonner'
import { apiService } from '@/services/apiService'
import { useCart } from '@/context/UseCart'
import { HoneyItem } from '@/interfaces/honeyItem.interface'

interface HoneyListPageProps {
  onLogout: () => void
}

const HoneyListPage = ({ onLogout }: HoneyListPageProps) => {
  const { cart, totalItems } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeyList, setHoneyList] = useState<HoneyItem[]>([])

  useEffect(() => {
    const fetchHoneyList = async () => {
      try {
        const data = await apiService.getHoneyList()
        setHoneyList(data)
      } catch (error) {
        console.error('Error fetching honey list', error)
        toast.error('Failed to load honey list')
      }
    }
    fetchHoneyList()
  }, [])

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return

    setIsSubmitting(true)
    try {
      await apiService.submitOrder([...cart])
      toast.success('Order successful!', {
        description: 'Your honey is on its way!',
      })
    } catch (error) {
      console.error(error)
      toast.error('Order failed', {
        description: 'There was a problem with your order. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-dvh bg-amber-50 pb-16">
      <header className="sticky top-0 z-10 border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Bee size={28} />
            <h1 className="text-xl font-bold">Honey Shop</h1>
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative border-amber-200">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex w-5 h-5 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-md border-amber-200 sm:max-w-md">
                <Cart
                  onPlaceOrder={handlePlaceOrder}
                  isSubmitting={isSubmitting}
                />
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-amber-800">
          Our Honey Collection
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {honeyList.map((honey) => (
            <HoneyCard key={honey.id} honey={honey} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default HoneyListPage
