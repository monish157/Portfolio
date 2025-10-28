import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons from Lucide for a professional look
import { 
  Home, User, Briefcase, Download, Mail, BookOpen, Code, Linkedin, Github, Twitter, Instagram, Youtube, Send, Zap, Award, ArrowRight, TrendingUp, Cpu, Database
} from 'lucide-react';

// --- Global Data / Content Configuration ---

const DUMMY_DATA = {
  // Updated Projects based on Resume
  projects: [
    { id: 1, title: "PestNet", description: "AI-based pest identification and forecasting application built using Python and Flask.", tags: ["Python", "Flask", "AI/ML"], link: "#" },
    { id: 2, title: "Inventory Management System", description: "A Java-based desktop application for managing stock, purchases, and sales using a MySQL database.", tags: ["Java", "MySQL", "Desktop App"], link: "#" },
    { id: 3, title: "Customer Feedback Management System", description: "A web app designed to collect and analyze customer feedback using Node.js and MySQL.", tags: ["Node.js", "MySQL", "Web App"], link: "#" },
  ],
  // Updated Skills based on Resume
  skills: [
    { name: "Python / SQL", proficiency: 90, icon: <Database size={20} /> },
    { name: "UI/UX Design (Figma/AdobeXD)", proficiency: 85, icon: <Zap size={20} /> },
    { name: "JavaScript / React", proficiency: 80, icon: <Code size={20} /> },
    { name: "HTML / CSS / Tailwind", proficiency: 88, icon: <Code size={20} /> },
    { name: "Data Visualization (Power BI)", proficiency: 75, icon: <TrendingUp size={20} /> },
    { name: "Problem Solving & Leadership", proficiency: 92, icon: <Award size={20} /> },
  ],
  // Updated Profiles based on Resume
  profiles: [
    { name: "GitHub", icon: <Github size={24} />, link: "https://github.com/monish157", color: "hover:text-gray-400" },
    // Updated LinkedIn link here
    { name: "LinkedIn", icon: <Linkedin size={24} />, link: "https://www.linkedin.com/in/monishraj-t-85233b2a4", color: "hover:text-blue-500" },
  ],
  // Added Experience section for Home page summary
  experience: {
    title: "UI/UX Intern - CoderScore",
    description: "Collaborated with design and development teams to create intuitive, responsive user interfaces. Conducted user research and usability testing to identify pain points and improve user experience flow.",
    years: "Internship (UI/UX)",
  },
  // Added Email ID to a central config for easy updates
  contactEmail: "rajmonish5252@gmail.com"
};

// --- Framer Motion Variants ---

const pageVariants = {
  initial: { opacity: 0, x: '100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '-100vw' }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.7
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// --- Helper Components ---

// Faux Particle Background - Uses pure CSS/React for high performance
const FauxParticlesBackground = ({ isVisible }) => {
    // Generate an array of particle elements
    const particles = useMemo(() => Array(50).fill(0).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1px to 4px
      x: Math.random() * 100, // 0% to 100%
      y: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5, // 0s to 5s
    })), []);

    return (
      <div 
        className="absolute inset-0 overflow-hidden -z-10 transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0.5 }}
      >
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                ease: "linear",
                delay: p.delay
            }}
            className="absolute rounded-full bg-blue-400/50 shadow-[0_0_8px_4px_rgba(59,130,246,0.3)] pointer-events-none"
            style={{ 
              width: `${p.size}px`, 
              height: `${p.size}px`, 
              left: `${p.x}vw`, 
              top: `${p.y}vh`,
            }}
          />
        ))}
      </div>
    );
};


