import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface WelcomeTourProps {
  t: (en: string, ny: string) => string;
  showTour: boolean;
  setShowTour: (val: boolean) => void;
  tourStep: number;
  setTourStep: (val: number | ((prev: number) => number)) => void;
  tourSteps: any[];
}

export const WelcomeTour: React.FC<WelcomeTourProps> = ({
  t,
  showTour,
  setShowTour,
  tourStep,
  setTourStep,
  tourSteps
}) => {
  if (!showTour) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
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
              onClick={() => setShowTour(false)}
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
                {t(tourSteps[tourStep].title, tourSteps[tourStep].titleNy)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
                {t(tourSteps[tourStep].content, tourSteps[tourStep].contentNy)}
              </p>
            </motion.div>
            <button 
              onClick={() => {
                if (tourStep < tourSteps.length - 1) {
                  setTourStep(prev => prev + 1);
                } else {
                  setShowTour(false);
                  localStorage.setItem('farmkit_tour_completed', 'true');
                }
              }}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              {tourStep === tourSteps.length - 1 ? t("Get Started", "Yambani Tsopano") : t("Next", "Chotsatira")}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
