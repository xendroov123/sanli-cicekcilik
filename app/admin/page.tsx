"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Package, ShoppingCart, Settings, DollarSign } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Check if user is admin
        const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

        if (!profile?.is_admin) {
          toast({
            title: "Erişim Reddedildi",
            description: "Bu sayfaya erişim yetkiniz bulunmamaktadır.",
            variant: "destructive",
          })
          router.push("/")
          return
        }

        setIsAdmin(true)

        // Load admin data
        await loadAdminData()
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [supabase, router, toast])

  const loadAdminData = async () => {
    try {
      // Get stats
      const [ordersResult, usersResult, productsResult] = await Promise.all([
        supabase.from("orders").select("total_amount"),
        supabase.from("profiles").select("id"),
        supabase.from("products").select("id"),
      ])

      const totalOrders = ordersResult.data?.length || 0
      const totalRevenue = ordersResult.data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
      const totalUsers = usersResult.data?.length || 0
      const totalProducts = productsResult.data?.length || 0

      setStats({
        totalOrders,
        totalRevenue,
        totalUsers,
        totalProducts,
      })

      // Get recent orders
      const { data: orders } = await supabase
        .from("orders")
        .select(
          `
          *,
          profiles (first_name, last_name, email)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentOrders(orders || [])

      // Get recent users
      const { data: users } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentUsers(users || [])
    } catch (error) {
      console.error("Error loading admin data:", error)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🛠️ Admin Paneli</h1>
            <p className="text-lg text-gray-600">Şanlı Çiçekçilik yönetim paneli</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">Tüm zamanlar</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">Tüm zamanlar</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Kayıtlı üyeler</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Aktif ürünler</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Button
              onClick={() => router.push("/admin/orders")}
              className="h-24 flex flex-col items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <ShoppingCart className="w-8 h-8" />
              <span>Siparişleri Yönet</span>
            </Button>

            <Button
              onClick={() => router.push("/admin/products")}
              className="h-24 flex flex-col items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
            >
              <Package className="w-8 h-8" />
              <span>Ürünleri Yönet</span>
            </Button>

            <Button
              onClick={() => router.push("/admin/users")}
              className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600"
            >
              <Users className="w-8 h-8" />
              <span>Kullanıcıları Yönet</span>
            </Button>

            <Button
              onClick={() => router.push("/admin/settings")}
              className="h-24 flex flex-col items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600"
            >
              <Settings className="w-8 h-8" />
              <span>Site Ayarları</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Son Siparişler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">#{order.order_number}</p>
                        <p className="text-sm text-gray-600">
                          {order.profiles?.first_name} {order.profiles?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{formatPrice(order.total_amount)}</p>
                        <Badge className={`${getStatusColor(order.status)} text-xs`}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/admin/orders")}>
                  Tüm Siparişleri Görüntüle
                </Button>
              </CardContent>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Yeni Üyeler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString("tr-TR")}</p>
                      </div>
                      <div>{user.is_admin && <Badge className="bg-red-100 text-red-800 text-xs">Admin</Badge>}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/admin/users")}>
                  Tüm Kullanıcıları Görüntüle
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
