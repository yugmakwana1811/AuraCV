import { Brain, FileSearch, Sparkles, MoveRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import AnimatedSection from '../components/AnimatedSection';
import AbstractBrain3D from '../components/AbstractBrain3D';
import Resume3D from '../components/Resume3D';

export default function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { scrollY } = useScroll();
  
  // Parallax transforms based on scroll position
  const heroTextY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroTextScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroImageY = useTransform(scrollY, [0, 1000], [0, -150]);
  const heroBgY = useTransform(scrollY, [0, 1000], [0, 500]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="px-6 md:px-12 lg:px-24 overflow-x-clip relative">
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: heroBgY }}
        className="absolute inset-0 -z-20 pointer-events-none"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] bg-gradient-to-bl from-pink-300/20 to-cyan-300/20 blur-[120px] rounded-full mix-blend-multiply" />
      </motion.div>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] py-16 gap-12 relative">
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="w-full lg:w-1/2 space-y-8 z-10"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-blue-200/50 cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#ff00ff] animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-secondary uppercase">Solar v2.4 Intelligence Now Live</span>
          </motion.div>
          <motion.h1 style={{ scale: heroTextScale, transformOrigin: 'left center' }} className="text-5xl md:text-7xl font-bold font-h1 text-on-surface leading-tight tracking-tight">
            Illuminate Your <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Professional</span> Future.
          </motion.h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Aura Intelligence leverages high-refraction neural networks to analyze your career path with sun-drenched clarity and visionary precision.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('dashboard')}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(0,102,255,0.3)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.4)] transition-shadow"
            >
              Start Free Scan
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('dashboard')}
              className="px-10 py-5 glass-card border-primary/20 text-primary rounded-xl font-bold text-lg hover:bg-white/60 transition-colors"
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y: heroImageY, opacity: heroOpacity }}
          className="w-full lg:w-1/2 flex justify-center items-center relative py-12"
        >
          {/* Abstract 3D Centerpiece Simulation */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 via-pink-400/30 to-yellow-300/30 blur-3xl rounded-full"></div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative z-10 w-full h-full glass-card rounded-full border-white/50 overflow-hidden shadow-2xl backdrop-blur-2xl transition-transform duration-500 cursor-grab active:cursor-grabbing"
            >
               <AbstractBrain3D />
            </motion.div>
            {/* Decorative Floating Elements */}
            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -top-10 -right-10 w-24 h-24 glass-card rounded-2xl flex items-center justify-center border-white/60 shadow-lg text-primary backdrop-blur-md"
            >
              <FileSearch size={32} />
            </motion.div>
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -bottom-6 -left-12 w-32 h-32 glass-card rounded-full flex items-center justify-center border-white/60 shadow-lg text-secondary backdrop-blur-md"
            >
              <Sparkles size={40} />
            </motion.div>
          </motion.div>
          
          {/* Scroll-Reactive 3D Resume */}
          <div className="absolute -bottom-32 md:-bottom-20 -right-8 w-64 h-80 z-20 pointer-events-none hidden md:block">
            <Resume3D />
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-h2 mb-4">Hyper-Modern Capabilities</h2>
            <p className="text-on-surface-variant text-lg">Prismatic insights for the next generation of talent.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Large Feature */}
          <AnimatedSection className="md:col-span-8" delay={0.1}>
            <div className="glass-card h-full rounded-3xl p-8 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-shadow border-white/40">
              <div className="md:w-1/2 space-y-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-200">
                  <FileSearch size={28} />
                </div>
                <h3 className="text-3xl font-bold font-h3">Neural Skill Mapping</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Our AI dissects every fragment of your experience, reconstructing it into a data-rich visualization of your true professional potential.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                    Semantic gap analysis
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                    Keyword optimization engine
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-slate-800 p-6 flex flex-col gap-4">
                  {/* Fake App UI inside the card */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Skill Match</span>
                      <span className="text-green-400 text-xs font-bold">+24 points</span>
                  </div>
                  <div className="space-y-3">
                      <div className="bg-slate-800 h-2 w-full rounded-full overflow-hidden"><div className="bg-blue-500 w-[80%] h-full"></div></div>
                      <div className="bg-slate-800 h-2 w-3/4 rounded-full overflow-hidden"><div className="bg-purple-500 w-[60%] h-full"></div></div>
                      <div className="bg-slate-800 h-2 w-5/6 rounded-full overflow-hidden"><div className="bg-cyan-500 w-[90%] h-full"></div></div>
                  </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Small Feature 1 */}
          <AnimatedSection className="md:col-span-4" delay={0.2}>
            <div className="glass-card h-full rounded-3xl p-8 space-y-6 border-white/40 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 border border-pink-200">
                <MoveRight size={28} />
              </div>
              <h3 className="text-2xl font-bold font-h3">Solar Speed Scan</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Real-time processing that delivers a full resume diagnostic in under 2.4 seconds.
              </p>
            </div>
          </AnimatedSection>

          {/* Small Feature 2 */}
          <AnimatedSection className="md:col-span-4" delay={0.3}>
            <div className="glass-card h-full rounded-3xl p-8 space-y-6 border-white/40 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 border border-yellow-200">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-bold font-h3">AI Rewrite</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Intelligent suggestions that transform passive descriptions into high-impact outcome statements.
              </p>
            </div>
          </AnimatedSection>

          {/* Medium Feature */}
          <AnimatedSection className="md:col-span-8" delay={0.4}>
            <div className="glass-card h-full rounded-3xl p-8 flex flex-col justify-center border-white/40 bg-gradient-to-br from-white/40 to-blue-50/30">
              <div className="flex items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-3xl font-bold font-h3 mb-4">Global Job Prism</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Connect with opportunities across the globe using our spectral matching algorithm that looks beyond titles to find culture-fit matches.
                  </p>
                </div>
                <div className="hidden lg:flex -space-x-4">
                  {[1,2,3].map(i => (
                      <div key={i} className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Sequence / Idea Flow */}
      <section className="py-24 relative min-h-[150vh]">
        <div className="sticky top-32 flex flex-col items-center justify-center space-y-12 h-screen max-h-[800px]">
          <AnimatedSection>
            <div className="text-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold font-h2 tracking-tight">The Evolution of Your Resume</h2>
            </div>
          </AnimatedSection>
          
          <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center perspective-1000">
            {/* Step 1 */}
            <motion.div 
              style={{
                opacity: useTransform(scrollY, [600, 800, 1000], [0, 1, 0]),
                y: useTransform(scrollY, [600, 800], [50, 0]),
                scale: useTransform(scrollY, [600, 800, 1000], [0.9, 1, 1.1]),
                zIndex: 10
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="glass-card p-12 text-center rounded-[3rem] w-full max-w-2xl border-white/40 shadow-2xl bg-white/60">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                  <FileSearch size={40} />
                </div>
                <h3 className="text-3xl font-bold font-h3 mb-4">1. Deep Parsing</h3>
                <p className="text-xl text-slate-600">Aura AI extracts the core essence of your experiences and skills from raw text.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              style={{
                opacity: useTransform(scrollY, [900, 1100, 1300], [0, 1, 0]),
                y: useTransform(scrollY, [900, 1100], [50, 0]),
                scale: useTransform(scrollY, [900, 1100, 1300], [0.9, 1, 1.1]),
                zIndex: 20
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="glass-card p-12 text-center rounded-[3rem] w-full max-w-2xl border-white/40 shadow-2xl bg-white/60">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-6">
                  <Brain size={40} />
                </div>
                <h3 className="text-3xl font-bold font-h3 mb-4">2. Semantic Enhancement</h3>
                <p className="text-xl text-slate-600">Passive sentences are rewritten as high-impact outcomes using our proprietary model.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              style={{
                opacity: useTransform(scrollY, [1200, 1400, 1600], [0, 1, 1]),
                y: useTransform(scrollY, [1200, 1400], [50, 0]),
                scale: useTransform(scrollY, [1200, 1400], [0.9, 1]),
                zIndex: 30
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="glass-card p-12 text-center rounded-[3rem] w-full max-w-2xl border-white/40 shadow-2xl bg-white/60">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-3xl font-bold font-h3 mb-4">3. ATS Readiness Alignment</h3>
                <p className="text-xl text-slate-600">Your profile is instantly verified against modern applicant tracking systems for a 99% match rate.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Card */}
      <section className="py-24">
        <AnimatedSection>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glow-border rounded-[2rem] glass-card p-12 lg:p-20 text-center overflow-hidden relative shadow-2xl transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-yellow-400/10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-h2 tracking-tight">Ready to glow?</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">Join 50,000+ visionaries who have transformed their career search with Aura Intelligence.</p>
              <div className="flex justify-center pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('auth')}
                  className="px-10 py-5 bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl font-bold shadow-[0_10px_30px_rgba(0,102,255,0.3)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.4)] transition-all text-lg tracking-wide"
                >
                  Get Started Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Modern Fixed-like Footer structure */}
      <footer className="border-t border-white/30 bg-white/10 backdrop-blur-md py-8 px-8 rounded-t-[3rem] mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold tracking-widest uppercase text-slate-500 max-w-7xl mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span></span>
          © 2024 AURACV AI.
        </div>
        <div className="flex gap-8">
          <motion.a whileHover={{ y: -2, color: '#2563eb' }} href="#" className="transition-colors">Terms</motion.a>
          <motion.a whileHover={{ y: -2, color: '#2563eb' }} href="#" className="transition-colors">Privacy</motion.a>
          <motion.a whileHover={{ y: -2, color: '#2563eb' }} href="#" className="transition-colors">Support</motion.a>
        </div>
      </footer>
    </main>
  );
}
