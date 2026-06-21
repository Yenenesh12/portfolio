'use client';

import { Hero as HeroType } from '@/types';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import {
    FaArrowRight,
    FaDownload,
    FaEnvelope,
    FaGithub,
    FaLinkedin
} from 'react-icons/fa';

export default function Hero({ data }: { data: HeroType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 -left-40 w-[800px] h-[800px] rounded-full bg-primary-500/10 blur-[160px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-500/10 blur-[160px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
        </div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -200, 200, -200],
              x: [null, 200, -200, 200],
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 25 + 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 hover:bg-primary-500/20 transition-all duration-300 cursor-default"
            >
              <span className="text-sm font-medium text-primary-300">Welcome to my portfolio</span>
            </motion.div>

            {/* Name with gradient */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {data.fullName.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="inline-block mr-3 last:mr-0"
                >
                  {i === data.fullName.split(' ').length - 1 ? (
                    <span className="gradient-text-premium">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Professional Title with typing effect */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6"
            >
              <span className="gradient-text">
                {data.professionalTitle}
              </span>
            </motion.h2>

            {/* Tagline with animated reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-secondary-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {data.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
            >
              {/* Primary CTA */}
              <motion.a
                href={data.resumeLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
              >
                {/* Button background with animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Button content */}
                <span className="relative flex items-center gap-3">
                  <FaDownload className="group-hover:animate-bounce" /> 
                  Download Resume
                </span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-primary-500/50 group-hover:border-primary-400 transition-all duration-300 rounded-xl" />
                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-all duration-300" />
                <span className="relative flex items-center gap-3">
                  Contact Me
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-6 justify-center lg:justify-start"
            >
              {data.socialLinks?.github && (
                <motion.a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-all duration-300">
                    <FaGithub className="text-2xl text-secondary-400 group-hover:text-primary-400 transition-colors duration-300" />
                  </div>
                </motion.a>
              )}
              
              {data.socialLinks?.linkedin && (
                <motion.a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-all duration-300">
                    <FaLinkedin className="text-2xl text-secondary-400 group-hover:text-primary-400 transition-colors duration-300" />
                  </div>
                </motion.a>
              )}
              
              {data.socialLinks?.email && (
                <motion.a
                  href={`mailto:${data.socialLinks.email}`}
                  whileHover={{ y: -5, scale: 1.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-all duration-300">
                    <FaEnvelope className="text-2xl text-secondary-400 group-hover:text-primary-400 transition-colors duration-300" />
                  </div>
                </motion.a>
              )}
            </motion.div>

            {/* Stats/Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { label: 'Years Experience', value: '1+' },
                { label: 'Projects Completed', value: '20+' },
                // { label: 'Happy Clients', value: '30+' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-secondary-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated rings */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 180 : 0,
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full blur-3xl opacity-30"
              />
              
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/30"
              />
              
              {/* Inner rings */}
              <div className="absolute inset-4 rounded-full border border-primary-500/20" />
              <div className="absolute inset-8 rounded-full border border-accent-500/20" />

              {/* Image container */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-primary-500/50 shadow-2xl shadow-primary-500/30">
                <div className="relative w-full h-full">
                  <Image
                    src={data.profileImage || '/placeholder.jpg'}
                    alt={data.fullName}
                    fill
                    className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-xl opacity-60"
              />
              
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur-xl opacity-60"
              />

              {/* Tech icons floating around */}
              {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="absolute"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: i % 2 === 0 ? '-10%' : 'auto',
                    right: i % 2 === 1 ? '-10%' : 'auto',
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5,
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white whitespace-nowrap"
                  >
                    {tech}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}