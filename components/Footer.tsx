import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-emerald-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">📧 Özel Fırsatları Kaçırma!</h3>
              <p className="text-emerald-100">E-bültenimize abone ol, indirimlerden ilk sen haberdar ol</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 md:w-80 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent">
                🌸 Şanlı Çiçekçilik
              </h3>
              <p className="text-gray-300 mb-4">
                2010'dan beri sevdiklerinize en taze çiçekleri ulaştırıyoruz. Türkiye'nin her yerine aynı gün teslimat
                garantisi.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                {[
                  "Çiçek Sepeti",
                  "Gül Buketleri",
                  "Orkide",
                  "Doğum Günü Çiçekleri",
                  "Sevgiliye Çiçek",
                  "Saksı Çiçekleri",
                  "Yeni Bebek",
                  "Hediye Seçenekleri",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h4>
              <ul className="space-y-2">
                {[
                  "Sipariş Takibi",
                  "İptal ve İade",
                  "Teslimat Bilgileri",
                  "Sıkça Sorulan Sorular",
                  "Bize Ulaşın",
                  "Gizlilik Politikası",
                  "Kullanım Şartları",
                  "KVKK",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">0850 532 66 51</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">info@sanlicicek.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                  <span className="text-gray-300">
                    Atatürk Mahallesi, Çiçek Sokak No:123
                    <br />
                    Merkez/İstanbul
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">Pazartesi - Pazar: 08:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© 2024 Şanlı Çiçekçilik. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>🔒 Güvenli Alışveriş</span>
              <span>🚚 Ücretsiz Kargo</span>
              <span>💳 Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
