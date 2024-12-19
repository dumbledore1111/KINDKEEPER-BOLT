import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Smile, User } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  // Function to get user's initials or "Account"
  const getDisplayName = () => {
    if (!user.name) return 'Account';
    
    // Get initials from full name
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl aspect-square">
        {/* Center Circle Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full bg-white/5 backdrop-blur-lg" />
        </div>

        {/* Book Button - Left */}
        <button 
          onClick={() => navigate('/logbook')}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[200%] w-28 h-28 bg-[#FF4F2C] rounded-full flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#FF4F2C]/50"
          aria-label="Open Logbook"
        >
          <Book className="w-12 h-12 text-white mb-1" />
          <span className="text-white font-medium text-lg">Book</span>
        </button>

        {/* Hello Button - Center */}
        <button 
          onClick={() => navigate('/voice-chat')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FF6B2C] rounded-full flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#FF6B2C]/50 animate-float"
          aria-label="Voice Chat"
        >
          <Smile className="w-20 h-20 text-white mb-2" />
          <span className="text-white font-medium text-2xl">HELLO</span>
        </button>

        {/* Account Button - Right */}
        <button 
          onClick={() => navigate('/profile')}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[100%] w-28 h-28 bg-[#FFD700] rounded-full flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#FFD700]/50"
          aria-label="View Account"
          title={user.name || 'Account'}
        >
          {user.name ? (
            <span className="text-slate-900 font-bold text-2xl mb-1">{getDisplayName()}</span>
          ) : (
            <User className="w-12 h-12 text-slate-900 mb-1" />
          )}
          <span className="text-slate-900 font-medium text-lg">Account</span>
        </button>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-2 border-white/10 animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border-2 border-white/5" />
        </div>
      </div>
    </div>
  );
}