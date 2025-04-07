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
import { useCart } from '@/context/UseCart.tsx'
import { HoneyType } from '@/interfaces/honeyType.type.ts'

interface HoneyCardProps {
  type: HoneyType
  name: string
  description: string
}

const HoneyCard = ({ type, name, description }: HoneyCardProps) => {
  const [quantity, setQuantity] = useState('1')
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const quantityNum = Number.parseInt(quantity)
    addToCart(type, quantityNum)

    toast.success(`Added to cart!`, {
      description: `${quantityNum} × ${name} added to your cart`,
    })
  }

  // Get image based on honey type
  const getHoneyImage = () => {
    return `/placeholder.svg?height=200&width=200&text=${type.charAt(0).toUpperCase() + type.slice(1)}+Honey`
  }

  return (
    <Card className="honey-card overflow-hidden border-amber-200">
      <div className="relative h-48 overflow-hidden bg-amber-100">
        <img
          src={getHoneyImage() || '/placeholder.svg'}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-amber-800">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
          <Plus className="mr-2 size-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HoneyCard
