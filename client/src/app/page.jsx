import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-white"> {/* Main background color white */}
      <Head>
        <title>ParkEase - Your Parking Solution</title>
        <meta name="description" content="ParkEase - Simplifying parking for you." />
      </Head>

     
      <main className="py-10">
        <section className="bg-black text-white text-center py-20"> {/* Black background, white text */}
          <h2 className="text-4xl font-bold">Welcome to ParkEase</h2>
          <p className="mt-4 text-lg">Simplifying your parking experience</p>
        </section>

        <section id="features" className="py-20 bg-white text-center"> {/* White background */}
          <h2 className="text-3xl font-bold text-black">Features</h2> {/* Black text */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-6 bg-yellow-100 rounded shadow"> {/* Light yellow background */}
              <h3 className="text-xl font-semibold text-black">Real-time Parking Availability</h3> {/* Black text */}
              <p className="mt-4 text-gray-700">Know where the spots are available instantly.</p> {/* Gray text for details */}
            </div>
            <div className="p-6 bg-yellow-100 rounded shadow">
              <h3 className="text-xl font-semibold text-black">Seamless Booking</h3>
              <p className="mt-4 text-gray-700">Book a spot in advance with ease.</p>
            </div>
            <div className="p-6 bg-yellow-100 rounded shadow">
              <h3 className="text-xl font-semibold text-black">Secure Payment Options</h3>
              <p className="mt-4 text-gray-700">Pay securely using multiple payment methods.</p>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20 bg-black text-center"> {/* Black background */}
          <h2 className="text-3xl font-bold text-yellow-500">Benefits</h2> {/* Yellow text */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="p-6 bg-yellow-500 rounded shadow"> {/* Yellow background */}
              <h3 className="text-xl font-semibold text-white">Save Time</h3> {/* White text */}
              <p className="mt-4 text-black">No more circling the block. Find parking fast.</p> {/* Black text */}
            </div>
            <div className="p-6 bg-yellow-500 rounded shadow">
              <h3 className="text-xl font-semibold text-white">Cost-Effective</h3>
              <p className="mt-4 text-black">Get the best rates on parking spaces.</p>
            </div>
            <div className="p-6 bg-yellow-500 rounded shadow">
              <h3 className="text-xl font-semibold text-white">Stress-Free Experience</h3>
              <p className="mt-4 text-black">Enjoy a smooth parking process every time.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-white text-center"> {/* White background */}
          <h2 className="text-3xl font-bold text-black">How It Works</h2> {/* Black text */}
          <div className="max-w-4xl mx-auto mt-8 space-y-10">
            <div className="p-6 bg-yellow-100 rounded shadow"> {/* Light yellow background */}
              <h3 className="text-xl font-semibold text-black">Step 1: Search</h3>
              <p className="mt-4 text-gray-700">Enter your destination to find nearby parking spots.</p> {/* Gray text for details */}
            </div>
            <div className="p-6 bg-yellow-100 rounded shadow">
              <h3 className="text-xl font-semibold text-black">Step 2: Book</h3>
              <p className="mt-4 text-gray-700">Select and reserve your preferred parking spot.</p>
            </div>
            <div className="p-6 bg-yellow-100 rounded shadow">
              <h3 className="text-xl font-semibold text-black">Step 3: Park</h3>
              <p className="mt-4 text-gray-700">Drive to the location and park in your reserved spot.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black text-center"> {/* Black background */}
          <h2 className="text-3xl font-bold text-yellow-500">Contact Us</h2> {/* Yellow text */}
          <p className="mt-4 text-white">Have any questions? Reach out to us at <a href="mailto:support@parkease.com" className="text-yellow-500">support@parkease.com</a>.</p> {/* White text, yellow link */}
        </section>
      </main>

      <footer className="bg-yellow-500 text-black text-center py-6"> {/* Yellow background, black text */}
        <p>&copy; 2024 ParkEase. All rights reserved.</p>
      </footer>
    </div>
  );
}
