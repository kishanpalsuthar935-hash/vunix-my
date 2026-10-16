import React, { useState, useRef, useEffect } from 'react';
import { Download, Search, ChevronDown, LogOut } from 'lucide-react';
import { UserProfile } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  user: UserProfile | null;
  onOpenGoogleSignIn?: () => void;
  onOpenPaywall?: () => void;
  onSignOut: () => void;
  onSearchChange: (q: string) => void;
  searchQuery: string;
  currentCurrency?: any;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onSignOut,
  onSearchChange,
  searchQuery,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const handleSignOutClick = () => {
    setUserDropdownOpen(false);
    onSignOut();
  };

  const userInitial = user
    ? (user.name?.trim() || user.email?.trim() || 'U').charAt(0).toUpperCase()
    : '';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo on Left */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#451A03] flex items-center justify-center shadow-sm relative overflow-hidden group">
            <div className="w-6 h-6 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#451A03] font-black text-xs tracking-tighter transition group-hover:scale-105">
              VX
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-neutral-900 leading-none">
              Vunix
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#451A03] mt-0.5">
              SaaS Suite
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 15 essential & commercial tools..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-150 focus:bg-white border border-transparent focus:border-neutral-300 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* PWA Install Button */}
          {!isInstalled && (
            <>
              {isInstallable && (
                <button
                  onClick={install}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#451A03] text-xs font-bold transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install App</span>
                </button>
              )}
              {isIOS && (
                <button
                  onClick={() => setShowIOSModal(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Home</span>
                </button>
              )}
            </>
          )}

          {/* 100% Free Forever Badge Pill */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Free Forever • Unlimited Access</span>
          </div>

          {/* User Profile Dropdown if logged in */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#451A03]/20"
                aria-expanded={userDropdownOpen}
              >
                <span className="text-xs font-bold text-neutral-800 hidden sm:inline max-w-[120px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <div className="w-8 h-8 rounded-full bg-purple-700 text-white font-black text-xs flex items-center justify-center ring-2 ring-[#EDE9FE] shadow-xs select-none shrink-0">
                  {userInitial}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-64 rounded-3xl bg-white border border-neutral-200 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                  {/* User Profile Header */}
                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-700 text-white font-black text-sm flex items-center justify-center ring-2 ring-[#451A03]/20 shrink-0 shadow-xs select-none">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-neutral-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-neutral-500 truncate font-mono">{user.email}</p>
                    </div>
                  </div>

                  {/* Plan Status */}
                  <div className="px-3 py-2.5 my-1 flex items-center justify-between border-b border-neutral-100">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Access Level</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% Free
                    </span>
                  </div>

                  {/* Options */}
                  <div className="p-1 space-y-1">
                    <button
                      onClick={handleSignOutClick}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>100% Free</span>
            </div>
          )}
        </div>
      </div>

      {/* iOS Installation Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Install Vunix on iPhone / iPad</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              1. Tap the <strong>Share button</strong> in Safari toolbar.<br />
              2. Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>.<br />
              3. Launch Vunix directly from your iOS app grid!
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
