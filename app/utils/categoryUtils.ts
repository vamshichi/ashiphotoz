// Define the ContentType enum locally if you're not using it elsewhere
export enum ContentType {
  YOUTUBE = "YOUTUBE",
  IMAGE = "IMAGE",
  SERVICE = "SERVICE",
  TESTIMONIAL = "TESTIMONIAL"
}

export function validateAndConvertCategory(category: string): ContentType {
  const normalizedCategory = category.toUpperCase().replace(/-/g, "_");
  
  if (!Object.values(ContentType).includes(normalizedCategory as ContentType)) {
    throw new Error(`Invalid category. Must be one of: ${Object.values(ContentType).join(", ")}`);
  }
  
  return normalizedCategory as ContentType;
}

export function formatCategoryForDisplay(category: ContentType): string {
  return category.toLowerCase().replace(/_/g, "-");
} 