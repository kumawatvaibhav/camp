
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const testimonials = [
    {
      command: '$ echo "testimonial_01.txt"',
      text: 'Vaibhav built our entire club website from scratch — incredible work!',
      author: '~ ACM GSFCU Member',
      delay: 0
    },
    {
      command: '$ cat leadership_review.log',
      text: 'Outstanding tech lead who conducts thorough interviews and builds amazing teams.',
      author: '~ ACM Committee',
      delay: 0
    },
    {
      command: '$ whoami',
      text: 'Tech Lead @ ACM GSFCU | Frontend Developer | 3D Web Enthusiast',
      author: '~ Vaibhav Kumawat',
      delay: 0
    },
    {
      command: '$ grep -i "skills" portfolio.md',
      text: 'Expert in React, Next.js, Tailwind, and creating beautiful user experiences.',
      author: '~ Portfolio Analysis',
      delay: 0
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    
    const current = testimonials[currentTestimonial];
    const fullText = current.command + '\n' + current.text + '\n' + current.author;
    let index = 0;

    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 30);
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(typeWriter, 500);
  }, [currentTestimonial]);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400">Terminal</span> Testimonials
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black border border-green-400 rounded-lg p-6 font-mono"
        >
          {/* Terminal Header */}
          <div className="flex items-center mb-4 pb-3 border-b border-green-400/30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-green-400 text-sm">vaibhav@portfolio:~$</div>
          </div>

          {/* Terminal Content */}
          <div className="min-h-[120px]">
            <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </pre>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-green-400' : 'bg-green-400/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalTestimonials;
