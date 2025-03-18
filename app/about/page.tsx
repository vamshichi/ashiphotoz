import Image from "next/image"
import Link from "next/link"
import { Camera, Heart, Instagram, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
        <p className="mt-4 text-xl text-muted-foreground">Get to know the story and team behind Ashi Photoz</p>
      </div>

      {/* Our Story */}
      <section className="grid gap-12 mb-20 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <Image src="/images/Corporate-Portraits.jpg" alt="Studio founder" fill className="object-cover" />
        </div>
        <div>
          <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
          <div className="space-y-4 text-lg">
            <p>
              Founded in 2015 by Ashi Kumar, Ashi Photoz began as a passion project that quickly evolved into one of the
              region&apos;s most sought-after photography studios.
            </p>
            <p>
              With a background in fine arts and a keen eye for detail, Ashi built a team of talented photographers who
              share the same vision: to capture authentic moments that tell compelling stories.
            </p>
            <p>
              Today, our studio has grown to serve hundreds of clients each year, from couples celebrating their wedding
              day to businesses looking for professional brand imagery.
            </p>
            <p>
              Our philosophy is simple: we believe that every moment deserves to be preserved with artistry and care.
              We&apos;re not just taking pictures; we&apos;re creating visual legacies that will be cherished for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 mb-20 bg-gray-50 rounded-xl">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="mt-4 text-lg text-muted-foreground">The principles that guide our work and relationships</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="p-6 text-center bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="mb-20">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The talented professionals behind our stunning photography
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative mb-4 overflow-hidden rounded-lg aspect-[3/4]">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity bg-black/60 opacity-0 group-hover:opacity-100">
                  {member.social.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="p-2 text-white transition-colors rounded-full hover:bg-white/20"
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="p-8 text-center bg-primary text-primary-foreground rounded-xl">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Ready to work with us?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-foreground/90">
          Let&apos;s create beautiful memories together. Contact us today to discuss your photography needs.
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </section>
    </div>
  )
}

const values = [
  {
    title: "Artistic Excellence",
    description: "We strive for perfection in every shot, combining technical skill with creative vision.",
    icon: Camera,
  },
  {
    title: "Authentic Moments",
    description: "We believe in capturing genuine emotions and real connections, not just posed pictures.",
    icon: Heart,
  },
  {
    title: "Client Experience",
    description: "We're committed to providing exceptional service from first contact to final delivery.",
    icon: Users,
  },
]

const team = [
  {
    name: "Ashi Kumar",
    role: "Founder & Lead Photographer",
    image: "/placeholder.svg?height=600&width=400",
    social: [
      { name: "Instagram", icon: Instagram, url: "#" },
      { name: "Email", icon: Mail, url: "#" },
    ],
  },
  {
    name: "Maya Rodriguez",
    role: "Wedding Specialist",
    image: "/placeholder.svg?height=600&width=400",
    social: [
      { name: "Instagram", icon: Instagram, url: "#" },
      { name: "Email", icon: Mail, url: "#" },
    ],
  },
  {
    name: "James Wilson",
    role: "Portrait Photographer",
    image: "/placeholder.svg?height=600&width=400",
    social: [
      { name: "Instagram", icon: Instagram, url: "#" },
      { name: "Email", icon: Mail, url: "#" },
    ],
  },
  {
    name: "Sarah Chen",
    role: "Event Photographer",
    image: "/placeholder.svg?height=600&width=400",
    social: [
      { name: "Instagram", icon: Instagram, url: "#" },
      { name: "Email", icon: Mail, url: "#" },
    ],
  },
]

