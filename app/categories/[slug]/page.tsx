"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, SortAsc } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Database } from "@/lib/database.types"

type Category = Database["public"]["Tables"]["categories"]["Row"]
type Product = Database["public"]["Tables"]["products"]["Row"]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("name")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      try {
        // Kategoriyi getir
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", params.slug)
          .eq("is_active", true)
          .single()

        if (categoryError || !categoryData) {
          router.push("/404")
          return
        }

        setCategory(categoryData)

        // Kategoriye ait ürünleri getir
        let query = supabase.from("products").select("*").eq("category_id", categoryData.id).eq("is_active", true)

        // Sıralama
        switch (sortBy) {
          case "price_asc":
            query = query.order("price", { ascending: true })
            break
          case "price_desc":
            query = query.order("price", { ascending: false })
            break
          case "newest":
            query = query.order("created_at", { ascending: false })
            break
          default:
            query = query.order("name", { ascending: true })
        }

        const { data: productsData } = await query

        setProducts(productsData || [])
      } catch (error) {
        console.error("Error fetching category:", error)
        router.push("/404")
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndProducts()
  }, [params.slug, sortBy, supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Kategori yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kategori Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız kategori mevcut değil.</p>
            <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <button onClick={() => router.push("/")} className="hover:text-emerald-600">
              Ana Sayfa
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-1 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
          </div>

          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{category.name}</h1>
            {category.description && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{category.description}</p>}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{products.length} ürün bulundu</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sırala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">İsme Göre (A-Z)</SelectItem>
                    <SelectItem value="price_asc">Fiyata Göre (Düşük-Yüksek)</SelectItem>
                    <SelectItem value="price_desc">Fiyata Göre (Yüksek-Düşük)</SelectItem>
                    <SelectItem value="newest">En Yeniler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bu kategoride henüz ürün yok</h3>
              <p className="text-gray-600 mb-6">Yakında yeni ürünler eklenecek!</p>
              <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
                Diğer Ürünleri İncele
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
