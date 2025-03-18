import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioPage() {
  // Get unique categories
  const categories = Array.from(new Set(portfolioItems.map((item) => item.category)))

  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Portfolio</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Browse through our collection of professional photography work
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="grid grid-flow-col auto-cols-max gap-2">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <PortfolioItem key={index} item={item} />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <PortfolioItem key={index} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function PortfolioItem({ item }: { item: PortfolioItemType }) {
  return (
    <div className="overflow-hidden transition-all rounded-lg group hover:shadow-xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition-opacity bg-black/60 opacity-0 group-hover:opacity-100">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-2">{item.category}</p>
          <Button variant="outline" size="sm" className="mt-4 text-white border-white hover:bg-white hover:text-black">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

// Types
type PortfolioItemType = {
  title: string
  category: string
  image: string
}

// Sample portfolio data
const portfolioItems: PortfolioItemType[] = [
  {
    title: "Summer Wedding",
    category: "Wedding",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Corporate Portraits",
    category: "Portrait",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Fashion Shoot",
    category: "Fashion",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Family Reunion",
    category: "Event",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Product Launch",
    category: "Commercial",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Engagement Session",
    category: "Couples",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Beach Wedding",
    category: "Wedding",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Graduation Photos",
    category: "Portrait",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Concert Photography",
    category: "Event",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Product Catalog",
    category: "Commercial",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Maternity Session",
    category: "Portrait",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Winter Wedding",
    category: "Wedding",
    image: "/placeholder.svg?height=600&width=800",
  },
]

