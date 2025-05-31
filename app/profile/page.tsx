"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    birth_date: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Get profile data
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (profileData) {
          setProfile({
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            phone: profileData.phone || "",
            birth_date: profileData.birth_date || "",
          })
        } else {
          // Create profile if doesn't exist
          setProfile({
            first_name: user.user_metadata?.first_name || "",
            last_name: user.user_metadata?.last_name || "",
            phone: user.user_metadata?.phone || "",
            birth_date: "",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Hata",
          description: "Profil bilgileri yüklenirken hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [supabase, router, toast])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        birth_date: profile.birth_date || null,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Başarılı!",
        description: "Profil bilgileriniz güncellendi.",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Hata",
        description: "Profil güncellenirken hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Profil yükleniyor...</p>
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
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Profilim</h1>
                    <p className="text-gray-600">Kişisel bilgilerinizi yönetin</p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false)
                      // Reset form
                      window.location.reload()
                    } else {
                      setIsEditing(true)
                    }
                  }}
                  variant={isEditing ? "outline" : "default"}
                  className={isEditing ? "border-gray-300" : "bg-emerald-500 hover:bg-emerald-600"}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 mb-2 block">
                      Ad
                    </Label>
                    <Input
                      id="firstName"
                      value={profile.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 mb-2 block">
                      Soyad
                    </Label>
                    <Input
                      id="lastName"
                      value={profile.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">
                    <Mail className="w-4 h-4 inline mr-2" />
                    E-posta
                  </Label>
                  <Input id="email" type="email" value={user?.email || ""} disabled className="bg-gray-50" />
                  <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez</p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="0555 123 45 67"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate" className="text-gray-700 mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Doğum Tarihi
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profile.birth_date}
                    onChange={(e) => handleInputChange("birth_date", e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                    >
                      {isSaving ? (
                        "Kaydediliyor..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Kaydet
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Account Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hesap Bilgileri</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    Hesap oluşturma tarihi:{" "}
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString("tr-TR") : "Bilinmiyor"}
                  </p>
                  <p>
                    Son giriş:{" "}
                    {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString("tr-TR") : "Bilinmiyor"}
                  </p>
                  <p>E-posta doğrulandı: {user?.email_confirmed_at ? "✅ Evet" : "❌ Hayır"}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/orders")}
                variant="outline"
                className="p-6 h-auto flex flex-col items-center gap-2 border-emerald-200 hover:bg-emerald-50"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">📦</div>
                <span className="font-medium">Siparişlerim</span>
                <span className="text-sm text-gray-500">Geçmiş siparişlerinizi görüntüleyin</span>
              </Button>

              <Button
                onClick={() => router.push("/favorites")}
                variant="outline"
                className="p-6 h-auto flex flex-col items-center gap-2 border-rose-200 hover:bg-rose-50"
              >
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">❤️</div>
                <span className="font-medium">Favorilerim</span>
                <span className="text-sm text-gray-500">Beğendiğiniz ürünler</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
