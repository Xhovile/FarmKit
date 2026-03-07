import React from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, 
  Bug, 
  FlaskConical, 
  Search, 
  Calendar, 
  ArrowRight, 
  Lightbulb 
} from 'lucide-react';
import { cropGuides, pestsData, organicFertilizerGuides } from '../data/mockData';
import { TipCard, EventCard } from '../components/Cards';

interface HomePageProps {
  t: (en: string, ny: string) => string;
  infoCategory: 'crops' | 'pests' | 'organic';
  setInfoCategory: (cat: 'crops' | 'pests' | 'organic') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedItem: (item: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  t, 
  infoCategory, 
  setInfoCategory, 
  searchQuery, 
  setSearchQuery, 
  setSelectedItem 
}) => {
  return (
    <motion.div 
      key="info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Category Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setInfoCategory('crops')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${infoCategory === 'crops' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700'}`}
        >
          <Leaf className="w-4 h-4" /> {t('Crop Guides', 'Malangizo a Mbewu')}
        </button>
        <button 
          onClick={() => setInfoCategory('pests')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${infoCategory === 'pests' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700'}`}
        >
          <Bug className="w-4 h-4" /> {t('Pests & Diseases', 'Tizilombo ndi Matenda')}
        </button>
        <button 
          onClick={() => setInfoCategory('organic')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${infoCategory === 'organic' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700'}`}
        >
          <FlaskConical className="w-4 h-4" /> {t('Organic Fertilizer', 'Manyowa a Zachilengedwe')}
        </button>
      </div>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search for information...', 'Sakani zidziwitso...')}
              className="w-full px-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCategory === 'crops' && cropGuides
            .filter(crop => crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || crop.tips.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(crop => (
            <div 
              key={crop.id} 
              onClick={() => setSelectedItem({ ...crop, type: 'crop' })}
              className="group cursor-pointer bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{crop.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Calendar className="w-3 h-3 mr-1" /> {crop.plantingDates}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{crop.tips}</p>
                <div className="mt-4 flex items-center text-primary font-bold text-sm">
                  {t('View Guide', 'Onani Malangizo')} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}

          {infoCategory === 'pests' && pestsData
            .filter(pest => pest.name.toLowerCase().includes(searchQuery.toLowerCase()) || pest.symptoms.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(pest => (
            <div 
              key={pest.id} 
              onClick={() => setSelectedItem({ ...pest, type: 'pest' })}
              className="group cursor-pointer bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={pest.image} alt={pest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{pest.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{pest.symptoms}</p>
                <div className="flex items-center text-rose-500 font-bold text-sm">
                  {t('Control Methods', 'Njira Zolimbirana')} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}

          {infoCategory === 'organic' && organicFertilizerGuides
            .filter(guide => guide.name.toLowerCase().includes(searchQuery.toLowerCase()) || guide.benefits.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(guide => (
            <div 
              key={guide.id} 
              onClick={() => setSelectedItem({ ...guide, type: 'organic' })}
              className="group cursor-pointer bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{guide.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{guide.benefits}</p>
              <div className="flex items-center text-emerald-600 font-bold text-sm">
                {t('How to Prepare', 'Mmene Mungapangire')} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Farming Tips */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-primary text-white p-2 rounded-lg mr-2 shadow-sm">
            <Lightbulb className="w-6 h-6" />
          </span>
          {t('Latest Farming Tips', 'Malangizo Atsopano')}
        </h2>

        <div className="space-y-4">
          {[
            {
              author: "James Banda",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
              time: "2 days ago",
              content: t("When planting maize, ensure spacing of 75cm between rows and 25cm between plants for optimal yield.", "Pobzyala chimanga, siyani mpata wa 75cm pakati pa mizere ndi 25cm pakati pa mbewu kuti zokolola zikhale zambiri."),
              likes: 45,
              comments: 12
            },
            {
              author: "Grace Mbewe",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
              time: "5 days ago",
              content: t("Mix wood ash with your compost to add potassium and reduce acidity. Great for tomatoes and peppers!", "Sakanizani phulusa ndi manyowa kuti muonjezere potassium ndikuchotsa acidity. Zabwino kwa mapuno ndi tsabola!"),
              image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400",
              likes: 78,
              comments: 23
            }
          ].filter(tip => 
            tip.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tip.author.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((tip, i) => (
            <TipCard 
              key={i}
              author={tip.author}
              avatar={tip.avatar}
              time={tip.time}
              content={tip.content}
              image={tip.image}
              likes={tip.likes}
              comments={tip.comments}
              t={t}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-white text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm flex items-center">
            {t('View All Tips', 'Onani Malangizo Onse')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-primary text-white p-2 rounded-lg mr-2 shadow-sm">
            <Calendar className="w-6 h-6" />
          </span>
          {t('Upcoming Farming Events', 'Zochitika za Ulimi Zikubwera')}
        </h2>

        <div className="space-y-4">
          <EventCard 
            day="15"
            month="Dec"
            location="Lilongwe"
            title={t("Modern Irrigation Techniques Workshop", "Maphunziro a Njira Zamakono Zothilira")}
            description={t("Learn about water-efficient irrigation methods suitable for small-scale farmers.", "Phunzirani za njira zothirira zomwe zimagwiritsa ntchito madzi pang'ono, zoyenera kwa alimi ang'onoang'ono.")}
            time="9:00 AM - 2:00 PM"
            color="bg-primary"
            t={t}
          />
          <EventCard 
            day="22"
            month="Dec"
            location="Blantyre"
            title={t("Organic Farming Certification Seminar", "Msonkhano wa Chiphaso cha Ulimi wa Zachilengedwe")}
            description={t("Get information on how to certify your farm as organic and access premium markets.", "Dziwani m'mene mungapezere chiphaso cha ulimi wa zachilengedwe ndi kupeza misika yapamwamba.")}
            time="10:00 AM - 1:00 PM"
            color="bg-secondary"
            t={t}
          />
        </div>
      </section>
    </motion.div>
  );
};
