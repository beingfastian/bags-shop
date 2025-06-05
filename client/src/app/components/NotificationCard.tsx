// import Image from 'next/image';

// const NotificationCard = () => {
//   return (
//     <div className="flex items-center bg-white shadow-md p-2 rounded-lg max-w-sm">
//       {/* Image Section */}
//       <div className="flex-shrink-0">
//         <Image
//           src="/Stylish Ankara short gown styles 1.png" // Replace with your image path
//           alt="Product Image"
//           width={50}
//           height={50}
//           className="rounded-full"
//         />
//       </div>

//       {/* Text Section */}
//       <div className="ml-4">
//         <p className="text-gray-700 text-sm">
//           <span className="font-medium">Someone in Rawalpindi, Pakistan</span> purchased a
//         </p>
//         <p
//         //   href="#"
//           className="text-blue-500 text-xs font-medium"
//         >
//           Adi Imported Tracksuit - Black
//         </p>
//         <p className="text-gray-400 text-[10px] mt-1">15 minutes ago</p>
//       </div>
//     </div>
//   );
// };

// export default NotificationCard;


'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NotificationCardProps {
  data: {
    id: number;
    location: string;
    product: string;
    timestamp: string;
    image: string;
  }[];
}

const NotificationCard = ({ data }: NotificationCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible) {
      // Timer to show the notification for 3 seconds
      timer = setTimeout(() => {
        setIsVisible(false); // Hide notification
      }, 5000);
    } else {
      // Timer to hide the notification for 56 seconds
      timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Move to the next notification
        setIsVisible(true); // Show notification again
      }, 16000);
    }

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [isVisible, data.length]);

  if (!isVisible) {
    return null; // Don't render anything if the notification is hidden
  }

  const currentNotification = data[currentIndex];

  return (
    <div className="flex items-center bg-white shadow-md p-2 rounded-lg max-w-sm">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <Image
          src={currentNotification.image}
          alt={currentNotification.product}
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>

      {/* Text Section */}
      <div className="ml-4">
        <p className="text-gray-700 text-sm">
          <span className="font-medium">
            Someone in {currentNotification.location}
          </span>{' '}
          purchased a
        </p>
        <p className="text-blue-500 text-xs font-medium">
          {currentNotification.product}
        </p>
        <p className="text-gray-400 text-[10px] mt-1">
          {currentNotification.timestamp}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
