import React from 'react';
import { Brain, Bell, Search, Menu } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function Header({ title, showSearch = false, showNotifications = true }: HeaderProps) {
  const { state } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {showSearch && (
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          
          {showNotifications && state.isAuthenticated && (
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
          )}

          {state.user && state.isAuthenticated && (
            <div className="flex items-center space-x-2">
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}