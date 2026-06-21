'use client';

import { About as AboutType } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineLightBulb,
  HiOutlineUser
} from 'react-icons/hi';

export default function About({ data }: { data: AboutType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const stats = [
    { label: 'Years Experience', value: '1+', icon: HiOutlineBriefcase, color: 'from-blue-400 to-blue-600' },
    { label: 'Projects Completed', value: '15+', icon: HiOutlineCode, color: 'from-purple-400 to-purple-600' },
    // { label: 'Happy Clients', value: '10+', icon: HiOutlineHeart, color: 'from-pink-400 to-pink-600' },
    { label: 'Technologies', value: '10+', icon: HiOutlineChip, color: 'from-amber-400 to-amber-600' },
  ];

  const cards = [
    {
      title: 'Professional Summary',
      content: data.summary,
      icon: HiOutlineBriefcase,
      gradient: 'from-primary-400 to-primary-600',
      delay: 0.1,
      color: 'primary'
    },
    {
      title: 'Career Goals',
      content: data.careerGoals,
      icon: HiOutlineLightBulb,
      gradient: 'from-accent-400 to-accent-600',
      delay: 0.2,
      color: 'accent'
    },
    {
      title: 'Bio',
      content: data.bio,
      icon: HiOutlineUser,
      gradient: 'from-primary-400 to-accent-500',
      delay: 0.3,
      color: 'mixed'
    }
  ];

  return (
    <section
      id="about"
      className="section relative overflow-hidden bg-secondary-950"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-[160px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-500/5 blur-[160px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 30, -30, 30],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-300">Get to know me</span>
          </motion.div>

          {/* Title */}
          <h2 className="section-title">
            <span className="gradient-text-premium inline-block">
              About Me
            </span>
          </h2>
          
          {/* Subtitle with animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto mb-6"
          />
          
          <p className="section-subtitle text-secondary-300">
            Passionate creator with a vision to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Cards Grid - Modern Layout */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: card.delay }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="group relative"
            >
              {/* Card Background Gradient */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500`} />
              
              {/* Main Card */}
              <div className="relative card-glass p-8 h-full flex flex-col hover:border-primary-500/30 transition-all duration-500">
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${card.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {card.title}
                </h3>

                {/* Content */}
                <p className="text-secondary-300 leading-relaxed flex-grow">
                  {card.content}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl" />
                
                {/* Animated border */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                  initial={{ width: "0%" }}
                  animate={{ width: activeCard === index ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section with Interactive Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative w-72"
              >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                
                {/* Stat Card */}
                <div className="relative card-glass p-8 text-center hover:border-white/20 transition-all duration-300">
                  {/* Icon with gradient */}
                  <div className={`w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-r ${stat.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Value with counter animation */}
                  <motion.div 
                    className="text-4xl font-bold gradient-text"
                    initial={{ scale: 0.5 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-base text-secondary-400 mt-2 font-medium">
                    {stat.label}
                  </div>

                  {/* Decorative dot */}
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} opacity-50`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills/Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          {/* <h4 className="text-lg font-semibold text-secondary-300 mb-6">
            Specialized In
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'UI/UX Design','Flutter','Angular','ASP.NET Core','PostgreSQL'].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary-300 text-sm font-medium hover:border-primary-500/30 hover:text-primary-300 transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div> */}
        </motion.div>

        {/* Floating shapes for visual interest */}
        <div className="absolute bottom-0 left-10 w-20 h-20 border border-primary-500/20 rounded-full animate-float" />
        <div className="absolute top-40 right-10 w-32 h-32 border border-accent-500/20 rounded-full animate-float animation-delay-2000" />
      </div>
    </section>
  );
}