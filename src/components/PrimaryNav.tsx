import { Bell, User, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrimaryNav({ 
  currentPage, 
  setCurrentPage,
  onOpenUpload
}: { 
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenUpload?: () => void;
}) {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/30 bg-white/40 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 py-4">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-4 cursor-pointer" 
        onClick={() => setCurrentPage('home')}
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-h1 tracking-tight">
          AuraCV
        </span>
      </motion.div>
      <div className="hidden md:flex items-center gap-8 font-medium">
        <nav className="flex gap-6 tracking-tight">
          {['home', 'dashboard', 'pricing'].map((page) => (
            <motion.button
              key={page}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`transition-all duration-300 px-3 py-1 rounded-lg capitalize relative ${currentPage === page ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'}`}
            >
              {page === 'dashboard' ? 'Intelligence' : page}
              {currentPage === page && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="text-slate-600 p-2 hover:bg-white/60 rounded-full transition-colors"
        >
          <Bell size={20} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="text-slate-600 p-2 hover:bg-white/60 rounded-full transition-colors"
          onClick={() => setCurrentPage('profile')}
        >
          <User size={20} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenUpload}
          className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-primary/20 glow-button relative overflow-hidden group"
        >
          <span className="relative z-10">Analyze Resume</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>
    </header>
  );
}
