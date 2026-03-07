import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  Award,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface ExpertPageProps {
  t: (en: string, ny: string) => string;
  lang: 'en' | 'ny';
  communityTab: 'experts' | 'stories';
  setCommunityTab: (tab: 'experts' | 'stories') => void;
  experts: any[];
  successStories: any[];
}

export const ExpertPage: React.FC<ExpertPageProps> = ({
  t,
  lang,
  communityTab,
  setCommunityTab,
  experts,
  successStories
}) => {
  return (
    <motion.div 
      key="experts"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Knowledge Sub-Nav */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-2 flex gap-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setCommunityTab('experts')}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${communityTab === 'experts' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <GraduationCap className="w-4 h-4" /> {t('Experts', 'Akatswiri')}
        </button>
        <button 
          onClick={() => setCommunityTab('stories')}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${communityTab === 'stories' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <Award className="w-4 h-4" /> {t('Case Studies', 'Zitsanzo')}
        </button>
      </div>

      {communityTab === 'experts' && (
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">{t('Verified Expert Support', 'Thandizo la Akatswiri')}</h3>
              <p className="text-indigo-100 mb-6 max-w-md text-sm leading-relaxed">
                {t('Access professional advice from certified agricultural extension officers and NGO specialists. All content is vetted for accuracy.', 'Pezani malangizo a akatswiri kuchokera kwa alangizi a ulimi ndi akatswiri a mabungwe. Malangizo onse ndi otsimikizika.')}
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2 text-sm">
                  <MessageCircle className="w-5 h-5" /> {t('Consult Expert', 'Lankhulani ndi Katswiri')}
                </button>
                <button className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-400 transition-all flex items-center gap-2 text-sm border border-indigo-400">
                  <BookOpen className="w-5 h-5" /> {t('NGO Guides', 'Malangizo a NGO')}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experts.map(expert => (
              <motion.div 
                key={expert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-50 dark:border-gray-700 flex items-center gap-4 group hover:border-primary transition-all"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="font-bold text-gray-900 dark:text-white">{expert.name}</h4>
                    {expert.verified && <CheckCircle2 className="w-3 h-3 text-primary" />}
                  </div>
                  <p className="text-xs text-primary font-bold mb-1">
                    {lang === 'en' ? expert.specialty : expert.specialtyNy}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Verified
                    </span>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {expert.location}
                    </p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                  <Phone className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {communityTab === 'stories' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t('Verified Case Studies', 'Zitsanzo Otsimikizika')}</h3>
              <p className="text-xs text-gray-500">{t('Real success stories vetted by agricultural experts.', 'Zitsanzo za ulimi opindulitsa zotsimikizika ndi akatswiri.')}</p>
            </div>
          </div>

          {successStories.map(story => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-50 dark:border-gray-700"
            >
              <div className="h-48 relative">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {lang === 'en' ? story.title : story.titleNy}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    {story.author[0]}
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{story.author}</span>
                  <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    Expert Verified
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' ? story.content : story.contentNy}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold">{t('Best Practice', 'Njira Yabwino')}</span>
                  </div>
                  <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    {t('Read Full Guide', 'Werengani Malangizo')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
