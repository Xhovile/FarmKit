import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  deleteUser,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, LogOut, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (en: string, ny: string) => string;
}

export default function AuthModal({ isOpen, onClose, t }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(t('Welcome back!', 'Takulandiraninso!'));
        onClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        toast.success(t('Account created! Please check your email for verification.', 'Akaunti yapangidwa! Chonde onani imelo yanu kuti mutsimikizire.'));
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await deleteUser(user);
      toast.success(t('Account deleted successfully.', 'Akaunti yafufutidwa bwino.'));
      onClose();
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error(t('Please log out and log in again to delete your account.', 'Chonde tulukani ndipo lowaninso kuti mufufute akaunti yanu.'));
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">
              {isLogin ? t('Welcome Back', 'Takulandiraninso') : t('Create Account', 'Pangani Akaunti')}
            </h2>
            <p className="text-gray-500 mt-1">
              {isLogin ? t('Sign in to your farm account', 'Lowani mu akaunti yanu ya famu') : t('Join the FarmKit community', 'Lowani mu gulu la FarmKit')}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('Email Address', 'Imelo')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="farmer@example.mw"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('Password', 'Chinsinsi')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isLogin ? t('Login', 'Lowani') : t('Sign Up', 'Lembetsani')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-primary hover:underline"
            >
              {isLogin ? t("Don't have an account? Sign Up", "Mulibe akaunti? Lembetsani") : t("Already have an account? Login", "Muli ndi akaunti kale? Lowani")}
            </button>
          </div>

          {auth.currentUser && (
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 space-y-4">
              <button 
                onClick={() => signOut(auth)}
                className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" /> {t('Logout', 'Tulukani')}
              </button>

              {showDeleteConfirm ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl space-y-3"
                >
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-bold text-center">
                    {t('Are you sure you want to delete your account? This action cannot be undone.', 'Kodi mukutsimikiza kuti mukufuna kufufuta akaunti yanu? Izi sizingasinthidwe.')}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-100 dark:border-gray-700"
                    >
                      {t('Cancel', 'Tileke')}
                    </button>
                    <button 
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      className="flex-1 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-md"
                    >
                      {t('Delete', 'Fufutani')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-3 text-rose-500 text-xs font-bold hover:underline flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> {t('Delete My Account', 'Fufutani Akaunti Yanga')}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
