import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const { login, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.usernameOrEmail || !formData.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(formData);
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail">Email ou Username</Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder="seu@email.com ou username"
                value={formData.usernameOrEmail}
                onChange={(e) =>
                  setFormData({ ...formData, usernameOrEmail: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/auth/forgot-password">
                  <a className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/auth/register">
                <a className="text-primary hover:underline font-medium">
                  Cadastre-se
                </a>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

