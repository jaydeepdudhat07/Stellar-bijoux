import { use } from 'react';
import CategoryPageContent from '@/components/CategoryPageContent';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  return (
    <>
      <CategoryPageContent slug={slug} />
      <WhatsAppButton />
    </>
  );
}
