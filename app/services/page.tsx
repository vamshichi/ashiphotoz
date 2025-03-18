import Image from "next/image"
import Link from "next/link"
import { Camera, Check, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
        <p className="mt-4 text-xl text-muted-foreground">Professional photography services tailored to your needs</p>
      </div>

      {/* Main Services */}
      <div className="grid gap-12 mb-20">
        {services.map((service, index) => (
          <div
            key={service.title}
            id={service.title.toLowerCase().replace(/\s+/g, "-")}
            className={`grid gap-8 ${
              index % 2 === 0
                ? "md:grid-cols-[1fr_1.5fr]"
                : "md:grid-cols-[1.5fr_1fr] md:[grid-template-areas:_'content_image']"
            }`}
          >
            <div className={`${index % 2 !== 0 && "md:[grid-area:content]"}`}>
              <div className="p-2 mb-4 rounded-full w-fit bg-primary/10">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="mb-4 text-3xl font-bold">{service.title}</h2>
              <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>
              <ul className="mb-8 space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-1 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link href="/contact">Book This Service</Link>
              </Button>
            </div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the perfect package for your photography needs</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.title} className={plan.featured ? "border-primary shadow-lg" : ""}>
              {plan.featured && (
                <div className="px-3 py-1 text-xs font-medium text-white rounded-full bg-primary w-fit -mt-2 ml-6">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground"> / session</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                  <Link href="/contact">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const services = [
  {
    title: "Wedding Photography",
    description:
      "Capture the magic and emotion of your special day with our professional wedding photography services.",
    icon: Heart,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Pre-wedding consultation and planning",
      "Coverage of ceremony and reception",
      "Professional editing and color correction",
      "Online gallery for sharing with family and friends",
      "High-resolution digital files",
      "Optional album design and printing services",
    ],
  },
  {
    title: "Portrait Sessions",
    description:
      "Professional portrait photography for individuals, families, and corporate needs that capture personality and emotion.",
    icon: Users,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Indoor or outdoor location options",
      "Multiple outfit changes",
      "Professional lighting and equipment",
      "Guidance on posing and expressions",
      "Edited high-resolution images",
      "Quick turnaround time",
    ],
  },
  {
    title: "Event Coverage",
    description:
      "Comprehensive photography coverage for all types of events and celebrations, from corporate gatherings to special occasions.",
    icon: Camera,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Full event documentation",
      "Candid and posed photography",
      "Multiple photographer options for large events",
      "Fast delivery of preview images",
      "Complete editing of all final images",
      "Custom packages based on event duration",
    ],
  },
]

const pricingPlans = [
  {
    title: "Basic",
    description: "Perfect for simple sessions",
    price: 199,
    featured: false,
    features: [
      "1-hour photo session",
      "One location",
      "10 edited digital images",
      "Online gallery",
      "Digital download",
      "Print release",
    ],
  },
  {
    title: "Premium",
    description: "Our most popular package",
    price: 399,
    featured: true,
    features: [
      "2-hour photo session",
      "Two locations",
      "25 edited digital images",
      "Online gallery",
      "Digital download",
      "Print release",
      "One 8x10 print",
    ],
  },
  {
    title: "Deluxe",
    description: "Complete photography experience",
    price: 699,
    featured: false,
    features: [
      "4-hour photo session",
      "Multiple locations",
      "50 edited digital images",
      "Online gallery",
      "Digital download",
      "Print release",
      "Photo album",
      "Two 8x10 prints",
    ],
  },
]

