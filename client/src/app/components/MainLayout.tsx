import React, { ReactNode, useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';
import { FaWhatsapp } from 'react-icons/fa';
import SignUpCard from './SignUpCard';
import NotificationCard from './NotificationCard';
import { useProducts } from '@/hooks/useProducts';

interface LayoutProps {
  children: ReactNode;
  showNavBar?: boolean;
  discountcontent?: boolean;
}

const Layout = ({
  children,
  showNavBar = true,
  discountcontent = true,
}: LayoutProps) => {
  
  // Manual auth state management since you only have mutation hooks
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Check your specific auth storage key
        const authStorageString = localStorage.getItem('auth-storage');
        
        if (authStorageString) {
          const authData = JSON.parse(authStorageString);
          const isLoggedIn = authData?.state?.isAuthenticated === true;
          
          // Debug logs
          console.log('🔍 Auth Debug:', { 
            authStorageExists: !!authStorageString,
            authData,
            isLoggedIn,
            user: authData?.state?.user
          });
          
          setIsAuthenticated(isLoggedIn);
        } else {
          console.log('🔍 Auth Debug: No auth-storage found');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-storage' || e.key === null) {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Debug log to see current auth state
  console.log('🔑 Current Auth State:', { isAuthenticated, authLoading });

  function getRandomTimestamp() {
    const times = [
      { text: 'min ago', range: [5, 60] },  // Random minutes between 5 and 60
      { text: 'hour ago', range: [1, 3] },  // Random hours between 1 and 3
    ];
   
    const timeType = times[Math.floor(Math.random() * times.length)]; // Randomly pick time type
    const randomTime = Math.floor(Math.random() * (timeType.range[1] - timeType.range[0])) + timeType.range[0]; // Random time within the range
   
    return `${randomTime} ${timeType.text}`;
  }

  const locations = [
    'Islamabad, Pakistan',
    'Karachi, Pakistan',
    'Lahore, Pakistan',
    'Rawalpindi, Pakistan',
    'Faisalabad, Pakistan',
    'Peshawar, Pakistan',
    'Quetta, Pakistan',
    'Multan, Pakistan',
    'Hyderabad, Pakistan',
    'Sukkur, Pakistan',
    'Gujranwala, Pakistan',
    'Abbottabad, Pakistan',
    'Bahawalpur, Pakistan',
  ];

  const { data: products, isLoading: productsLoading } = useProducts({});
  
  const notifications = products?.data?.map((product, index) => ({
    id: product.id,
    location: locations[index % locations.length],
    product: product.name,
    timestamp: getRandomTimestamp(),
    image: product.Variants?.[0]?.image || product?.Category?.icon,
  })) || [];
   
  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar */}
      {discountcontent && (
        <p className="text-center border-b text-sm py-1 text-primary font-semibold">
          Free Delivery Charges on Order Above 2999Rs !
        </p>
      )}
      {showNavBar && <NavBar />}
      
      {/* Main content */}
      <main className="flex-1 w-full mx-auto max-w-[1600px]">{children}</main>
      
      {/* Notification Card */}
      <div className="fixed bottom-2 left-2 z-40">
        {!productsLoading && notifications.length > 0 && (
          <div className="fixed bottom-2 left-2 z-40">
            <NotificationCard data={notifications as any} />
          </div>
        )}
      </div>
      
      {/* Footer */}
      {/* Only show SignUpCard if user is NOT authenticated and auth check is complete */}
      {!authLoading && !isAuthenticated && <SignUpCard />}
      <Footer />
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+923175657572"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-[#25D366] animate-bounce text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default Layout;