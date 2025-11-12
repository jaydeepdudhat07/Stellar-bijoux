export default function AboutPageContent() {
  return (
    <>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold heading-font text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-700">
            Crafting timeless elegance since the beginning
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold heading-font text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 mb-6">
            Welcome to our jewelry showcase, where each piece tells a story of craftsmanship,
            tradition, and timeless beauty. We specialize in creating exquisite gold jewelry
            that celebrates life's most precious moments.
          </p>

          <h2 className="text-3xl font-bold heading-font text-gray-900 mb-4 mt-12">
            Our Craftsmanship
          </h2>
          <p className="text-gray-700 mb-6">
            Every piece in our collection is crafted with meticulous attention to detail.
            We work with various gold carats (10k, 14k, 18k, and 22k) to suit different
            preferences and occasions. Our jewelry features stunning stones, including
            diamonds, carefully selected and set to enhance each design.
          </p>

          <h2 className="text-3xl font-bold heading-font text-gray-900 mb-4 mt-12">
            Gold Varieties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Yellow Gold</h3>
              <p className="text-gray-700">
                Classic and timeless, yellow gold brings warmth and traditional elegance
                to any piece.
              </p>
            </div>
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Rose Gold</h3>
              <p className="text-gray-700">
                Romantic and modern, rose gold adds a distinctive blush tone to jewelry.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">White Gold</h3>
              <p className="text-gray-700">
                Sleek and contemporary, white gold offers a sophisticated silvery appearance.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">Black Gold</h3>
              <p>
                Bold and unique, black gold makes a dramatic statement with its dark finish.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold heading-font text-gray-900 mb-4 mt-12">
            Our Collection
          </h2>
          <p className="text-gray-700 mb-6">
            From rings and bracelets to necklaces and earrings, our diverse collection
            caters to every occasion and style. Whether you're looking for a statement
            piece or an everyday essential, we have something special for you.
          </p>

          <div className="bg-yellow-50 p-8 rounded-lg text-center mt-12">
            <h3 className="text-2xl font-bold heading-font text-gray-900 mb-4">
              Let's Create Something Beautiful Together
            </h3>
            <p className="text-gray-700 mb-6">
              Get in touch with us to discuss your jewelry needs and custom designs
            </p>
            <a
              href="/contact"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

