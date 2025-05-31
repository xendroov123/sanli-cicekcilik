"use client"

import { useEffect, useState } from "react"
import { Search, ShoppingCart, UserIcon, Menu, X, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const supabase = createClient()
  const router = useRouter()
  const { getTotalItems } = useCartStore()
  const { toast } = useToast()

  useEffect(() => {
    // Auth state'ini dinle
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    // Sepet item sayısını güncelle
    setCartItemCount(getTotalItems())

    return () => subscription.unsubscribe()
  }, [supabase.auth, getTotalItems])

  const categories = [
    "Çiçek Sepeti",
    "Gül Buketleri",
    "Orkide",
    "Doğum Günü",
    "Sevgiliye Çiçek",
    "Saksı Çiçekleri",
    "Yeni Bebek",
    "Hediye",
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>0850 532 66 51</span>
            </div>
            <span>Ücretsiz Kargo - Aynı Gün Teslimat</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/order-tracking" className="hover:text-emerald-200">
              Sipariş Takibi
            </Link>
            <Link href="/contact" className="hover:text-emerald-200">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-rose-500 bg-clip-text text-transparent cursor-pointer">
                  🌸 Şanlı Çiçekçilik
                </h1>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Çiçek, hediye veya kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border-2 border-emerald-200 rounded-full focus:border-emerald-500 focus:ring-emerald-500"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bottom-1 bg-emerald-500 hover:bg-emerald-600 rounded-full px-4"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      <span>{user.user_metadata?.first_name || "Hesabım"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>Profilim</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")}>Siparişlerim</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await supabase.auth.signOut()
                        router.push("/")
                        toast({
                          title: "Çıkış yapıldı",
                          description: "Başarıyla çıkış yaptınız.",
                        })
                      }}
                    >
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-2"
                  onClick={() => router.push("/auth/login")}
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Giriş</span>
                </Button>
              )}

              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>

              <Button variant="ghost" size="sm" className="relative" onClick={() => router.push("/cart")}>
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:block border-t border-gray-200 py-4">
            <ul className="flex items-center justify-center gap-8">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
                  >
                    {category}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
              {/* Araba Süsleme Linki Ekleyin */}
              <li>
                <a
                  href="/services/car-decoration"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 relative group border border-purple-200 px-3 py-1 rounded-full"
                >
                  🚗 Araba Süsleme
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Çiçek ara..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-emerald-200 rounded-full"
                />
                <Button size="sm" className="absolute right-1 top-1 bottom-1 bg-emerald-500 rounded-full px-4">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-4">
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category}>
                    <a href="#" className="block text-gray-700 hover:text-emerald-600 font-medium py-2">
                      {category}
                    </a>
                  </li>
                ))}
                {/* Mobil menüye de araba süsleme ekleyin */}
                <li>
                  <a
                    href="/services/car-decoration"
                    className="block text-purple-600 hover:text-purple-700 font-medium py-2 border-t border-gray-200 pt-4"
                  >
                    🚗 Araba Süsleme Hizmeti
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