// 3D-like hover effect using CSS transforms/shadows
const AnimatedCard = ({ children, className }) => (
  <motion.div
    className={`relative p-6 rounded-xl border border-gray-700/50 transition-all duration-300 ${className}`}
    whileHover={{ 
      y: -5, 
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 5px rgba(59,130,246,0.3)" // Blue glow effect
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

const SocialLinks = () => (
  <div className="flex justify-center space-x-6">
    {[
      { Icon: Linkedin, href: DUMMY_DATA.profiles.find(p => p.name === 'LinkedIn')?.link || "#", color: "hover:text-blue-500", label: "LinkedIn" },
      { Icon: Github, href: DUMMY_DATA.profiles.find(p => p.name === 'GitHub')?.link || "#", color: "hover:text-gray-400", label: "GitHub" },
      // Use DUMMY_DATA.contactEmail for the mailto link
      { Icon: Mail, href: `mailto:${DUMMY_DATA.contactEmail}`, color: "hover:text-red-500", label: "Email" }, 
    ].map(({ Icon, href, color, label }, index) => (
      <motion.a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-gray-500 ${color} transition duration-300`}
        whileHover={{ scale: 1.2, rotate: 10 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 1.2 }}
        aria-label={label}
      >
        <Icon size={32} />
      </motion.a>
    ))}
  </div>
);

// --- Page Components ---

const HeroAbout = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
        <div className="w-32 h-32 mx-auto rounded-full bg-blue-600/50 flex items-center justify-center border-4 border-blue-500 shadow-2xl shadow-blue-500/50">
          <User size={64} className="text-white" />
        </div>
        <motion.div 
          className="mt-4 text-sm font-mono text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
            {/* Location placeholder */}
            <span className="p-2 bg-gray-800 rounded-lg">Pudukkottai, IN</span>
        </motion.div>
    </motion.div>

    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
      <span className="text-blue-500">MONISHRAJ</span>.T
    </motion.h1>

    <motion.h2 variants={itemVariants} className="text-2xl font-light text-gray-300 mb-8">
      <span className="font-semibold text-pink-400">Aspiring Data Analyst</span> & Full-Stack Developer
    </motion.h2>

    <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-lg text-gray-400 mb-10">
      Software Engineer in full-stack web development. Skilled in JavaScript, Python, and cloud technologies, with a track record of delivering scalable applications.
    </motion.p>
    
    <motion.div variants={itemVariants} className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0">
        <div className="p-3 bg-gray-800 rounded-xl flex items-center space-x-2 border border-gray-700">
            <Briefcase size={20} className="text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">{DUMMY_DATA.experience.years}</span>
        </div>
        <div className="p-3 bg-gray-800 rounded-xl flex items-center space-x-2 border border-gray-700">
            <Zap size={20} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-200">UI/UX & React Skills</span>
        </div>
        <div className="p-3 bg-gray-800 rounded-xl flex items-center space-x-2 border border-gray-700">
            <TrendingUp size={20} className="text-green-400" />
            <span className="text-sm font-medium text-gray-200">Data & Analytics Focus</span>
        </div>
    </motion.div>

    <motion.div variants={itemVariants} className="mt-10 p-6 max-w-3xl mx-auto bg-gray-800/70 border border-gray-700 rounded-xl text-left">
      <h3 className="text-xl font-bold text-white mb-3 flex items-center space-x-2">
        <Briefcase size={20} className="text-blue-400"/>
        <span>Key Experience: {DUMMY_DATA.experience.title}</span>
      </h3>
      <p className="text-gray-400 text-sm">{DUMMY_DATA.experience.description}</p>
    </motion.div>

  </motion.div>
);

const SkillsPage = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
    <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4">My Skills & Proficiency</motion.h2>
    <div className="space-y-6">
      {DUMMY_DATA.skills.map((skill, index) => (
        <motion.div key={skill.name} variants={itemVariants} className="p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center space-x-3 text-lg font-semibold text-gray-200">
              {skill.icon}
              <span>{skill.name}</span>
            </span>
            {/* We will keep the proficiency estimate for visual style */}
            <motion.span 
              className="text-blue-400 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {skill.proficiency}%
            </motion.span>
          </div>
          {/* Animated Proficiency Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <motion.div
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
      <motion.div variants={itemVariants} className="mt-8 text-center text-gray-500">
        <p className="text-sm">Additional Skills: Teamwork, Project Management, Leadership.</p>
        <p className="text-sm">Fluent in: English, Tamil.</p>
      </motion.div>
    </div>
  </motion.div>
);

const ProjectsPage = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
    <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4">Key Portfolio Projects</motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {DUMMY_DATA.projects.map((project, index) => (
        <motion.a 
          key={project.id} 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          variants={itemVariants}
          className="block"
        >
          <AnimatedCard className="bg-gray-800 hover:bg-gray-700/70">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono px-3 py-1 bg-gray-700 rounded-full text-gray-300">{tag}</span>
              ))}
            </div>
            <div className="flex items-center text-blue-400 font-medium group">
                View Project Details <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </AnimatedCard>
        </motion.a>
      ))}
    </div>
  </motion.div>
);


const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
        setStatus('error');
        return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    // Simulate API call (replace with your actual submission logic)
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000); // Reset status after 3s
    }, 1500);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-2xl mx-auto">
      <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4 text-center">Let's Connect</motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {['name', 'email', 'message'].map((field, index) => (
          <motion.div key={field} variants={itemVariants}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 capitalize mb-2">{field}</label>
            {field === 'message' ? (
              <textarea
                id={field}
                name={field}
                rows="4"
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            ) : (
              <input
                type={field}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            )}
          </motion.div>
        ))}
        
        <motion.button
          type="submit"
          className={`w-full py-4 text-lg font-bold rounded-xl transition duration-500 relative overflow-hidden group 
            ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          whileHover={status !== 'sending' && status !== 'success' ? { scale: 1.03 } : {}}
          whileTap={status !== 'sending' && status !== 'success' ? { scale: 0.98 } : {}}
          disabled={status === 'sending' || status === 'success'}
        >
          {/* Glowing CTA Button */}
          <span className="absolute inset-0 border-4 border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></span>
          
          <div className="relative flex items-center justify-center space-x-3 text-white">
            {status === 'sending' && (
                <motion.span 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"
                />
            )}
            {status === 'success' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Zap size={20} /></motion.span>}
            <span className="relative z-10">
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Send Message'}
            </span>
            {status === 'idle' && <Send size={20} />}
          </div>
        </motion.button>
        
        {status === 'error' && (
            <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-red-400 text-center mt-4"
            >
                Please fill in all fields correctly.
            </motion.p>
        )}
      </form>
      
      <motion.div variants={itemVariants} className="mt-10 p-6 bg-gray-800/70 border border-gray-700 rounded-xl text-center">
        <p className="text-lg font-semibold text-white mb-2">Direct Contact Details</p>
        {/* Updated Email Display */}
        <p className="text-gray-400">Email: <a href={`mailto:${DUMMY_DATA.contactEmail}`} className="text-blue-400 hover:underline">{DUMMY_DATA.contactEmail}</a></p>
        <p className="text-gray-400">Phone: +91 8925339047</p>
      </motion.div>
    </motion.div>
  );
};


const ResumePage = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
        {/* Title updated here */}
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4">View My Resume</motion.h2>
        
        <motion.a 
            // UPDATED: Changed the href to the new file name "Monish Resume.pdf"
            href="uploaded:Monish Resume.pdf"
            download="Monishraj_Resume_DataAnalyst.pdf"
            className="inline-flex items-center justify-center p-6 bg-blue-600 rounded-2xl shadow-2xl transition duration-300 group"
            variants={itemVariants}
            whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 40px rgba(59,130,246,0.7)" 
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative flex items-center space-x-4">
                <Download size={32} className="text-white group-hover:animate-bounce-slow" />
                <span className="text-2xl font-semibold text-white">
                    Download Full Resume (PDF)
                </span>
                <motion.div 
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                />
            </div>
        </motion.a>
        
        <motion.p variants={itemVariants} transition={{ delay: 0.5 }} className="mt-8 text-lg text-gray-400">
            Review my detailed experience in **Data Analysis, UI/UX, and Full-Stack Development**.
        </motion.p>

        <motion.p variants={itemVariants} transition={{ delay: 0.6 }} className="mt-4 text-sm text-gray-500">
            {/* UPDATED: Changed the source file name display */}
            Source File: Monish Resume.pdf
        </motion.p>
    </motion.div>
);


const ProfilesPage = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4">Professional Profiles</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {DUMMY_DATA.profiles.map((profile, index) => (
                <motion.a 
                    key={profile.name} 
                    href={profile.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.15 }}
                    className="block"
                >
                    <AnimatedCard className={`bg-gray-800 text-white ${profile.color}`}>
                        <div className="flex flex-col items-center space-y-3">
                            {profile.icon}
                            <h3 className="text-xl font-semibold">{profile.name}</h3>
                            <p className="text-sm text-gray-400">
                                {profile.name === 'LinkedIn' ? 'Connect for Professional Network' : 'View My Code & Projects'}
                            </p>
                        </div>
                    </AnimatedCard>
                </motion.a>
            ))}
        </div>
        {/* Removed the line about primary focus */}
    </motion.div>
);

