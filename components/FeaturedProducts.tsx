"use client"

import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Şanlı Gül Buketi",
      originalPrice: 299,
      price: 199,
      discount: 33,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      badge: "En Çok Satan",
      badgeColor: "bg-red-500",
    },
    {
      id: 2,
      name: "Pembe Orkide Aranjmanı",
      originalPrice: 459,
      price: 349,
      discount: 24,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Yeni Tasarım",
      badgeColor: "bg-purple-500",
    },
    {
      id: 3,
      name: "Karma Çiçek Sepeti",
      originalPrice: 189,
      price: 149,
      discount: 21,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Fırsat",
      badgeColor: "bg-orange-500",
    },
    {
      id: 4,
      name: "Beyaz Lilyum Buketi",
      originalPrice: 329,
      price: 249,
      discount: 24,
      rating: 4.8,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Premium",
      badgeColor: "bg-emerald-500",
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">⭐ Öne Çıkan Ürünler</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En beğenilen ve çok satan çiçek aranjmanlarımızı keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1`}>
                  {product.badge}
                </Badge>

                {/* Discount Badge */}
                <Badge className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1">%{product.discount}</Badge>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button size="sm" variant="secondary" className="rounded-full">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 rounded-full px-6">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Sepete Ekle
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-emerald-600">₺{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">₺{product.originalPrice}</span>
                </div>

                {/* Delivery Info */}
                <div className="text-sm text-emerald-600 font-medium">🚚 Bugün Teslimat - Ücretsiz Kargo</div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-full">
            Tüm Ürünleri Görüntüle
          </Button>
        </div>
      </div>
    </section>
  )
}
