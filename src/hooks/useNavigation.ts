import { useState, useCallback } from 'react';

export type NavigationPage = 'home' | 'submit' | 'dashboard' | 'resources' | 'profile' | 'chat';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback((page: NavigationPage) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 150);
  }, [currentPage]);

  return {
    currentPage,
    navigateTo,
    isTransitioning,
  };
}