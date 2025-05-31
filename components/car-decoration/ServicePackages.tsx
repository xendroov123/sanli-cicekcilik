"use client"

import { Check, Crown, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ServicePackages() {
  const packages = [
    {
      id: 1,
      name: "Klasik Paket",
      price: 299,
      originalPrice: 399,
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-400 to-rose-500",
      popular: false,
      features: [
        "Kapı kolları süsleme",
        "Ön tampon çiçek aranjmanı",
        "Ayna süslemeleri",
        "Temel kurdele süsleme",
        "1 saat kurulum süresi",
      ],
    },
    {
      id: 2,
      name: "Premium Paket",
      price: 499,
      originalPrice: 649,
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-400 to-indigo-500",
      popular: true,
      features: [
        "Tam araç süsleme",
        "Özel çiçek aranjmanları",
        "Kurdele ve tül süsleme",
        "Kalp ve yıldız detayları",
        "Fotoğraf çekimi için özel pozisyon",
        "2 saat kurulum süresi",
      ],
    },
    {
      id: 3,
      name: "Lüks Paket",
      price: 799,
      originalPrice: 999,
      icon: <Crown className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      popular: false,
      features: [
        "VIP tam araç süsleme",
        "Premium çiçek seçenekleri",
        "Özel tema tasarımı",
        "LED ışık süsleme",
        "Profesyonel fotoğraf çekimi",
        "Gelin arabası özel süsleme",
        "3 saat kurulum + bakım",
      ],
    },
  ]

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🎨 Araba Süsleme Paketlerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Özel günleriniz için tasarlanmış farklı paket seçenekleri. Size en uygun olanı seçin!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                pkg.popular ? "ring-4 ring-purple-500 ring-opacity-50" : ""
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-2 text-sm font-semibold">EN POPÜLER</Badge>
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-r ${pkg.color} text-white p-6 text-center`}>
                <div className="mb-4">{pkg.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">₺{pkg.price}</span>
                  <span className="text-lg line-through opacity-75">₺{pkg.originalPrice}</span>
                </div>
                <p className="text-sm opacity-90 mt-2">
                  %{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)} İndirim
                </p>
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToBooking}
                  className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white font-semibold py-3 rounded-full transition-all duration-200`}
                >
                  Bu Paketi Seç
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-2xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">💡 Özel İstekleriniz Var mı?</h3>
            <p className="text-blue-700 mb-4">
              Yukarıdaki paketlere ek olarak özel isteklerinizi de karşılayabiliriz. Tema renkleri, özel çiçek türleri
              veya ek süsleme malzemeleri için bizimle iletişime geçin.
            </p>
            <Button
              variant="outline"
              onClick={() => window.open("tel:+908505326651")}
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
            >
              Özel Teklif İçin Arayın
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
