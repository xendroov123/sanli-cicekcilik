"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Users, Shield, Mail, Calendar, MoreHorizontal } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkAdminAndLoadUsers = async () => {
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

        // Load users
        const { data: usersData, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching users:", error)
        } else {
          setUsers(usersData || [])
        }
      } catch (error) {
        console.error("Error:", error)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAndLoadUsers()
  }, [supabase, router])

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", userId)

      if (error) {
        throw error
      }

      // Update local state
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, is_admin: !currentStatus } : user)))

      toast({
        title: "Kullanıcı Güncellendi",
        description: `Kullanıcı ${!currentStatus ? "admin" : "normal kullanıcı"} olarak güncellendi.`,
      })
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Hata",
        description: "Kullanıcı güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Kullanıcılar yükleniyor...</p>
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

            <h1 className="text-3xl font-bold text-gray-800 mb-4">👥 Kullanıcı Yönetimi</h1>
            <p className="text-lg text-gray-600">Tüm kullanıcıları görüntüleyin ve yönetin</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Kullanıcılar ({users.length})</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İletişim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kayıt Tarihi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.first_name} {user.last_name}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </div>
                          {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {user.is_admin ? (
                            <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">Kullanıcı</Badge>
                          )}
                          <Switch
                            checked={user.is_admin}
                            onCheckedChange={() => toggleAdminStatus(user.id, user.is_admin)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(user.created_at).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz kullanıcı yok</h3>
                <p className="text-gray-500">Kullanıcılar kayıt olduğunda burada görünecek.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
