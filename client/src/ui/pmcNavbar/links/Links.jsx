import Link from 'next/link';
import React from 'react';

const Links = () => {
  const links = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Parking Slots", path: "/parkingslot" },
    { title: "Wardens", path: "/warden" }
  ];

  return (
    <div className="flex space-x-4">
      {links.map((link) => (
        <Link href={link.path} key={link.title} className="hover:text-white">
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;
