import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/useAuthorization';
import { LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { isAdmin, isModerator } = useAuthorization();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Perfil
              </CardTitle>
              <CardDescription>Informações da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Nome Completo</p>
                <p className="text-sm text-muted-foreground">{user?.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Username</p>
                <p className="text-sm text-muted-foreground">{user?.username}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões</CardTitle>
              <CardDescription>Seus papéis no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user?.roles.map((role) => (
                  <div
                    key={role}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mr-2"
                  >
                    {role.replace('ROLE_', '')}
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1">
                {isAdmin() && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✓ Você é um Administrador
                  </p>
                )}
                {isModerator() && (
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    ✓ Você é um Moderador
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo!</CardTitle>
              <CardDescription>Sistema de autenticação funcionando</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Você está autenticado com sucesso. Este é um dashboard básico que será
                expandido com o Layout-8 do Metronic.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

