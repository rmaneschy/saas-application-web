import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { StatCard } from '@/components/dashboard/StatCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  // Dados de exemplo para estatísticas
  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 45.231',
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true },
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-50',
    },
    {
      title: 'Novos Usuários',
      value: '2.350',
      icon: Users,
      trend: { value: 8.2, isPositive: true },
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-50',
    },
    {
      title: 'Vendas',
      value: '1.234',
      icon: ShoppingCart,
      trend: { value: 3.1, isPositive: false },
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-50',
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      icon: TrendingUp,
      trend: { value: 5.4, isPositive: true },
      iconColor: 'text-orange-600',
      iconBgColor: 'bg-orange-50',
    },
  ];

  // Dados de exemplo para gráfico de área
  const revenueData = [
    { month: 'Jan', value: 12000 },
    { month: 'Fev', value: 19000 },
    { month: 'Mar', value: 15000 },
    { month: 'Abr', value: 25000 },
    { month: 'Mai', value: 22000 },
    { month: 'Jun', value: 30000 },
    { month: 'Jul', value: 28000 },
  ];

  // Dados de exemplo para gráfico de barras
  const salesData = [
    { category: 'Produto A', value: 400 },
    { category: 'Produto B', value: 300 },
    { category: 'Produto C', value: 500 },
    { category: 'Produto D', value: 280 },
    { category: 'Produto E', value: 390 },
  ];

  // Dados de exemplo para atividades recentes
  const activities = [
    {
      id: '1',
      user: { name: 'João Silva', initials: 'JS' },
      action: 'criou um novo pedido #1234',
      time: 'há 5 minutos',
      type: 'success' as const,
    },
    {
      id: '2',
      user: { name: 'Maria Santos', initials: 'MS' },
      action: 'atualizou o perfil do cliente',
      time: 'há 15 minutos',
      type: 'info' as const,
    },
    {
      id: '3',
      user: { name: 'Pedro Costa', initials: 'PC' },
      action: 'cancelou o pedido #1230',
      time: 'há 1 hora',
      type: 'warning' as const,
    },
    {
      id: '4',
      user: { name: 'Ana Lima', initials: 'AL' },
      action: 'reportou um erro no sistema',
      time: 'há 2 horas',
      type: 'error' as const,
    },
  ];

  // Dados de exemplo para tarefas
  const tasks = [
    {
      id: '1',
      title: 'Revisar relatório mensal',
      dueDate: 'Hoje, 14:00',
      priority: 'high' as const,
      completed: false,
    },
    {
      id: '2',
      title: 'Atualizar documentação da API',
      dueDate: 'Hoje, 16:00',
      priority: 'medium' as const,
      completed: false,
    },
    {
      id: '3',
      title: 'Reunião com equipe de vendas',
      dueDate: 'Amanhã, 10:00',
      priority: 'high' as const,
      completed: false,
    },
    {
      id: '4',
      title: 'Responder e-mails pendentes',
      dueDate: 'Hoje, 18:00',
      priority: 'low' as const,
      completed: true,
    },
  ];

  // Dados de exemplo para progresso
  const progressItems = [
    { id: '1', label: 'Meta de Vendas', value: 750, max: 1000 },
    { id: '2', label: 'Novos Cadastros', value: 2350, max: 3000 },
    { id: '3', label: 'Tickets Resolvidos', value: 89, max: 100 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo de volta! Aqui está um resumo do seu negócio.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Receita Mensal"
            description="Evolução da receita nos últimos 7 meses"
            data={revenueData}
            type="area"
            dataKey="value"
            xAxisKey="month"
            color="#10b981"
          />
          <ChartCard
            title="Vendas por Produto"
            description="Top 5 produtos mais vendidos"
            data={salesData}
            type="bar"
            dataKey="value"
            xAxisKey="category"
            color="#3b82f6"
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RecentActivity activities={activities} />
          <TaskList tasks={tasks} />
          <ProgressCard title="Metas do Mês" description="Progresso das metas estabelecidas" items={progressItems} />
        </div>
      </div>
    </DashboardLayout>
  );
}

