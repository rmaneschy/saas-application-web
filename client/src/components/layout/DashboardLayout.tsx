import { useIsMobile } from '@/hooks/useIsMobile';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Mobile Header */}
      {isMobile && <Header />}

      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <div
        className={`
          flex flex-col flex-1
          ${isMobile ? 'pt-16' : 'ml-[72px]'}
        `}
      >
        {/* Desktop Toolbar */}
        {!isMobile && <Toolbar />}

        {/* Content Area */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 container py-6 lg:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

