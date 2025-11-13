'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useSettings } from '@/hooks/useSettings';

// Dynamically import map component to avoid SSR issues
const ShowroomMap = dynamic(() => import('@/components/ShowroomMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

interface Showroom {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  latitude: number;
  longitude: number;
}

export default function ContactPageContent() {
  const { data: settings } = useSettings();
  const whatsappNumber = settings?.whatsapp;
  const [selectedShowroomIndex, setSelectedShowroomIndex] = useState<number | null>(null);

  const showrooms = useMemo(() => {
    if (!settings?.showrooms) return [];
    try {
      const parsed = JSON.parse(settings.showrooms);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }, [settings?.showrooms]);

  const handleShowroomClick = (index: number) => {
    setSelectedShowroomIndex(index);
    // Scroll to map section
    setTimeout(() => {
      const mapSection = document.getElementById('showroom-map');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };
  return (
    <>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold heading-font text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700">
              We'd love to hear from you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Showrooms Section */}
        {showrooms.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold heading-font text-gray-900 mb-8 text-center">
              Our Showrooms
            </h2>

            {/* Showroom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {showrooms.map((showroom: Showroom, index: number) => (
                <div
                  key={index}
                  onClick={() => handleShowroomClick(index)}
                  className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-all duration-300 ${selectedShowroomIndex === index
                      ? 'border-gold shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gold hover:shadow-lg'
                    }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold heading-font text-gray-900">
                      {showroom.name}
                    </h3>
                    {selectedShowroomIndex === index && (
                      <svg
                        className="w-5 h-5 text-gold flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-medium">{showroom.address}</p>
                    <p>{showroom.city}, {showroom.country}</p>
                    {showroom.phone && (
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {showroom.phone}
                      </p>
                    )}
                    {showroom.email && (
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={`mailto:${showroom.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-gold transition-colors"
                        >
                          {showroom.email}
                        </a>
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gold font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Click to view on map
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div id="showroom-map" className="mt-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                <ShowroomMap
                  showrooms={showrooms}
                  selectedIndex={selectedShowroomIndex}
                />
              </div>
              {selectedShowroomIndex !== null && (
                <p className="text-center text-sm text-gray-600 mt-4">
                  Showing location: <span className="font-semibold text-gold">{showrooms[selectedShowroomIndex]?.name}</span>
                </p>
              )}
            </div>

            {/* WhatsApp Contact - moved below map */}
            <div className="mt-16 bg-gradient-to-br from-gold-light to-wheat rounded-2xl shadow-lg p-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold heading-font text-gray-900 mb-3">
                Chat with us on WhatsApp
              </h3>
              <p className="text-gray-700 mb-6 max-w-md mx-auto">
                Get instant responses to your jewelry inquiries. Our team is ready to help you find the perfect piece.
              </p>

              <a
                href={getWhatsAppLink(undefined, whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105"
              >
                Start Chat
              </a>

              <p className="text-sm text-gray-600 mt-4">
                Quick, convenient, and secure
              </p>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold heading-font text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom jewelry design?
              </h3>
              <p className="text-gray-700">
                Yes! We specialize in creating custom pieces. Contact us on WhatsApp to
                discuss your design ideas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-700">
                We'll discuss payment options when you contact us about a specific piece.
                We offer flexible payment solutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you provide certificates for your jewelry?
              </h3>
              <p className="text-gray-700">
                Yes, all our jewelry comes with proper certification and authenticity
                documents.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does delivery take?
              </h3>
              <p className="text-gray-700">
                Delivery times vary based on your location and whether the piece needs to
                be custom-made. Contact us for specific timelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
