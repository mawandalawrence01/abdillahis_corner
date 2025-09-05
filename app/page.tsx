import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import FeaturedCategories from '../components/FeaturedCategories'
import BestSellers from '../components/BestSellers'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCategories />
        <BestSellers />
      </main>
      <Footer />
    </div>
  )
}
