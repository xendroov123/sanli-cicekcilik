"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cart"
import type { Database } from "@/lib/database.types"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)

  const images = (product.images as string[]) || []
  const imageUrl = images.length > 0 ? images[0] : "/placeholder.svg?height=300&width=300"

  const discountPercentage = product.original_price
    ? calculateDiscountPercentage(product.original_price, product.price)
    : 0

  const handleAddToCart = () => {
    setIsLoading(true)

    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: 1,
      })

      toast({
        title: "Sepete eklendi",
        description: `${product.name} sepetinize eklendi.`,
      })

      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.is_new && <Badge className="bg-green-500 text-white text-xs px-2 py-1">Yeni</Badge>}
        {product.is_bestseller && <Badge className="bg-orange-500 text-white text-xs px-2 py-1">Çok Satan</Badge>}
        {product.is_featured && <Badge className="bg-purple-500 text-white text-xs px-2 py-1">Öne Çıkan</Badge>}
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-red-500 text-white text-xs px-2 py-1">%{discountPercentage}</Badge>
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full p-2"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toast({
                title: "Favorilere eklendi",
                description: `${product.name} favorilerinize eklendi.`,
              })
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 rounded-full px-4"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={isLoading}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-emerald-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating - Placeholder for now */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500">(24)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-emerald-600">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-emerald-600 font-medium">
          {product.stock_quantity > 0 ? "Bugün Teslimat - Ücretsiz Kargo" : "Stokta Yok"}
        </div>
      </div>
    </div>
  )
}
