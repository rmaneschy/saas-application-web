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
          ${isMobile ? 'pt-16' : 'ml-[90px]'}
        `}
      >
        {/* Desktop Toolbar */}
        {!isMobile && <Toolbar />}

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50/50">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

