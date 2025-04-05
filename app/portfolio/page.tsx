
import Portfolio from "@/components/portfolio"

export default function PortfolioPage() {
  // Get unique categories
  // const categories = Array.from(new Set(portfolioItems.map((item) => item.category)))

  return (
    <div className="container px-4 py-16 mx-auto">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Portfolio</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Browse through our collection of professional photography work
        </p>
      </div>
      <Portfolio />
       </div>
  )
}

// // Types
// type PortfolioItemType = {
//   title: string
//   category: string
//   image: string
// }

// // Sample portfolio data
// const portfolioItems: PortfolioItemType[] = [
//   {
//     title: "Summer Wedding",
//     category: "Wedding",
//     image: "/images/images.png",
//   },
//   {
//     title: "Corporate Portraits",
//     category: "Portrait",
//     image: "/images/images.png",
//   },
//   {
//     title: "Fashion Shoot",
//     category: "Fashion",
//     image: "/images/images.png",
//   },
//   {
//     title: "Family Reunion",
//     category: "Event",
//     image: "/images/images.png",
//   },
//   {
//     title: "Product Launch",
//     category: "Commercial",
//     image: "/images/images.png",
//   },
//   {
//     title: "Engagement Session",
//     category: "Couples",
//     image: "/images/images.png",
//   },
//   {
//     title: "Beach Wedding",
//     category: "Wedding",
//     image: "/images/images.png",
//   },
//   {
//     title: "Graduation Photos",
//     category: "Portrait",
//     image: "/images/images.png",
//   },
//   {
//     title: "Concert Photography",
//     category: "Event",
//     image: "/images/images.png",
//   },
//   {
//     title: "Product Catalog",
//     category: "Commercial",
//     image: "/images/images.png",
//   },
//   {
//     title: "Maternity Session",
//     category: "Portrait",
//     image: "/images/images.png",
//   },
//   {
//     title: "Winter Wedding",
//     category: "Wedding",
//     image: "/images/images.png",
//   },
// ]

