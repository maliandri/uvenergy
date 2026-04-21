import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { ServiciosGrid } from '@/components/landing/ServiciosGrid'
import { PorQueUV } from '@/components/landing/PorQueUV'
import { Proceso } from '@/components/landing/Proceso'
import { CTAAgenda } from '@/components/landing/CTAAgenda'
import { JsonLdLocalBusiness } from '@/components/landing/JsonLd'

export default function HomePage() {
  return (
    <>
      <JsonLdLocalBusiness />
      <Navbar />
      <main>
        <Hero />
        <ServiciosGrid />
        <PorQueUV />
        <Proceso />
        <CTAAgenda />
      </main>
      <Footer />
    </>
  )
}
