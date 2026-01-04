import { CheckCircle2, Lightbulb, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ModuleCardProps {
  moduleId: string;
  title: string;
  children: ReactNode;
}

export function ModuleCard({ moduleId, title, children }: ModuleCardProps) {
  const { isModuleCompleted, markModuleComplete, markModuleIncomplete } = useApp();
  const completed = isModuleCompleted(moduleId);

  const toggleComplete = () => {
    if (completed) {
      markModuleIncomplete(moduleId);
    } else {
      markModuleComplete(moduleId);
    }
  };

  return (
    <article className={cn("module-card", completed && "completed")}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {title}
        </h2>
        <Button
          variant={completed ? "default" : "outline"}
          size="sm"
          onClick={toggleComplete}
          className={cn(
            "shrink-0 gap-2",
            completed && "bg-success hover:bg-success/90"
          )}
        >
          <CheckCircle2 className="h-4 w-4" />
          {completed ? 'Completado' : 'Marcar completado'}
        </Button>
      </div>
      {children}
    </article>
  );
}

interface ConceptBoxProps {
  children: ReactNode;
}

export function ConceptBox({ children }: ConceptBoxProps) {
  return (
    <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="prose prose-sm max-w-none text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

interface TipBoxProps {
  children: ReactNode;
  title?: string;
}

export function TipBox({ children, title = "Consejo" }: TipBoxProps) {
  return (
    <div className="rounded-lg border-l-4 border-secondary bg-secondary/10 p-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
        <div>
          <p className="mb-1 text-sm font-semibold text-secondary">{title}</p>
          <div className="text-sm text-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface WarningBoxProps {
  children: ReactNode;
  title?: string;
}

export function WarningBox({ children, title = "Error común" }: WarningBoxProps) {
  return (
    <div className="rounded-lg border-l-4 border-destructive bg-destructive/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div>
          <p className="mb-1 text-sm font-semibold text-destructive">{title}</p>
          <div className="text-sm text-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface SummaryBoxProps {
  items: string[];
}

export function SummaryBox({ items }: SummaryBoxProps) {
  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        📝 Micro-resumen
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-foreground">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface DemoAreaProps {
  children: ReactNode;
  title?: string;
}

export function DemoArea({ children, title }: DemoAreaProps) {
  return (
    <div className="playground">
      {title && (
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      )}
      <div className="demo-area">
        {children}
      </div>
    </div>
  );
}
