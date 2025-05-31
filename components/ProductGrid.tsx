"use client"

import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Şanlı Pembe Güller",
      price: 179,
      originalPrice: 229,
      rating: 4.7,
      reviews: 89,
      image: "/placeholder.svg?height=250&width=250",
      isNew: false,
      isBestseller: true,
    },
    {
      id: 2,
      name: "Karma Ayçiçeği Buketi",
      price: 149,
      originalPrice: 199,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=250&width=250",
      isNew: true,
      isBestseller: false,
    },
    {
      id: 3,
      name: "Beyaz Orkide Aranjmanı",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 67,
      image: "/placeholder.svg?height=250&width=250",
      isNew: false,
      isBestseller: false,
    },
    {
      id: 4,
      name: "Kırmızı Gül Sepeti",
      price: 219,
      originalPrice: 279,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=250&width=250",
      isNew: false,
      isBestseller: true,
    },
    {
      id: 5,
      name: "Papatya Çiçek Aranjmanı",
      price: 129,
      originalPrice: 169,
      rating: 4.5,
      reviews: 92,
      image: "/placeholder.svg?height=250&width=250",
      isNew: true,
      isBestseller: false,
    },
    {
      id: 6,
      name: "Mor Lilyum Buketi",
      price: 189,
      originalPrice: 239,
      rating: 4.8,
      reviews: 78,
      image: "/placeholder.svg?height=250&width=250",
      isNew: false,
      isBestseller: false,
    },
    {
      id: 7,
      name: "Karma Çiçek Sepeti",
      price: 259,
      originalPrice: 329,
      rating: 4.7,
      reviews: 134,
      image: "/placeholder.svg?height=250&width=250",
      isNew: false,
      isBestseller: true,
    },
    {
      id: 8,
      name: "Saksı Orkide",
      price: 199,
      originalPrice: 249,
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg?height=250&width=250",
      isNew: true,
      isBestseller: false,
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🌸 Tüm Ürünlerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geniş çiçek koleksiyonumuzdan sevdikleriniz için en güzel seçimi yapın
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative"
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-green-500 text-white text-xs px-2 py-1">Yeni</Badge>}
                {product.isBestseller && (
                  <Badge className="bg-orange-500 text-white text-xs px-2 py-1">Çok Satan</Badge>
                )}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                  %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}
                </Badge>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" className="rounded-full p-2">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full p-2">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-full px-4">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-emerald-600">₺{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₺{product.originalPrice}</span>
                </div>

                {/* Delivery Info */}
                <div className="text-xs text-emerald-600 font-medium">Bugün Teslimat - Ücretsiz Kargo</div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-full"
          >
            Daha Fazla Ürün Yükle
          </Button>
        </div>
      </div>
    </section>
  )
}
