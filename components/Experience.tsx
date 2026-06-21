'use client';

import { Experience as ExperienceType } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    HiOutlineBriefcase,
    HiOutlineCalendar,
    HiOutlineChartBar,
    HiOutlineCheckCircle,
    HiOutlineCode,
    HiOutlineLocationMarker,
    HiOutlineStar
} from 'react-icons/hi';

export default function Experience({ data }: { data: ExperienceType[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="experience" 
      className="section relative overflow-hidden bg-secondary-900 min-h-screen flex items-center" 
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient blobs */}
        <div className="absolute top-1/4 -left-40 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[140px] animate-blob" />
        <div className="absolute bottom-1/4 -right-40 w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[140px] animate-blob animation-delay-2000" />
        
        {/* Additional accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        </div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -100, 100, -100],
              x: [null, 100, -100, 100],
              scale: [1, 1.5, 1],
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 hover:bg-primary-500/20 transition-all duration-300 cursor-default"
          >
            <span className="text-sm font-medium text-primary-300">Professional Journey</span>
          </motion.div>

          {/* Title with premium gradient */}
          <h2 className="section-title">
            <span className="gradient-text-premium inline-block text-4xl md:text-5xl lg:text-6xl">
              Work Experience
            </span>
          </h2>
          
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 mx-auto mb-6 rounded-full"
          />
          
          {/* Subtitle */}
          <p className="section-subtitle text-secondary-300 max-w-2xl mx-auto">
            My professional experience and the impactful projects I've delivered
          </p>
        </motion.div>

        {/* Timeline Experience */}
        <div className="relative max-w-5xl mx-auto">
          {/* Modern timeline line with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/0 via-primary-500/50 to-accent-500/0" />
            <div className="absolute inset-0 bg-gradient-to-b from-accent-500/0 via-accent-500/50 to-primary-500/0 animate-pulse-slow" />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {data.map((exp, idx) => {
              const techStack = exp.technologies || [];
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                  className={`relative flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-start gap-8 md:gap-12`}
                >
                  {/* Timeline dot with animation */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 animate-ping opacity-20" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 border-4 border-secondary-900 z-10" />
                  </div>

                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'} pl-16 md:pl-0`}>
                    <div className="relative">
                      {/* Card glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-0 blur transition duration-500" />
                      
                      {/* Main card */}
                      <div className="relative card-glass p-6 md:p-8 transition-all duration-500">
                        {/* Header with icon and duration */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl opacity-20 blur-xl transition-opacity duration-500" />
                              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-primary-400 to-accent-400 p-3 transition-all duration-300">
                                <HiOutlineBriefcase className="w-full h-full text-white" />
                              </div>
                            </div>
                            
                            {/* Duration badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                              <HiOutlineCalendar className="w-3.5 h-3.5 text-accent-400" />
                              <span className="text-xs text-accent-300 font-medium">{exp.duration}</span>
                            </div>
                          </div>

                          {/* Company badge */}
                          <div className="px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                            <span className="text-xs font-medium text-primary-300">{exp.company}</span>
                          </div>
                        </div>

                        {/* Role */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>

                        {/* Location (if available) */}
                        {exp.location && (
                          <div className="flex items-center gap-2 text-secondary-400 text-sm mb-4">
                            <HiOutlineLocationMarker className="w-4 h-4 text-primary-400" />
                            <span>{exp.location}</span>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-secondary-300 leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        {/* Responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <HiOutlineStar className="w-4 h-4 text-accent-400" />
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                  className="flex items-start gap-2 text-secondary-400 text-sm"
                                >
                                  <HiOutlineCheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <HiOutlineCode className="w-4 h-4 text-primary-400" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {techStack.map((tech, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-secondary-300"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: HiOutlineBriefcase, label: 'Years Experience', value: '1+' },
            { icon: HiOutlineCode, label: 'Projects Delivered', value: '20+' },
            // { icon: HiOutlineStar, label: 'Happy Clients', value: '10+' },
            { icon: HiOutlineChartBar, label: 'Success Rate', value: '98%' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="card-glass p-8 text-center w-56"
              >
                <div className="relative w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-r from-primary-400 to-accent-400 p-4">
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-base text-secondary-400 mt-2">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating decorative shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-10 w-24 h-24 border border-primary-500/20 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-10 w-32 h-32 border border-accent-500/20 rounded-full hidden lg:block"
        />
      </div>
    </section>
  );
}