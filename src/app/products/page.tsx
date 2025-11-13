import AllProductsContent from '@/components/AllProductsContent';
import WhatsAppButton from '@/components/WhatsAppButton';

interface ProductsPageProps {
  searchParams: Promise<{ featured?: string }> | { featured?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Handle both Promise and direct object (for Next.js compatibility)
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const isFeatured = params.featured === 'true';
  
  return (
    <>
      <AllProductsContent featured={isFeatured} />
      <WhatsAppButton />
    </>
  );
}

