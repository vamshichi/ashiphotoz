import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Heart, Star, Users } from "lucide-react"
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import { Button } from "@/components/ui/button"
import Video from "@/components/videosection/video";

export default function Home() {
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center pt-20 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/Edited photo.jpg"
      alt="Photography background"
      fill
      className="object-cover brightness-50 bg-black opacity-90"
      priority
    />
  </div>
  <div className="container relative z-10 px-4 mx-auto text-center text-white flex flex-col justify-between h-full">
    {/* Main Content */}
    <div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Ashi Photoz</h1>
      <p className="max-w-2xl mx-auto mt-6 text-xl">
        Capturing your precious moments with artistic excellence
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <Button asChild size="lg" className="text-lg">
          <Link href="/portfolio">View Our Work</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-black"
        >
          <Link href="/contact">Book a Session</Link>
        </Button>
      </div>
    </div>

    {/* Social Links at the Bottom */}
    <div className="flex justify-center gap-6 mb-6">
      <Link
        href="https://maps.app.goo.gl/KCCr9aGL4U6jUVRbA?g_st=ac"
        target="_blank"
        className="text-white hover:text-gray-300 transition text-3xl"
      >
        <MdLocationOn />
      </Link>
      <Link
        href="https://www.instagram.com/ashi.photoz?igsh=bDh5cWVuMXJxbnlx"
        target="_blank"
        className="text-white hover:text-gray-300 transition text-3xl"
      >
        <FaInstagram />
      </Link>
      <Link
        href="https://www.youtube.com/@ashi.photoz"
        target="_blank"
        className="text-white hover:text-gray-300 transition text-3xl"
      >
        <FaYoutube />
      </Link>
    </div>
  </div>
  </section>

    
      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
            <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
              Professional photography services tailored to your needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col p-6 transition-all border rounded-lg hover:shadow-lg">
                <div className="p-2 mb-4 rounded-full w-fit bg-primary/10">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 text-muted-foreground">{service.description}</p>
                <Link
                  href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center mt-auto text-sm font-medium text-primary"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Video />

      {/* Portfolio Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Work</h2>
            <p className="max-w-2xl mt-4 text-lg text-muted-foreground">A glimpse of our recent photography projects</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.slice(0, 6).map((item, index) => (
              <div key={index} className="relative overflow-hidden transition-all rounded-lg group hover:shadow-xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.category}
                  width={400}
                  height={300}
                  className="object-cover w-full aspect-[4/3] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition-opacity bg-black/60 opacity-0 group-hover:opacity-100">
                  {/* <h3 className="text-xl font-bold">{item.title}</h3> */}
                  {/* <p className="mt-2">{item.category}</p> */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
            <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
              Hear from people who have experienced our services
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 transition-all border rounded-lg hover:shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="mb-6 italic text-muted-foreground">{testimonial.text}</p>
                <div className="flex items-center">
                  {/* <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div> */}
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-primary">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Capture Your Moments?</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-primary-foreground/90">
            Let&apos;s create beautiful memories together. Book a session with us today.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-10">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: "Wedding Photography",
    description: "Capture the magic of your special day with our professional wedding photography services.",
    icon: Heart,
  },
  {
    title: "Portrait Sessions",
    description: "Professional portrait photography for individuals, families, and corporate needs.",
    icon: Users,
  },
  {
    title: "Event Coverage",
    description: "Comprehensive photography coverage for all types of events and celebrations.",
    icon: Camera,
  },
]

const portfolioItems = [
  {
    title: "Summer Wedding",
    category: "Wedding",
    image: "/images/0 (25).jpg",
  },
  {
    title: "Corporate Portraits",
    category: "Portrait",
    image: "/images/1 (6).jpg",
  },
  {
    title: "Fashion Shoot",
    category: "Fashion",
    image: "/images/2 (7).jpg",
  },
  {
    title: "Family Reunion",
    category: "Event",
    image: "/images/1 (18).jpg",
  },
  {
    title: "Product Launch",
    category: "Commercial",
    image: "/images/1 (8).jpg",
  },
  {
    title: "Engagement Session",
    category: "Couples",
    image: "/images/0 (3).jpg",
  },
]

const testimonials = [
  {
    text: "Ashi Photoz captured our wedding day perfectly. The photos are beyond what we could have imagined!",
    name: "Sarah & Michael",
    role: "Newlyweds",
  },
  {
    text: "The team was professional, creative, and made our family feel comfortable during the entire session.",
    name: "James Wilson",
    role: "Family Portrait Client",
  },
  {
    text: "Our corporate event was documented beautifully. The attention to detail in every shot was impressive.",
    name: "Emily Chen",
    role: "Marketing Director",
  },
]

