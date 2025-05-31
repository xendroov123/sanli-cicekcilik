export default function PromotionBanners() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Banner 1 - Çok Satanlar */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 h-64 group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">ÇOK SATANLARI</h3>
              <h4 className="text-xl mb-4">KEŞFET!</h4>
              <p className="text-blue-100 mb-4">En popüler çiçek aranjmanları</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Ürünleri İncele
              </button>
            </div>
            <div className="absolute top-4 right-4 text-6xl opacity-20">🏆</div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>

          {/* Banner 2 - Yeni Tasarımlar */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 h-64 group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">YENİ TASARIMLARI</h3>
              <h4 className="text-xl mb-4">KEŞFET!</h4>
              <p className="text-purple-100 mb-4">Özel tasarım çiçek koleksiyonu</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                Ürünleri İncele
              </button>
            </div>
            <div className="absolute top-4 right-4 text-6xl opacity-20">✨</div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>

          {/* Banner 3 - Özel İndirim */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 h-64 group cursor-pointer md:col-span-2 lg:col-span-1">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">ÖZEL İNDİRİM</h3>
              <h4 className="text-xl mb-4">%50'YE VARAN</h4>
              <p className="text-emerald-100 mb-4">Seçili ürünlerde büyük fırsat</p>
              <button className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                Fırsatları Gör
              </button>
            </div>
            <div className="absolute top-4 right-4 text-6xl opacity-20">🎯</div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
