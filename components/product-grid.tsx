import ProductCard from "@/components/product-card"
import type { Database } from "@/lib/database.types"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
}

export default function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>}
            {description && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
