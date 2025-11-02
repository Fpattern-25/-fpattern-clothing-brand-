export default function About() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-bold">Who are we</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">Fpattern is a home-grown Indian brand blending comfort and culture. We obsess over fabric quality and prints so you can feel confident every day.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Feature icon="🚚" title="Shipping Nationwide"/>
        <Feature icon="✅" title="Quality Fabrics"/>
        <Feature icon="🔒" title="Secure Payments"/>
      </div>
    </div>
  )
}

function Feature({ icon, title }) { return (
  <div className="card p-6 flex items-center gap-3"><span className="text-2xl">{icon}</span><div className="font-medium">{title}</div></div>
)}
