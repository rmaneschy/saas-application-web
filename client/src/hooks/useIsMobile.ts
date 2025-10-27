import { useEffect, useState } from 'react';

/**
 * Hook para detectar se o dispositivo é mobile
 * Usa o breakpoint lg (1024px) do Tailwind
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Verifica no mount
    checkIsMobile();

    // Adiciona listener para resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

