import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ExternalLink, Code, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import MusicPlayer from '@/components/MusicPlayer';
import Achievements from '@/components/Achievements';
import TechStack from '@/components/TechStack';
import TerminalTestimonials from '@/components/TerminalTestimonials';
import PixelPet from '@/components/PixelPet';
import Forest3DScene from '@/components/Forest3DScene';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { use3DNavigation } from '@/hooks/use3DNavigation';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [typewriterText, setTypewriterText] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const { toast } = useToast();
  
  const { currentSection, isIn3DMode, enterSection, returnTo3D } = use3DNavigation();

  const typewriterStrings = [
    'Frontend Dev ✦ ACM Tech Lead ✦ UI Enthusiast',
    'Building beautiful web experiences',
    'Pixel art meets modern design'
  ];

  const projects = [
    {
      id: 1,
      title: 'ACM GSFCU Website',
      description: 'Fully responsive club website with 3D Spline models, animated sections, and event management system.',
      category: '3D Projects',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop',
      tech: ['Next.js', 'Tailwind', 'Spline', 'TypeScript'],
      github: 'https://github.com/kumawatvaibhav',
      live: '#'
    },
    {
      id: 2,
      title: 'Furniture Rental App',
      description: 'Full-stack rental platform with cart system, admin dashboard, JWT auth, and image upload.',
      category: 'Web Apps',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
      tech: ['Next.js', 'Tailwind', 'TypeScript', 'JWT'],
      github: 'https://github.com/kumawatvaibhav',
      live: '#'
    },
    {
      id: 3,
      title: 'Code Wars Event Page',
      description: 'Pixel-art inspired event landing page with language icons and smooth animations.',
      category: 'Event Pages',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      tech: ['React', 'CSS3', 'Animation'],
      github: 'https://github.com/kumawatvaibhav',
      live: '#'
    }
  ];

  const experiences = [
    {
      year: '2023 - Present',
      role: 'Tech Lead',
      company: 'ACM GSFCU',
      description: 'Leading technical team, conducting interviews, organizing developer events, and building club infrastructure.',
      achievements: ['Led team interviews for 15+ candidates', 'Organized multiple tech events', 'Built club website from scratch']
    },
    {
      year: '2022 - 2023',
      role: 'Frontend Developer',
      company: 'Freelance',
      description: 'Developing responsive websites and interactive experiences for various clients.',
      achievements: ['Multiple client projects', '3D web experiences', 'UI/UX implementations']
    }
  ];

  useEffect(() => {
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentString = typewriterStrings[currentStringIndex];
      
      if (!isDeleting) {
        setTypewriterText(currentString.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentString.length) {
          setTimeout(() => isDeleting = true, 2000);
        }
      } else {
        setTypewriterText(currentString.slice(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentStringIndex = (currentStringIndex + 1) % typewriterStrings.length;
        }
      }
    };

    const interval = setInterval(typeWriter, isDeleting ? 50 : 150);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = projectFilter === 'All' ? projects : projects.filter(p => p.category === projectFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent! ✨",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
  };

  const handleNavigation = (section: string) => {
    enterSection(section);
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Keyboard shortcuts handlers
  const handleToggleMusic = () => {
    console.log('Toggle music');
  };

  const handleJumpToProjects = () => {
    handleNavigation('projects');
  };

  const handleOpenTerminal = () => {
    handleNavigation('testimonials');
  };

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onToggleMusic: handleToggleMusic,
    onJumpToProjects: handleJumpToProjects,
    onOpenTerminal: handleOpenTerminal
  });

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-black text-green-400' : 'bg-gray-100 text-gray-900'}`}>
      {/* Pixel Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {isIn3DMode ? (
          <motion.div
            key="3d-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Forest3DScene onNavigate={handleNavigation} />
          </motion.div>
        ) : (
          <motion.div
            key="sections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-sm border-b ${isDarkMode ? 'border-green-400/20' : 'border-gray-200'}`}>
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="text-xl font-bold pixel-font"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    VK.dev
                  </motion.div>
                  
                  <div className="hidden md:flex space-x-8">
                    {['about', 'projects', 'stack', 'achievements', 'testimonials', 'contact'].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          const element = document.getElementById(item);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`transition-colors hover:text-blue-400`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-green-400/20 hover:bg-green-400/30' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20">
              {/* About Section */}
              <section id="about" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    About <span className="text-blue-400">Me</span>
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <p className="text-lg leading-relaxed mb-6">
                        Vaibhav Kumawat is a frontend-focused full-stack developer with a deep love for design, 
                        animation, and building interactive web experiences. Currently serving as the Tech Lead 
                        of ACM @ GSFCU, he has built multiple impactful projects including club websites, 
                        3D Spline-integrated experiences, and full-fledged rental platforms.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-400/10' : 'bg-blue-50'}`}>
                          <h4 className="font-bold text-blue-400 mb-2">Frontend</h4>
                          <p className="text-sm">React, Next.js, TypeScript, Tailwind CSS</p>
                        </div>
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-400/10' : 'bg-green-50'}`}>
                          <h4 className="font-bold text-green-400 mb-2">3D & Animation</h4>
                          <p className="text-sm">Spline, Framer Motion, CSS Animations</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {[
                        { year: '2023', event: 'Became Tech Lead at ACM GSFCU' },
                        { year: '2023', event: 'Built club website from scratch' },
                        { year: '2024', event: 'Developed Furniture Rental App' },
                        { year: '2024', event: 'Led team interviews & events' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center space-x-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border ${isDarkMode ? 'border-green-400/20' : 'border-gray-200'}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0" />
                          <div>
                            <span className="text-green-400 font-bold">{item.year}</span>
                            <p>{item.event}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Featured <span className="text-green-400">Projects</span>
                  </motion.h2>

                  {/* Project Filters */}
                  <div className="flex justify-center mb-12">
                    <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg">
                      {['All', 'Web Apps', 'Event Pages', '3D Projects'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setProjectFilter(filter)}
                          className={`px-4 py-2 rounded-md transition-all ${
                            projectFilter === filter 
                              ? 'bg-blue-500 text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`${isDarkMode ? 'bg-gray-900 border-green-400/20' : 'bg-white'} overflow-hidden hover:scale-105 transition-transform duration-300`}>
                          <div className="relative overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
                            <p className="text-gray-400 mb-4">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-green-400/20 text-green-400">
                                  {tech}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex items-center space-x-1">
                                <Github className="w-4 h-4" />
                                <span>Code</span>
                              </Button>
                              <Button size="sm" className="flex items-center space-x-1">
                                <ExternalLink className="w-4 h-4" />
                                <span>Live</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Tech Stack Section */}
              <section id="stack" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Tech <span className="text-green-400">Stack</span>
                  </motion.h2>
                  <TechStack />
                </div>
              </section>

              {/* Achievements Section */}
              <section id="achievements" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    My <span className="text-green-400">Achievements</span>
                  </motion.h2>
                  <Achievements />
                </div>
              </section>

              {/* Testimonials Section */}
              <section id="testimonials" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Client <span className="text-green-400">Testimonials</span>
                  </motion.h2>
                  <TerminalTestimonials />
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Get in <span className="text-green-400">Touch</span>
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-blue-400">Let's build something amazing together!</h3>
                      <p className="text-gray-400 mb-8">
                        I'm always interested in new opportunities and exciting projects. 
                        Whether you want to collaborate or just say hi, feel free to reach out!
                      </p>

                      <div className="space-y-4">
                        <a href="https://github.com/kumawatvaibhav" className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors">
                          <Github className="w-5 h-5" />
                          <span>kumawatvaibhav</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors">
                          <Linkedin className="w-5 h-5" />
                          <span>Vaibhav Kumawat</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors">
                          <Twitter className="w-5 h-5" />
                          <span>@vaibhav_dev</span>
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div>
                          <Input 
                            placeholder="Your Name" 
                            className={`${isDarkMode ? 'bg-gray-900 border-green-400/20' : 'bg-white'}`}
                          />
                        </div>
                        <div>
                          <Input 
                            type="email" 
                            placeholder="Your Email" 
                            className={`${isDarkMode ? 'bg-gray-900 border-green-400/20' : 'bg-white'}`}
                          />
                        </div>
                        <div>
                          <Textarea 
                            placeholder="Your Message" 
                            rows={5}
                            className={`${isDarkMode ? 'bg-gray-900 border-green-400/20' : 'bg-white'}`}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black">
                          Send Message
                        </Button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Components */}
      <MusicPlayer />
      <PixelPet />

      {/* Footer (only show when not in 3D mode) */}
      {!isIn3DMode && (
        <footer className={`py-8 border-t ${isDarkMode ? 'border-green-400/20' : 'border-gray-200'}`}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2024 Vaibhav Kumawat. Built with React & Tailwind CSS. Designed with ❤️
            </p>
            <p className="text-xs text-gray-500 mt-2">
              💡 Try keyboard shortcuts: Ctrl+M (music), Ctrl+P (projects), Ctrl+T (terminal)
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
