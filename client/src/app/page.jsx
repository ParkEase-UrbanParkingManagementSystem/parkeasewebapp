'use client'
import React from "react";
import styles from "./home.module.css";
import Hero from "@/ui/hero/hero";
import About from "@/ui/about/about";
import Work from "@/ui/work/work";
import Contact from "@/ui/contact/contact";
import Footer from "@/ui/footer/Footer";
import './globals.css';
import Image from "next/image";

const Home = ()=> {
  return (
    <div className={styles.container}>
    <div className={styles.App}>
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
    </div>
  );
};

export default Home;
