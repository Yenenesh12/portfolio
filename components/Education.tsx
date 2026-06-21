'use client';

import { Education as EducationType } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    HiOutlineAcademicCap,
    HiOutlineBookOpen,
    HiOutlineCalendar,
    HiOutlineCheckCircle,
    HiOutlineChip,
    HiOutlineLocationMarker,
    HiOutlineStar
} from 'react-icons/hi';

export default function Education({ data }: { data: EducationType[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Sample achievements (you can pass these from props or keep static)
  const achievements = [
    { icon: HiOutlineCheckCircle, text: 'Graduated with Honors' },
    { icon: HiOutlineChip, text: 'Machine Learning Specialization' },
    { icon: HiOutlineStar, text: 'Dean\'s List 2020-2023' },
  ];

  return (
    <section 
      id="education" 
      className="section relative overflow-hidden bg-secondary-950 min-h-screen flex items-center" 
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient blobs */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[140px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[140px] animate-blob animation-delay-2000" />
        
        {/* Additional accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-conic from-accent-500/5 via-transparent to-transparent" />
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -100, 100, -100],
              x: [null, 100, -100, 100],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6 hover:bg-accent-500/20 transition-all duration-300 cursor-default"
          >
            <span className="text-sm font-medium text-accent-300">Academic Journey</span>
          </motion.div>

          {/* Title with premium gradient */}
          <h2 className="section-title">
            <span className="gradient-text-premium inline-block text-4xl md:text-5xl lg:text-6xl">
              Education & Achievements
            </span>
          </h2>
          
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-accent-400 via-primary-400 to-accent-400 mx-auto mb-6 rounded-full"
          />
          
          {/* Subtitle */}
          <p className="section-subtitle text-secondary-300 max-w-2xl mx-auto">
            My academic background and continuous learning journey in technology
          </p>
        </motion.div>

        {/* Education Timeline/Cards */}
        <div className="max-w-5xl mx-auto">
          {/* Timeline indicator */}
          <div className="relative mb-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent-500/0 via-accent-500/50 to-accent-500/0" />
          </div>

          <div className="space-y-8 md:space-y-12">
            {data.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                onHoverStart={() => setActiveCard(idx)}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 rounded-full bg-gradient-to-r from-accent-400 to-primary-400 shadow-lg shadow-accent-500/30 z-10" />
                
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500 ${activeCard === idx ? 'opacity-30' : ''}`} />
                
                {/* Main Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative card-glass p-6 md:p-8 hover:border-accent-500/30 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Icon section with animated background */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {/* Animated rings */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-primary-400 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow" />
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-primary-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
                        
                        {/* Icon container */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-r from-accent-400 to-primary-400 p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                          <HiOutlineAcademicCap className="w-full h-full text-white" />
                        </div>
                        
                        {/* Decorative dots */}
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-accent-400 to-primary-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                          {/* Degree with gradient on hover */}
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                            {edu.degree}
                          </h3>
                          
                          {/* Institution with location */}
                          <div className="flex items-center gap-2 text-primary-400 text-base md:text-lg font-medium mb-2">
                            <HiOutlineLocationMarker className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{edu.institution}</span>
                          </div>
                        </div>
                        
                        {/* Year badge with animation */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20 text-accent-300 text-sm font-medium self-start"
                        >
                          <HiOutlineCalendar className="w-4 h-4" />
                          <span>{edu.year}</span>
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-secondary-300 leading-relaxed mb-6">
                        {edu.description}
                      </p>

                      {/* Achievements/Skills section */}
                      <div className="flex flex-wrap gap-3">
                        {achievements.map((achievement, i) => {
                          const Icon = achievement.icon;
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-secondary-300 hover:border-accent-500/30 hover:text-accent-300 transition-all duration-300"
                            >
                              <Icon className="w-3 h-3 text-accent-400" />
                              <span>{achievement.text}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 transition-all duration-500"
                       style={{ width: activeCard === idx ? '100%' : '0%' }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Stats/Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full card-glass border border-accent-500/20">
            <HiOutlineBookOpen className="w-5 h-5 text-accent-400" />
            <span className="text-secondary-300">Always learning, always growing</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-1 h-1 bg-accent-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Floating decorative shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 left-10 w-32 h-32 border border-accent-500/20 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 right-10 w-40 h-40 border border-primary-500/20 rounded-full hidden lg:block"
        />
        
        {/* Small floating particles */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-accent-400/30 animate-ping" />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-primary-400/30 animate-pulse" />
      </div>
    </section>
  );
}