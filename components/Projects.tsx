'use client';

import { Project } from '@/types';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import {
    FaCode,
    FaExternalLinkAlt,
    FaEye,
    FaGithub,
    FaStar
} from 'react-icons/fa';
import { HiOutlineChip } from 'react-icons/hi';

export default function Projects({ data }: { data: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const categories = ['all', ...Array.from(new Set(data.map(p => p.category)))];
  
  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      className="section relative overflow-hidden bg-secondary-900 min-h-screen"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[140px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[140px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
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

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
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
            <span className="text-sm font-medium text-primary-300">My Work</span>
          </motion.div>

          {/* Title with premium gradient */}
          <h2 className="section-title">
            <span className="gradient-text-premium inline-block text-4xl md:text-5xl lg:text-6xl">
              Featured Projects
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
            Showcasing my best work and creative endeavors
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden group ${
                filter === cat
                  ? 'text-white'
                  : 'text-secondary-400 hover:text-white'
              }`}
            >
              {/* Button background */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                  : 'bg-white/5 group-hover:bg-white/10'
              }`} />
              
              {/* Glow effect */}
              {filter === cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-lg opacity-50" />
              )}
              
              {/* Button content */}
              <span className="relative flex items-center gap-2">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              onHoverStart={() => setHoveredId(project.id || null)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500 ${
                hoveredId === project.id ? 'opacity-30' : ''
              }`} />

              {/* Main Card */}
              <div className="relative card-glass h-full flex flex-col overflow-hidden hover:border-primary-500/30 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ x: 100 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-4 right-4 z-10"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-lg opacity-50" />
                        <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <FaStar className="animate-pulse" /> Featured
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white">
                      {project.category}
                    </div>
                  </div>

                  {/* Hover overlay with quick actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-secondary-950/80 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                    )}
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-accent-500 hover:border-accent-500 transition-all duration-300"
                      >
                        <FaEye className="text-xl" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-secondary-300 hover:border-primary-500/30 hover:text-primary-300 hover:bg-primary-500/5 transition-all duration-300 flex items-center gap-1"
                      >
                        <HiOutlineChip className="w-3 h-3" />
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-secondary-400 hover:text-primary-400 transition-colors duration-300 text-sm font-medium group/link"
                      >
                        <FaGithub className="text-base group-hover/link:rotate-12 transition-transform duration-300" />
                        <span>Code</span>
                      </motion.a>
                    )}
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-secondary-400 hover:text-accent-400 transition-colors duration-300 text-sm font-medium group/link"
                      >
                        <FaExternalLinkAlt className="text-xs group-hover/link:rotate-12 transition-transform duration-300" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-2">
              Want to see more?
              <FaCode className="group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </motion.a>
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
          className="absolute top-40 left-10 w-24 h-24 border border-primary-500/20 rounded-full hidden lg:block"
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
          className="absolute bottom-40 right-10 w-32 h-32 border border-accent-500/20 rounded-full hidden lg:block"
        />
      </div>
    </section>
  );
}