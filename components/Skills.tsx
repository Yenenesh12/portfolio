'use client';

import { Skill } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGitAlt, FaNode, FaReact } from 'react-icons/fa';
import {
    HiOutlineChartBar,
    HiOutlineChip,
    HiOutlineCode,
    HiOutlineCog,
    HiOutlineServer,
    HiOutlineStar
} from 'react-icons/hi';
import { SiTensorflow } from 'react-icons/si';

export default function Skills({ data }: { data: Skill[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { 
      name: 'Frontend', 
      icon: HiOutlineCode,
      gradient: 'from-cyan-400 via-blue-400 to-indigo-500',
      iconComponent: FaReact,
      description: 'Building responsive and interactive UIs'
    },
    { 
      name: 'Backend', 
      icon: HiOutlineServer,
      gradient: 'from-emerald-400 via-green-400 to-teal-500',
      iconComponent: FaNode,
      description: 'Scalable server-side applications'
    },
    { 
      name: 'Machine Learning', 
      icon: HiOutlineChip,
      gradient: 'from-purple-400 to-pink-400',
      iconComponent: SiTensorflow,
      description: 'AI and data-driven solutions'
    },
    { 
      name: 'Tools', 
      icon: HiOutlineCog,
      gradient: 'from-amber-400 to-orange-400',
      iconComponent: FaGitAlt,
      description: 'Development and deployment tools'
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Frontend': return FaReact;
      case 'Backend': return FaNode;
      case 'Machine Learning': return SiTensorflow;
      case 'Tools': return FaGitAlt;
      default: return HiOutlineCode;
    }
  };

  return (
    <section 
      id="skills" 
      className="section relative overflow-hidden bg-secondary-950 min-h-screen flex items-center"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[140px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[140px] animate-blob animation-delay-2000" />
        
        {/* Additional accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        </div>

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -150, 150, -150],
              x: [null, 150, -150, 150],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: Math.random() * 25 + 25,
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
            <span className="text-sm font-medium text-primary-300">Tech Stack</span>
          </motion.div>

          {/* Title with premium gradient */}
          <h2 className="section-title">
            <span className="gradient-text-premium inline-block text-4xl md:text-5xl lg:text-6xl">
              Skills & Expertise
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
            Technologies and tools I work with to build amazing applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {categories.map((category, idx) => {
            const categorySkills = data.filter(skill => skill.category === category.name);
            const CategoryIcon = category.icon;
            const TechIcon = category.iconComponent;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="group relative"
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 blur transition duration-500`} />

                {/* Main Card */}
                <div className="relative card-glass p-8 transition-all duration-500">
                  {/* Header with icon */}
                  <div className="flex items-center gap-4 mb-8">
                    {/* Icon container */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl opacity-20 blur-xl transition-opacity duration-500`} />
                      <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} p-4 transition-all duration-300 shadow-lg`}>
                        <CategoryIcon className="w-full h-full text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-2`}>
                        {category.name}
                      </h3>
                      <p className="text-sm text-secondary-400">{category.description}</p>
                    </div>

                    {/* Tech icon */}
                    <div className="ml-auto">
                      <TechIcon className="w-10 h-10 text-secondary-600" />
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-6">
                    {categorySkills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + skillIdx * 0.1 }}
                        className="relative"
                      >
                        {/* Skill header */}
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-secondary-200 font-medium">{skill.name}</span>
                            {skillIdx === 0 && (
                              <HiOutlineStar className="w-4 h-4 text-yellow-400 animate-pulse" />
                            )}
                          </div>
                          <span className={`text-sm font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Progress bar container */}
                        <div className="relative h-3 bg-secondary-800/50 rounded-full overflow-hidden">
                          {/* Background pattern */}
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:8px_8px]" />
                          
                          {/* Animated progress bar */}
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                            transition={{ duration: 1.2, delay: 0.7 + skillIdx * 0.1, ease: "easeOut" }}
                            className={`relative h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                          >
                            {/* Shine effect */}
                            <motion.div
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: skillIdx * 0.2 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                            
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} blur-md opacity-50`} />
                          </motion.div>
                        </div>

                        {/* Hover detail removed */}
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-sm text-secondary-400">
                      <HiOutlineChartBar className="w-4 h-4" />
                      <span>{categorySkills.length} technologies</span>
                    </div>
                    <div className="flex -space-x-2">
                      {categorySkills.slice(0, 3).map((skill) => (
                        <div
                          key={skill.id}
                          className="w-6 h-6 rounded-full bg-secondary-800 border-2 border-secondary-900 flex items-center justify-center"
                        >
                          <span className="text-[8px] font-bold text-primary-400">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Proficiency Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full card-glass border border-primary-500/20">
            <span className="text-secondary-300">Always learning and expanding my skill set</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            />
          </div>
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
          className="absolute top-40 right-10 w-12 h-12 border border-primary-500/20 rounded-full hidden lg:block"
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
          className="absolute bottom-40 left-10 w-16 h-16 border border-accent-500/20 rounded-full hidden lg:block"
        />
      </div>
    </section>
  );
}