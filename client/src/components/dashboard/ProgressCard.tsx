import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressItem {
  id: string;
  label: string;
  value: number;
  max: number;
  color?: string;
}

interface ProgressCardProps {
  title: string;
  description?: string;
  items: ProgressItem[];
}

export function ProgressCard({ title, description, items }: ProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const percentage = Math.round((item.value / item.max) * 100);
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.value} / {item.max}
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

