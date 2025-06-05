"use client"
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        {/* Error Icon */}
        <AlertTriangle className="text-red-500 mx-auto w-16 h-16 animate-bounce" />

        {/* Error Message */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Payment Failed!
        </h2>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong while processing your payment. Please try again.
        </p>

        {/* Retry & Back Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => router.push("/checkout")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
