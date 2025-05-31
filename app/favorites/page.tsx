"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/store/cart"

export default function FavoritesPage() {
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Mock favorites data - in real app, fetch from database
        const mockFavorites = [
          {
            id: 1,
            name: "Şanlı Gül Buketi",
            price: 199.99,
            original_price: 299.99,
            image: "/placeholder.svg?height=300&width=300",
            slug: "sanli-gul-buketi",
          },
          {
            id: 2,
            name: "Pembe Orkide Aranjmanı",
            price: 349.99,
            original_price: 459.99,
            image: "/placeholder.svg?height=300&width=300",
            slug: "pembe-orkide-aranjmani",
          },
          {
            id: 3,
            name: "Karma Çiçek Sepeti",
            price: 149.99,
            original_price: 189.99,
            image: "/placeholder.svg?height=300&width=300",
            slug: "karma-cicek-sepeti",
          },
        ]

        setFavorites(mockFavorites)
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getFavorites()
  }, [supabase, router])

  const handleRemoveFromFavorites = (id: number, name: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Favorilerden kaldırıldı",
      description: `${name} favorilerinizden kaldırıldı.`,
    })
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Sepete eklendi",
      description: `${product.name} sepetinize eklendi.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Favoriler yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">❤️ Favorilerim</h1>
              <p className="text-lg text-gray-600">Beğendiğiniz ürünleri buradan takip edin</p>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-8xl mb-6">💔</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Henüz Favori Ürününüz Yok</h2>
                <p className="text-gray-600 mb-8">
                  Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz
                </p>
                <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
                  Ürünleri Keşfet
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">{favorites.length} favori ürün</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFavorites([])
                      toast({
                        title: "Favoriler temizlendi",
                        description: "Tüm favori ürünler kaldırıldı.",
                      })
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Tümünü Temizle
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favorites.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full p-2"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>

                        {product.original_price && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              %{Math.round(((product.original_price - product.price) / product.original_price) * 100)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3
                          className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-emerald-600 transition-colors"
                          onClick={() => router.push(`/products/${product.slug}`)}
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-emerald-600">{formatPrice(product.price)}</span>
                          {product.original_price && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                            size="sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Sepete Ekle
                          </Button>

                          <Button
                            onClick={() => router.push(`/products/${product.slug}`)}
                            variant="outline"
                            size="sm"
                            className="px-3"
                          >
                            👁️
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
