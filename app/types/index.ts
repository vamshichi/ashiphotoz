export interface Video {
    id: string
    title: string
    category: string
    url: string
    createdAt: string | Date
  }
  
  export interface Services {
    id: string
    name: string
    description: string
    createdAt: string | Date
  }
  
  export interface PortfolioItem {
    id: string
    title: string
    description: string
    imageUrl: string
    createdAt: string | Date
  }
  
  export interface Testimonial {
    id: string
    name: string
    feedback: string
    rating: number
    createdAt: string | Date
  }
  
  export interface Contact {
    id: string
    name: string
    email: string
    message: string
    createdAt: string | Date
  }
  
  