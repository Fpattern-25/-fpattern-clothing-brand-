export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-16">
      <div className="container-px mx-auto py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold">Fpattern</h3>
          <p className="text-sm mt-2">Home-grown Indian brand. Quality streetwear & ethnic fits.</p>
        </div>
        <div>
          <p className="text-sm">Support: support@fpattern.com</p>
          <p className="text-sm mt-2">Shipping & Returns · Privacy Policy</p>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Fpattern. All rights reserved.</div>
      </div>
    </footer>
  )
}
