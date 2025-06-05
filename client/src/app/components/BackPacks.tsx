import { motion } from 'framer-motion';
import Image from 'next/image';

const Backpacks = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* First Backpack */}
        <motion.div
          className="relative  perspective flex justify-center items-center"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'linear',
          }}
        >
          <Image
            src="images/bag.png" // Replace with your image file name
            alt="White Backpack"
            layout="fill"
            className="object-contain rounded-xl"
          />
        </motion.div>

        {/* Second Backpack */}
        <motion.div
          className="relative w-80 h-80 perspective"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'linear',
          }}
        >
          <Image
            src="images/bag.png" // Replace with your image file name
            alt="White Backpack"
            layout="fill"
            className="object-contain rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Backpacks;
