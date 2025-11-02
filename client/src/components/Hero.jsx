import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-px mx-auto grid md:grid-cols-2 gap-8 items-center py-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Groove On. Layer Confidence.</h1>
          <p className="mt-3 text-gray-600">T-shirts, kurtis, and jackets designed for everyday comfort and style.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/catalog" className="btn">Shop Now</Link>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden aspect-[16/10] bg-gray-100">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" alt="Fpattern hero"/>
        </div>
      </div>
    </section>
  )
}
