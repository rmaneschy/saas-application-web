import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Mail, Shield, User } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <CardTitle className="text-2xl">{user?.fullName}</CardTitle>
                <CardDescription className="text-base">@{user?.username}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Information Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                <p className="text-base">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sobrenome</p>
                <p className="text-base">{user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-base">{user?.username}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${user?.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-base">
                    {user?.enabled ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Papéis</p>
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Atividade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conta criada em</p>
                <p className="text-base">{formatDate(user?.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Último acesso</p>
                <p className="text-base">{formatDate(user?.lastLoginAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
            <CardDescription>Gerencie sua conta</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline">Editar Perfil</Button>
            <Button variant="outline">Alterar Senha</Button>
            <Button variant="outline">Configurações de Privacidade</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

