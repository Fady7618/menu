import { useState, useEffect } from 'react';
import { MenuService } from '../services/menuService';
import type { MenuItem } from '../types/MenuItem';
import type { FetchState } from '../types/api';

interface UseMenuOptions {
  category?: string;
  availableOnly?: boolean;
}

/**
 * useMenu - React hook for fetching menu data
 * Now uses MenuService singleton for better testability
 */
export function useMenu(options: UseMenuOptions = {}): FetchState<MenuItem[]> {
  const [state, setState] = useState<FetchState<MenuItem[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    const menuService = MenuService.getInstance();

    async function fetchMenu() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      try {
        let items: MenuItem[];
        
        if (options.category) {
          items = await menuService.getMenuItemsByCategory(options.category);
        } else if (options.availableOnly) {
          items = await menuService.getAvailableMenuItems();
        } else {
          items = await menuService.getMenuItems();
        }
        
        if (isMounted) {
          setState({ data: items, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: {
              message:
                err instanceof Error ? err.message : 'Failed to load menu',
            },
          });
        }
      }
    }

    fetchMenu();

    return () => {
      isMounted = false;
    };
  }, [options.category, options.availableOnly]);

  return state;
}