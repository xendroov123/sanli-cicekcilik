import { Award, Clock, Users, Palette, Shield, Heart } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "10+ Yıl Tecrübe",
      description: "Araba süsleme konusunda uzman ekibimizle 10 yılı aşkın tecrübe",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hızlı Hizmet",
      description: "Randevu saatinizde zamanında gelir, hızlı ve özenli şekilde süsleme yaparız",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "500+ Mutlu Çift",
      description: "Bugüne kadar 500'den fazla çiftin özel gününe renk kattık",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Özel Tasarım",
      description: "Her müşterimiz için özel tasarım ve kişiselleştirilmiş süsleme",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Kalite Garantisi",
      description: "Kullandığımız tüm malzemeler kaliteli ve araç dostu ürünlerdir",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Memnuniyet Garantisi",
      description: "Müşteri memnuniyeti bizim için en önemli öncelik",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">⭐ Neden Şanlı Çiçekçilik?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Özel günlerinizde bizi tercih etmeniz için birçok neden var
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-purple-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Mutlu Çift</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600">Yıl Tecrübe</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">%99</div>
              <div className="text-gray-600">Memnuniyet</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
