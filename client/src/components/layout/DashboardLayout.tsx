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
        className={isMobile ? 'flex flex-col flex-1 pt-16' : 'flex flex-col flex-1'}
        style={!isMobile ? { marginInlineStart: 'var(--sidebar-width)' } : undefined}
      >
        {/* Desktop Toolbar */}
        {!isMobile && <Toolbar />}

        {/* Page Content with spacing */}
        <main 
          className={`flex-1 bg-gray-50/50 ${isMobile ? 'p-4' : 'p-5 lg:m-5'}`}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

