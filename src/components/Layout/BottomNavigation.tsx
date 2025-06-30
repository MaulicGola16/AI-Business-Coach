import React from 'react';
import { Home, PlusCircle, BarChart3, BookOpen, User, MessageCircle } from 'lucide-react';
import { NavigationPage } from '../../hooks/useNavigation';

interface BottomNavigationProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

const navItems = [
  { id: 'home' as NavigationPage, icon: Home, label: 'Home' },
  { id: 'submit' as NavigationPage, icon: PlusCircle, label: 'Submit' },
  { id: 'dashboard' as NavigationPage, icon: BarChart3, label: 'Dashboard' },
  { id: 'chat' as NavigationPage, icon: MessageCircle, label: 'Chat' },
  { id: 'resources' as NavigationPage, icon: BookOpen, label: 'Resources' },
  { id: 'profile' as NavigationPage, icon: User, label: 'Profile' },
];

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              currentPage === id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-200 ${
              currentPage === id ? 'scale-110' : ''
            }`} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}