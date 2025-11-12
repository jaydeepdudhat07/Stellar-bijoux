import { use } from 'react';
import ProductDetailContent from '@/components/ProductDetailContent';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  return (
    <>
      <ProductDetailContent slug={slug} />
      <WhatsAppButton productTitle={slug} />
    </>
  );
}
