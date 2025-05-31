import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CarDecorationHero from "@/components/car-decoration/CarDecorationHero"
import ServicePackages from "@/components/car-decoration/ServicePackages"
import Gallery from "@/components/car-decoration/Gallery"
import BookingForm from "@/components/car-decoration/BookingForm"
import WhyChooseUs from "@/components/car-decoration/WhyChooseUs"

export const metadata = {
  title: "Araba Süsleme Hizmeti - Şanlı Çiçekçilik",
  description: "Düğün, nişan, kına gecesi için profesyonel araba süsleme hizmeti. Özel günlerinizi unutulmaz kılın.",
}

export default function CarDecorationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CarDecorationHero />
        <ServicePackages />
        <Gallery />
        <WhyChooseUs />
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}
