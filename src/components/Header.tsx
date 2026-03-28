import React from 'react';
import { Sprout, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  t: (key: string) => string;
  user: any;
}

export const Header: React.FC<HeaderProps> = ({ t, user }) => {
  const navigate = useNavigate();
  const isCompact = true;

  return (
    <header
      className="sticky top-0 z-30 bg-primary/95 backdrop-blur-xl shadow-lg text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex justify-between items-center gap-3">
          <div 
            className="flex items-center gap-3 min-w-0 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shrink-0 rounded-lg p-2">
              <Sprout className="text-white w-6 h-6" />
            </div>

            <div className="min-w-0">
              <h1 className="font-bold tracking-tight font-serif leading-none text-xl">
                <span className="text-green-400">Farm</span><span className="text-amber-300">Kit</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => navigate('/account')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center shadow-sm h-9 w-9 rounded-full justify-center"
                aria-label={user.name}
              >
                <UserCircle className="opacity-80 w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="bg-amber-400 text-primary shadow-md hover:bg-amber-300 transition-all font-bold h-9 px-3 rounded-full text-xs"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
