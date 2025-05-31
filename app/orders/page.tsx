"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"

export default function OrdersPage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Mock orders data - in real app, fetch from database
        const mockOrders = [
          {
            id: 1,
            order_number: "SAN2024001",
            status: "delivered",
            total_amount: 549.98,
            created_at: "2024-01-15T10:30:00Z",
            items: [
              { name: "Şanlı Gül Buketi", quantity: 1, price: 199.99 },
              { name: "Pembe Orkide", quantity: 1, price: 349.99 },
            ],
          },
          {
            id: 2,
            order_number: "SAN2024002",
            status: "shipped",
            total_amount: 299.99,
            created_at: "2024-01-20T14:15:00Z",
            items: [{ name: "Karma Çiçek Sepeti", quantity: 1, price: 299.99 }],
          },
          {
            id: 3,
            order_number: "SAN2024003",
            status: "preparing",
            total_amount: 179.99,
            created_at: "2024-01-22T09:45:00Z",
            items: [{ name: "Beyaz Lilyum Buketi", quantity: 1, price: 179.99 }],
          },
        ]

        setOrders(mockOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getOrders()
  }, [supabase, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Hazırlanıyor"
      case "shipped":
        return "Kargoda"
      case "delivered":
        return "Teslim Edildi"
      default:
        return "Bilinmiyor"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Siparişler yükleniyor...</p>
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">📦 Siparişlerim</h1>
              <p className="text-lg text-gray-600">Geçmiş siparişlerinizi görüntüleyin ve takip edin</p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-8xl mb-6">📦</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Henüz Siparişiniz Yok</h2>
                <p className="text-gray-600 mb-8">İlk siparişinizi vererek güzel çiçeklerimizi keşfedin</p>
                <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
                  Alışverişe Başla
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <div>
                            <h3 className="font-bold text-gray-800">Sipariş #{order.order_number}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={`${getStatusColor(order.status)} px-3 py-1`}>
                          {getStatusText(order.status)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/order-tracking?order=${order.order_number}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Detay
                        </Button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src="/placeholder.svg?height=50&width=50"
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium text-gray-800">{formatPrice(item.price)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Toplam</span>
                        <span className="text-lg font-bold text-emerald-600">{formatPrice(order.total_amount)}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t border-gray-200 mt-4 pt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/order-tracking?order=${order.order_number}`)}
                      >
                        Sipariş Takibi
                      </Button>

                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Add items to cart for reorder
                            order.items.forEach((item) => {
                              // This would use the cart store to add items
                            })
                            router.push("/cart")
                          }}
                        >
                          Tekrar Sipariş Ver
                        </Button>
                      )}

                      <Button variant="outline" size="sm" onClick={() => router.push("/contact")}>
                        Destek
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
