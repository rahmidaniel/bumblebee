'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/context/UseCart'
import type { HoneyItem } from '@/interfaces/honeyItem.interface'

interface HoneyCardProps {
  honey: HoneyItem
}

const HoneyCard = ({ honey }: HoneyCardProps) => {
  const [quantity, setQuantity] = useState('1')
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const quantityNum = Number.parseInt(quantity)
    addToCart(honey, quantityNum)

    toast.success(`Added to cart!`, {
      description: `${quantityNum} × ${honey.name} added to your cart`,
    })
  }

  // Get image based on the honey name (using the first word)
  const getHoneyImage = () => {
    const displayText = honey.name.split(' ')[0]
    return `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(displayText + ' Honey')}`
  }

  return (
    <Card className="honey-card overflow-hidden border-amber-200">
      <div className="relative h-48 overflow-hidden bg-amber-100">
        <img
          src={getHoneyImage() || '/placeholder.svg'}
          alt={honey.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-amber-800">{honey.name}</CardTitle>
        <CardDescription>{honey.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger className="w-24 border-amber-200">
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">jar(s)</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-amber-500 hover:bg-amber-600"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HoneyCard