const CallToActionPage = ({ setCurrentPage }) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
        <motion.h2 variants={itemVariants} className="text-5xl font-extrabold text-white mb-6">
            Seeking a Data Analyst or Dev Role?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            I'm eager to contribute my skills in full-stack development, UI/UX, and data analysis to innovative tech and data projects.
        </motion.p>
        
        <motion.button
            onClick={() => setCurrentPage('contact')}
            className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden text-lg font-bold text-white rounded-full shadow-2xl transition-all duration-300 group bg-blue-600 hover:bg-blue-700"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Glowing effect */}
            <span className="absolute inset-0 border-4 border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></span>
            
            <span className="relative z-10 flex items-center space-x-2">
                <Mail size={24} />
                <span>Get in Touch / Collaborate</span>
            </span>
        </motion.button>

        <motion.p variants={itemVariants} transition={{ delay: 0.5 }} className="mt-8 text-sm text-gray-500">
            {/* Updated CTA email display */}
            (Phone: +91 8925339047 | Email: <a href={`mailto:${DUMMY_DATA.contactEmail}`} className="text-blue-400 hover:underline">{DUMMY_DATA.contactEmail}</a>)
        </motion.p>
    </motion.div>
);


// --- Main Layout Components ---

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { name: 'Home/About', page: 'about', icon: User },
    { name: 'Skills', page: 'skills', icon: Zap },
    { name: 'Projects', page: 'projects', icon: Briefcase },
    { name: 'Profiles', page: 'profiles', icon: Code },
    { name: 'Resume', page: 'resume', icon: Download },
    { name: 'Contact', page: 'contact', icon: Mail },
    { name: 'CTA', page: 'cta', icon: ArrowRight },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.page;

    return (
      <motion.button
        onClick={() => setCurrentPage(item.page)}
        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition duration-300 transform hover:scale-110 
          ${isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
          } flex-1 min-w-0`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon size={20} />
        <span className="text-xs font-medium mt-1 hidden lg:inline">{item.name}</span>
      </motion.button>
    );
  };

  return (
    <motion.nav 
      className="p-2 bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl flex justify-around space-x-1 sm:space-x-2 w-full max-w-4xl border border-gray-700"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      {navItems.map(item => (
        <NavItem key={item.page} item={item} />
      ))}
    </motion.nav>
  );
};

// --- Main App Component ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('about');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <HeroAbout />;
      case 'skills':
        return <SkillsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      case 'resume':
        return <ResumePage />;
      case 'profiles':
        return <ProfilesPage />;
      case 'cta':
        return <CallToActionPage setCurrentPage={setCurrentPage} />;
      default:
        return <HeroAbout />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter antialiased flex flex-col pt-12 md:pt-0">
      
      {/* Dynamic Background with Particles and Gradient Blur */}
      <div className="fixed inset-0 bg-gray-900 overflow-hidden">
        {/* Animated Gradient Blur */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
        >
            <div className="w-80 h-80 bg-blue-500/30 rounded-full blur-3xl absolute top-1/4 left-1/4 animate-float1" />
            <div className="w-96 h-96 bg-pink-500/30 rounded-full blur-3xl absolute bottom-1/3 right-1/4 animate-float2" />
        </motion.div>
        <FauxParticlesBackground isVisible={true} />
      </div>

      <style>{`
        .animate-float1 {
          animation: float1 15s ease-in-out infinite alternate;
        }
        .animate-float2 {
          animation: float2 20s ease-in-out infinite alternate;
        }
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0; transform: scale(0.95); }
            50% { opacity: 0.5; transform: scale(1); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
        }
        @keyframes bounce-slow {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-5px);
            }
            60% {
                transform: translateY(-2px);
            }
        }
      `}</style>
      
      <main className="flex flex-col flex-grow w-full max-w-6xl mx-auto z-10 p-4 md:p-8">
        
        {/* Header/Social Links (Fixed) */}
        <header className="fixed top-0 left-0 right-0 z-20 p-4 bg-gray-900/50 backdrop-blur-sm shadow-xl flex justify-center md:justify-end">
            <div className="w-full max-w-4xl hidden md:block">
                <SocialLinks />
            </div>
            <div className="text-3xl font-extrabold text-blue-500 md:hidden">MONISHRAJ.T</div>
        </header>


        {/* Page Content */}
        <section className="flex flex-grow w-full py-16 md:py-24">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentPage}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="flex-grow flex items-center justify-center w-full"
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>
        </section>

      </main>
      
      {/* Navigation (Sticky Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </footer>
    </div>
  );
};

export default App;

