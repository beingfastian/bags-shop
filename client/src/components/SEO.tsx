import Head from 'next/head';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
  type?: string; // For Open Graph (default 'website')
  twitterCardType?: string; // Default 'summary_large_image'
};

const SEO: React.FC<Props> = ({
  title = 'Maaoz Official Store | Premium Bags & Stationery Shop – Free Shipping & Quality Guaranteed',
  description = 'Explore Maaoz Official Store for premium bags, stylish stationery, and more. Enjoy unbeatable prices, quality products, and free shipping. Shop now!',
  keywords = 'premium bags, stylish stationery, tote bags, leather bags, office stationery, notebooks, bags shop, stationery shop, fashion accessories, bags online, Maaoz Official Store, high-quality bags, designer bags',
  imageUrl = '/images/hero-banner.jpg', // Update with the correct image URL
  url = 'https://maaozofficialstore.shop',
  type = 'website', // Default Open Graph type is 'website'
  twitterCardType = 'summary_large_image', // Default Twitter card type
}) => {
  return (
    <Head>
      {/* General Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:card" content={twitterCardType} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'name': 'Maaoz Official Store',
            'url': url,
            'description': description,
            'publisher': {
              '@type': 'Organization',
              'name': 'Maaoz Official Store',
              'logo': `${url}/WhatsApp Image 2025-02-08 at 1.30.33 AM.jpeg`, // Update the logo URL
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
