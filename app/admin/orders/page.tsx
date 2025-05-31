"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkAdminAndLoadOrders = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        // Check if user is admin
        const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

        if (!profile?.is_admin) {
          router.push("/")
          return
        }

        setIsAdmin(true)

        // Load orders
        const { data: ordersData, error } = await supabase
          .from("orders")
          .select(
            `
            *,
            profiles (first_name, last_name, email),
            order_items (
              id,
              product_name,
              quantity,
              price,
              total
            )
          `,
          )
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching orders:", error)
        } else {
          setOrders(ordersData || [])
        }
      } catch (error) {
        console.error("Error:", error)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAndLoadOrders()
  }, [supabase, router])

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === "delivered" && { delivered_at: new Date().toISOString() }),
        })
        .eq("id", orderId)

      if (error) {
        throw error
      }

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                updated_at: new Date().toISOString(),
                ...(newStatus === "delivered" && { delivered_at: new Date().toISOString() }),
              }
            : order,
        ),
      )

      toast({
        title: "Sipariş Güncellendi",
        description: `Sipariş durumu "${getStatusText(newStatus)}" olarak güncellendi.`,
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Hata",
        description: "Sipariş durumu güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "confirmed":
        return <Package className="w-4 h-4 text-blue-500" />
      case "preparing":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Beklemede"
      case "confirmed":
        return "Onaylandı"
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
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
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

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin")}
              className="flex items-center gap-1 text-gray-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Admin Paneline Dön
            </Button>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">📦 Sipariş Yönetimi</h1>
            <p className="text-lg text-gray-600">Tüm siparişleri görüntüleyin ve yönetin</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Siparişler ({orders.length})</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sipariş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">#{order.order_number}</div>
                          <div className="text-sm text-gray-500">{order.order_items?.length || 0} ürün</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.profiles?.first_name} {order.profiles?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{order.profiles?.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                            <SelectTrigger className="w-40">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Beklemede</SelectItem>
                              <SelectItem value="confirmed">Onaylandı</SelectItem>
                              <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                              <SelectItem value="shipped">Kargoda</SelectItem>
                              <SelectItem value="delivered">Teslim Edildi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatPrice(order.total_amount)}</div>
                        <div className="text-sm text-gray-500">
                          {order.payment_method === "cash-on-delivery" ? "Kapıda Ödeme" : "Kredi Kartı"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/order-tracking?order=${order.order_number}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz sipariş yok</h3>
                <p className="text-gray-500">Siparişler geldiğinde burada görünecek.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
