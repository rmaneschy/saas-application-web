import { useIsMobile } from '@/hooks/useIsMobile';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      {isMobile && <Header />}

      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <div
        className={`
          flex flex-col flex-1
          ${isMobile ? 'pt-16' : 'ml-20'}
        `}
      >
        <div className="flex flex-col flex-1 rounded-xl bg-background border border-border m-4 lg:m-5">
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

