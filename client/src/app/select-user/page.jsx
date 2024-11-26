import Link from "next/link"
// import Image from "next/image"
import Navbar3 from "@/ui/navbar3/navbar3"
// import Footer from "@/ui/footer/Footer"

export default function SelectUser() {
  return (
    <div >
      <Navbar3/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-500 to-white p-4">
      {/* <Link href="/">
        <Image
          src="/images/Group 178.png"
          alt="Company Logo"
          width={160}
          height={160}
          // className="mt-5"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            margin: "0.75 rem", // optional for spacing from edges
          }}
        />
      </Link> */}
      
      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4 text-center">Choose Your Role</h1>
      <p className="text-gray-700 mb-8 text-center max-w-md font-semibold text-lg">
        Select the option that best describes you to get started with our services.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <UserCard 
          href="/register"
          imageSrc="/images/driver user.png"
          title="Driver"
          description="Register as a driver to find and book parking spaces easily."
        />
        <UserCard 
          href="/register-pmc"
          imageSrc="/images/office-building.png"
          title="Parking Management Company"
          description="Manage your parking facilities and increase efficiency."
        />
      </div>
    </div>

    {/* <Footer/> */}

    </div>
  )
}

function UserCard({ href, imageSrc, title, description }) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6">
          <img src={imageSrc} alt={title} className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
          <p className="text-gray-600 text-center">{description}</p>
        </div>
        <div className="bg-yellow-500 text-white text-center py-3 font-semibold">
          Get Started
        </div>
      </div>
    </Link>
  )
}

