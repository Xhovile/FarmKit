import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';

interface AddProductModalProps {
  t: (en: string, ny: string) => string;
  isOpen: boolean;
  onClose: () => void;
  formStep: number;
  setFormStep: (step: number | ((prev: number) => number)) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  t,
  isOpen,
  onClose,
  formStep,
  setFormStep
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Crops',
    price: '',
    quantity: '',
    location: '',
    phone: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title) errors.title = t('Title is required', 'Mutu ndi ofunika');
      if (!formData.price) errors.price = t('Price is required', 'Mtengo ndi ofunika');
    } else if (step === 2) {
      if (!formData.location) errors.location = t('Location is required', 'Malo ndi ofunika');
      if (!formData.phone) errors.phone = t('Phone is required', 'Foni ndi ofunika');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(formStep)) {
      // Logic to save to Firestore would go here
      alert(t('Product listed successfully!', 'Zokolola zalembedwa bwino!'));
      onClose();
      setFormStep(1);
      setFormData({
        title: '',
        category: 'Crops',
        price: '',
        quantity: '',
        location: '',
        phone: '',
        description: ''
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">{t('Add New Product', 'Wonjezani Zokolola')}</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${formStep >= step ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                      {formStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 3 && <div className={`w-12 h-1 mx-2 rounded-full ${formStep > step ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-700'}`} />}
                  </div>
                ))}
              </div>

              {formStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">{t('Product Title', 'Dzina la Zokolola')}</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${formErrors.title ? 'border-rose-500' : 'border-gray-100 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-primary outline-none`}
                      placeholder={t('e.g. Organic Maize', 'mwachitsanzo Chimanga')}
                    />
                    {formErrors.title && <p className="text-rose-500 text-xs mt-1">{formErrors.title}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">{t('Category', 'Mtundu')}</label>
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      >
                        <option value="Crops">{t('Crops', 'Mbewu')}</option>
                        <option value="Livestock">{t('Livestock', 'Ziweto')}</option>
                        <option value="Tools">{t('Tools', 'Zida')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">{t('Price (MK)', 'Mtengo (MK)')}</label>
                      <input 
                        type="number" 
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${formErrors.price ? 'border-rose-500' : 'border-gray-100 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-primary outline-none`}
                        placeholder="45000"
                      />
                      {formErrors.price && <p className="text-rose-500 text-xs mt-1">{formErrors.price}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">{t('Location', 'Malo')}</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${formErrors.location ? 'border-rose-500' : 'border-gray-100 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-primary outline-none`}
                      placeholder="e.g. Dedza Boma"
                    />
                    {formErrors.location && <p className="text-rose-500 text-xs mt-1">{formErrors.location}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">{t('Phone Number', 'Nambala ya Foni')}</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${formErrors.phone ? 'border-rose-500' : 'border-gray-100 dark:border-gray-600'} rounded-xl focus:ring-2 focus:ring-primary outline-none`}
                      placeholder="265..."
                    />
                    {formErrors.phone && <p className="text-rose-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">{t('Description', 'Kufotokozera')}</label>
                    <textarea 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      rows={4}
                      placeholder={t('Tell buyers more about your product...', 'Fotokozerani zambiri za zokolola zanu...')}
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex gap-4 mt-10">
                {formStep > 1 && (
                  <button 
                    onClick={() => setFormStep(prev => prev - 1)}
                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> {t('Back', 'Bwererani')}
                  </button>
                )}
                <button 
                  onClick={formStep === 3 ? handleSubmit : handleNext}
                  className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  {formStep === 3 ? t('List Product', 'Lembetsani') : t('Next', 'Chotsatira')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
