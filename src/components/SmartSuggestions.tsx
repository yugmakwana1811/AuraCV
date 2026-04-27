import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Briefcase, FileEdit, TrendingUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function SmartSuggestions() {
  const suggestions = [
    {
      id: 1,
      icon: <Briefcase size={20} className="text-purple-500" />,
      title: 'Update for Senior Frontend',
      description: 'You\'ve been browsing Senior Frontend roles. Let\'s optimize your resume.',
      actionText: 'Optimize Now',
      color: 'border-purple-200 bg-purple-50 hover:border-purple-300'
    },
    {
      id: 2,
      icon: <TrendingUp size={20} className="text-blue-500" />,
      title: '3 New Matching Roles',
      description: 'Found 3 new roles in San Francisco that match your 90% threshold.',
      actionText: 'View Roles',
      color: 'border-blue-200 bg-blue-50 hover:border-blue-300'
    },
    {
      id: 3,
      icon: <FileEdit size={20} className="text-cyan-500" />,
      title: 'Improve the Summary',
      description: 'Your summary could be punchier. AI suggests 2 quick edits.',
      actionText: 'Review Edits',
      color: 'border-cyan-200 bg-cyan-50 hover:border-cyan-300'
    }
  ];

  return (
    <AnimatedSection delay={0.1}>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl font-bold font-h3 text-slate-800">Smart AI Suggestions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between h-full ${suggestion.color}`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4">
                  {suggestion.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{suggestion.title}</h3>
                <p className="text-xs text-slate-600 mb-4">{suggestion.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mt-auto">
                {suggestion.actionText}
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
