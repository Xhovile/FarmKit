import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Send, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Share2, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  PlusCircle 
} from 'lucide-react';

interface CommunityPageProps {
  t: (en: string, ny: string) => string;
  lang: 'en' | 'ny';
  communityTab: 'forum' | 'experts' | 'stories';
  setCommunityTab: (tab: 'forum' | 'experts' | 'stories') => void;
  communityPosts: any[];
  experts: any[];
  successStories: any[];
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  t,
  lang,
  communityTab,
  setCommunityTab,
  communityPosts,
  experts,
  successStories
}) => {
  return (
    <motion.div 
      key="community"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Community Sub-Nav */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-2 flex gap-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setCommunityTab('forum')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${communityTab === 'forum' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <Users className="w-4 h-4" /> {t('Forum', 'Bwalo')}
        </button>
        <button 
          onClick={() => setCommunityTab('experts')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${communityTab === 'experts' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <GraduationCap className="w-4 h-4" /> {t('Experts', 'Akatswiri')}
        </button>
        <button 
          onClick={() => setCommunityTab('stories')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${communityTab === 'stories' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <Award className="w-4 h-4" /> {t('Stories', 'Mbirizi')}
        </button>
      </div>

      {communityTab === 'forum' && (
        <div className="space-y-6">
          {/* Create Post */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-50 dark:border-gray-700">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                U
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder={t("What's on your mind, farmer?", "Mukuganiza chiyani, mlimi?")}
                  className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 flex items-center gap-2">
                    {t('Post', 'Tumizani')} <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {communityPosts.map(post => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-50 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-primary font-bold">
                      {post.author[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{post.author}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {post.location} • {post.time}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {lang === 'en' ? post.content : post.contentNy}
                </p>
                <div className="flex gap-6 pt-4 border-t border-gray-50 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" /> <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" /> <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {communityTab === 'experts' && (
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">{t('Ask an Expert', 'Funzani Akatswiri')}</h3>
              <p className="text-indigo-100 mb-6 max-w-md">
                {t('Get professional advice from agricultural extension officers and specialists.', 'Pezani malangizo a akatswiri kuchokera kwa alangizi a ulimi ndi akatswiri ena.')}
              </p>
              <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> {t('Start Consultation', 'Yambani Kufunsa')}
              </button>
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
                  <p className="text-[10px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {expert.location}
                  </p>
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
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {lang === 'en' ? story.content : story.contentNy}
                </p>
                <div className="flex justify-between items-center">
                  <button className="flex items-center gap-2 text-rose-500">
                    <Heart className="w-5 h-5 fill-rose-500" /> <span className="text-sm font-bold">{story.likes}</span>
                  </button>
                  <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    {t('Read Full Story', 'Werengani Mbiri Yonse')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl text-gray-400 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
            <PlusCircle className="w-5 h-5" /> {t('Share Your Story', 'Gawanani Mbiri Yanu')}
          </button>
        </div>
      )}
    </motion.div>
  );
};

import { GraduationCap, Award, Camera } from 'lucide-react';
