import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { useNavigation } from './hooks/useNavigation';
import { useApp } from './contexts/AppContext';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { LoginForm } from './components/Auth/LoginForm';
import { HomePage } from './pages/HomePage';
import { SubmitIdeaPage } from './pages/SubmitIdeaPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  const { state } = useApp();
  const { currentPage, navigateTo, isTransitioning } = useNavigation();

  // Show login form if not authenticated
  if (!state.isAuthenticated) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'submit':
        return <SubmitIdeaPage onNavigate={navigateTo} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigateTo} />;
      case 'chat':
        return <ChatPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </div>
      <BottomNavigation currentPage={currentPage} onNavigate={navigateTo} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;