import React from 'react';
import { Star, ChevronRight, ThumbsUp, MessageSquare, Share2, MapPin, Clock, MessageCircle } from 'lucide-react';

export function MarketListingCard({ item, t }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          MK {item.price.toLocaleString()}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={item.seller.avatar} 
            alt={item.seller.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" 
            referrerPolicy="no-referrer" 
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{item.seller.name}</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider truncate">{item.seller.location}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 h-10">
          {item.description}
        </p>
        
        <a 
          href={`https://wa.me/${item.seller.phone}?text=Hello ${item.seller.name}, I am interested in your ${item.title} on FarmKit.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold transition-all gap-2 shadow-lg shadow-green-500/20 active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          {t('common.whatsAppSeller')}
        </a>
      </div>
    </div>
  );
}

export function TipCard({ author, avatar, time, content, image, likes, comments, t }: any) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 slide-in">
      <div className="flex items-start">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-primary" referrerPolicy="no-referrer" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{author}</h3>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{content}</p>
          {image && (
            <div className="mt-2">
              <img src={image} alt="Tip" className="rounded-lg w-full h-32 object-cover" referrerPolicy="no-referrer" />
            </div>
          )}
          <div className="flex mt-3 text-sm">
            <button className="flex items-center mr-4 text-gray-500 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4 mr-1" /> {likes}
            </button>
            <button className="flex items-center mr-4 text-gray-500 hover:text-primary transition-colors">
              <MessageSquare className="w-4 h-4 mr-1" /> {comments}
            </button>
            <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4 mr-1" />
              {t('common.share')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ day, month, location, title, description, time, color, t }: any) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden slide-in">
      <div className="md:flex">
        <div className={`${color} text-white p-4 flex flex-col items-center justify-center md:w-1/4 text-center`}>
          <span className="text-3xl font-bold">{day}</span>
          <span className="text-xl">{month}</span>
          <span className="mt-2 bg-white text-gray-800 px-2 py-1 rounded text-sm font-medium flex items-center">
            <MapPin className="w-3 h-3 mr-1" /> {location}
          </span>
        </div>
        <div className="p-4 md:w-3/4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> {time}
            </span>
            <button className={`${color} text-white px-3 py-1 rounded-lg hover:opacity-90 transition-colors text-sm`}>
              {t('common.registerNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-sm">
      <h3 className="font-bold text-lg mb-3">{q}</h3>
      <p className="text-gray-600 dark:text-gray-300">{a}</p>
    </div>
  );
}
