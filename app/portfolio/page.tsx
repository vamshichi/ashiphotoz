import { prisma } from "@/lib/prisma";
import PortfolioGrid from "./components/PortfolioGrid";

export default async function PortfolioPage() {
  const portfolioItems = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const categories = [
    "All",
    "Wedding",
    "Portrait",
    "Fashion",
    "Event",
    "Commercial",
    "Couples"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-600">
            Browse through our collection of professional photography work
          </p>
        </div>

        <PortfolioGrid 
          initialItems={portfolioItems} 
          categories={categories}
        />
      </div>
    </div>
  );
}

