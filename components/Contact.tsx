'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiOutlineMail, HiOutlinePaperAirplane, HiOutlineUser } from 'react-icons/hi';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-secondary-950"
      ref={ref}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-primary-500/5 blur-[140px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-accent-500/5 blur-[140px] animate-blob animation-delay-2000" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-300">Let's Connect</span>
          </motion.div>

          <h2 className="section-title">
            <span className="gradient-text-premium inline-block">Get In Touch</span>
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto mb-6"
          />
          
          <p className="section-subtitle text-secondary-300">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
            
            {/* Form container */}
            <form
              onSubmit={handleSubmit}
              className="relative card-glass p-8 md:p-10"
            >
              {/* Name field */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-secondary-300 mb-3 text-sm font-medium">
                  <HiOutlineUser className="w-4 h-4 text-primary-400" />
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary-900/50 border border-white/10 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email field */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-secondary-300 mb-3 text-sm font-medium">
                  <HiOutlineMail className="w-4 h-4 text-primary-400" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary-900/50 border border-white/10 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message field */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-secondary-300 mb-3 text-sm font-medium">
                  <HiOutlinePaperAirplane className="w-4 h-4 text-primary-400" />
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary-900/50 border border-white/10 rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 transition-all duration-300 shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-green-400 text-center text-sm flex items-center justify-center gap-2"
                >
                  <span className="text-lg">✅</span>
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-red-400 text-center text-sm flex items-center justify-center gap-2"
                >
                  <span className="text-lg">❌</span>
                  Failed to send message. Please try again.
                </motion.p>
              )}

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl" />
            </form>
          </div>
        </motion.div>

        {/* Decorative floating shapes */}
        <div className="absolute top-20 right-10 w-20 h-20 border border-primary-500/20 rounded-full animate-float" />
        <div className="absolute bottom-20 left-10 w-16 h-16 border border-accent-500/20 rounded-full animate-float animation-delay-2000" />
      </div>
    </section>
  );
}