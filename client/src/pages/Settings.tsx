import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell, Globe, Lock, Palette, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground mt-2">
            Personalize sua experiência no sistema
          </p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Personalize a aparência da interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Tema</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Claro</Button>
                  <Button variant="outline" size="sm">Escuro</Button>
                  <Button variant="outline" size="sm">Sistema</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure como você recebe notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">
                    Receber notificações por email
                  </p>
                </div>
                <Button variant="outline" size="sm">Ativar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push</p>
                  <p className="text-xs text-muted-foreground">
                    Receber notificações push no navegador
                  </p>
                </div>
                <Button variant="outline" size="sm">Ativar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Gerencie suas configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Autenticação em dois fatores</p>
                  <p className="text-xs text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Sessões ativas</p>
                  <p className="text-xs text-muted-foreground">
                    Gerencie dispositivos conectados
                  </p>
                </div>
                <Button variant="outline" size="sm">Ver</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Idioma e Região
              </CardTitle>
              <CardDescription>
                Configure preferências de idioma e localização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Idioma</p>
                <Button variant="outline" size="sm">Português (Brasil)</Button>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Fuso Horário</p>
                <Button variant="outline" size="sm">América/São Paulo (GMT-3)</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacidade
              </CardTitle>
              <CardDescription>
                Controle suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Perfil público</p>
                  <p className="text-xs text-muted-foreground">
                    Permitir que outros usuários vejam seu perfil
                  </p>
                </div>
                <Button variant="outline" size="sm">Desativar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Compartilhamento de dados</p>
                  <p className="text-xs text-muted-foreground">
                    Ajude-nos a melhorar o serviço
                  </p>
                </div>
                <Button variant="outline" size="sm">Gerenciar</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            Salvar Configurações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

