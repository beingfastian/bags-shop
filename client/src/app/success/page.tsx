"use client"
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        {/* Success Icon */}
        <CheckCircle className="text-primary mx-auto w-16 h-16 animate-bounce" />

        {/* Success Message */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-[#3f63ab] transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Page;
