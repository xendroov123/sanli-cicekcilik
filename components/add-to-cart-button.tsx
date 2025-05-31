"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import type { Database } from "@/lib/database.types"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const addToCart = useCartStore((state) => state.addItem)

  const images = (product.images as string[]) || []
  const imageUrl = images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=300"

  const handleAddToCart = () => {
    setIsLoading(true)

    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity,
      })

      toast({
        title: "Sepete eklendi",
        description: `${product.name} sepetinize eklendi.`,
      })

      setIsLoading(false)
    }, 500)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < (product.stock_quantity || 10)) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="px-3 py-1 h-10"
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={increaseQuantity}
            disabled={quantity >= (product.stock_quantity || 10)}
            className="px-3 py-1 h-10"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock_quantity === 0}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full flex-1"
        >
          {isLoading ? (
            "Ekleniyor..."
          ) : product.stock_quantity === 0 ? (
            "Stokta Yok"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Sepete Ekle - {formatPrice(product.price * quantity)}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
