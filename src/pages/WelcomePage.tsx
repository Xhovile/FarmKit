import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Info, Store, GraduationCap, UserCircle } from 'lucide-react';

interface WelcomePageProps {
  t: (key: string) => string;
}

const tourSteps = [
  { icon: Info, title: 'Welcome to FarmKit', content: 'Your digital hub for farming success.' },
  { icon: Store, title: 'Marketplace', content: 'Buy and sell produce, tools, and inputs easily.' },
  { icon: GraduationCap, title: 'Expert Advice', content: 'Connect with agricultural experts for guidance.' },
  { icon: UserCircle, title: 'Your Profile', content: 'Manage your farm details and track your activity.' },
];

const WelcomePage: React.FC<WelcomePageProps> = ({ t }) => {
  const navigate = useNavigate();
  const [tourStep, setTourStep] = useState(0);

  const handleNext = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(prev => prev + 1);
    } else {
      localStorage.setItem('farmkit_tour_completed', 'true');
      navigate('/');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-dark-900">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden relative"
      >
        <div className="h-48 bg-primary relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          </div>
          <motion.div 
            key={tourStep}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 text-white"
          >
            {React.createElement(tourSteps[tourStep].icon, { className: "w-24 h-24" })}
          </motion.div>
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-10 text-center">
          <div className="flex justify-center gap-2 mb-6">
            {tourSteps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === tourStep ? 'w-8 bg-primary' : 'w-2 bg-gray-200 dark:bg-gray-700'}`}
              />
            ))}
          </div>
          <motion.div
            key={`text-${tourStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              {t(`tour.step${tourStep + 1}Title`)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              {t(`tour.step${tourStep + 1}Content`)}
            </p>
          </motion.div>
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {tourStep === tourSteps.length - 1 ? t("tour.getStarted") : t("tour.next")}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
