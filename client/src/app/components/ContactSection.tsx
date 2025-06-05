import Image from 'next/image';

export default function ContactSection() {
  return (
    <div
      className="relative min-h-screen mt-4 bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:w-4/5 w-[95%] mx-auto rounded-xl"
      style={{ backgroundImage: "url('/contact1.png')" }}
    >
      <div className="relative hidden  lg:block w-full lg:w-1/2  mt-10 left-10 gap-4">
        <div className="relative  top-20 left-5">
          <Image
            src="/Ellipse.png"
            alt="Image 1"
            className=" rounded-full object-cover -left-10"
            width={120}
            height={120}
          />
        </div>
        <div className="relative  left-20 top-5">
          <Image
            src="/Ellipse1.png"
            alt="Image 1"
            className="relative rounded-full object-cover -left-10"
            width={200}
            height={200}
          />
        </div>

        <div className="relative left-40 -top-8">
          <Image
            src="/Ellipse.png"
            alt="Image 2"
            className="rounded-full object-cover"
            width={120}
            height={120}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2  max-w-lg bg-white pt-6 shadow-lg rounded-lg clip-top-left">
        <p className="text-sm text-center  ml-10 px-10 font-OpenSans font-bold leading-6 text-gray-500 mb-4">
          <span className="text-[#3734A9]">You can find me</span> in my store if
          you want to take a look at my sculptures.
        </p>
        <form className="space-y-4 ">
          <div className="px-10">
            <label
              htmlFor="name"
              className="block text-sm font-normal  text-[#3734A9]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-2 border-0 border-b border-[#3734A9]  focus:outline-none"
            />
          </div>
          <div className="px-10">
            <label
              htmlFor="email"
              className="block text-sm font-normal text-[#3734A9]"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border-0 border-b border-[#3734A9] focus:outline-none "
            />
          </div>
          <div className="px-10">
            <label
              htmlFor="message"
              className="block text-sm font-normal text-[#3734A9]"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full mt-1 p-2  border-0 border-b border-[#3734A9] focus:outline-none"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#ea4930] text-white py-2 text-xl font-bold"
            >
              Let’s talk! →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
