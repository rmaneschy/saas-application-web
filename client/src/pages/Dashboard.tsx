import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthorization } from '@/hooks/useAuthorization';
import { Activity, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, isModerator } = useAuthorization();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo de volta, {user?.firstName}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atividade</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 desde a última hora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">
                +4.5% em relação ao trimestre anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Info and Permissions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Seus dados de usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
                <p className="text-base">{user?.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-base">{user?.username}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões e Papéis</CardTitle>
              <CardDescription>Suas funções no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {user?.roles.map((role) => (
                  <div
                    key={role}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
                  >
                    {role.replace('ROLE_', '')}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {isAdmin() && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-green-600 dark:text-green-400">
                      Acesso de Administrador
                    </span>
                  </div>
                )}
                {isModerator() && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400">
                      Acesso de Moderador
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Sistema!</CardTitle>
            <CardDescription>
              Sua aplicação SaaS está funcionando perfeitamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O sistema de autenticação está totalmente integrado com a API backend.
              O Layout-8 do Metronic foi implementado com sucesso, oferecendo uma
              interface profissional e responsiva. Você pode navegar pelos menus
              laterais (desktop) ou pelo menu hambúrguer (mobile) para acessar
              diferentes seções do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

