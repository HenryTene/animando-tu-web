import { CheckCircle2, Circle, Trophy, Sparkles, Star, Award } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const BADGE_INFO: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  explorer: { icon: Sparkles, label: 'Explorador', color: 'text-secondary' },
  'quiz-master': { icon: Star, label: 'Quiz Master', color: 'text-accent' },
  'perfect-score': { icon: Trophy, label: 'Puntuación Perfecta', color: 'text-yellow-500' },
  completionist: { icon: Award, label: 'Completista', color: 'text-success' },
};

export function ProgressIndicator() {
  const { progress } = useApp();

  return (
    <div className="flex items-center gap-3">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
            style={{ width: `${progress.totalProgress}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-foreground">
          {progress.totalProgress}%
        </span>
      </div>

      {/* Badges */}
      {progress.badges.length > 0 && (
        <div className="hidden items-center gap-1 md:flex">
          {progress.badges.map(badgeId => {
            const badge = BADGE_INFO[badgeId];
            if (!badge) return null;
            const Icon = badge.icon;
            return (
              <div 
                key={badgeId}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full bg-muted",
                  badge.color
                )}
                title={badge.label}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ModuleStatusProps {
  moduleId: string;
  size?: 'sm' | 'md';
}

export function ModuleStatus({ moduleId, size = 'md' }: ModuleStatusProps) {
  const { isModuleCompleted } = useApp();
  const completed = isModuleCompleted(moduleId);

  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return completed ? (
    <CheckCircle2 className={cn(iconSize, 'text-success')} />
  ) : (
    <Circle className={cn(iconSize, 'text-muted-foreground')} />
  );
}
