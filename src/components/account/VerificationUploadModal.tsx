import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { User } from '../../types';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';

interface Props {
  user: User;
  onClose: () => void;
}

const VerificationUploadModal: React.FC<Props> = ({ user, onClose }) => {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/upload', formData);
    return response.url;
  };

  const handleSubmit = async () => {
    if (!idFile || !proofFile) {
      toast.error('Please upload both required documents');
      return;
    }

    setIsSubmitting(true);
    try {
      const [idUrl, proofUrl] = await Promise.all([
        handleUpload(idFile),
        handleUpload(proofFile)
      ]);

      const verificationData = {
        verification: {
          status: 'pending',
          type: user.primaryRole,
          submittedAt: new Date().toISOString(),
          documents: {
            idDocument: idUrl,
            proofImage: proofUrl,
          }
        }
      };

      await api.put('/api/users/me', verificationData);
      toast.success('Verification submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Verification submission error:', error);
      toast.error('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-indigo-600 text-white shrink-0">
          <div>
            <h3 className="text-xl font-bold">Submit Verification</h3>
            <p className="text-xs text-white/70">Build trust with the FarmKit community</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
          {/* ID Document */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              National ID or Passport
            </label>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="id-upload"
                accept="image/*,.pdf"
              />
              <label 
                htmlFor="id-upload"
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  idFile 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50/30'
                }`}
              >
                {idFile ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{idFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload ID</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Proof Image */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              Proof of Business / Farm Activity
            </label>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="proof-upload"
                accept="image/*"
              />
              <label 
                htmlFor="proof-upload"
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  proofFile 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50/30'
                }`}
              >
                {proofFile ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{proofFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload proof image</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Ensure all documents are clear and legible. Review typically takes 24-48 hours.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || !idFile || !proofFile}
              className="flex-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationUploadModal;
