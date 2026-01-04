import { Moon, Sun, Zap, ZapOff, Menu, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme, reduceMotion, toggleReduceMotion } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-foreground lg:text-xl">
              <span className="hidden sm:inline">Subindicador 10 — </span>
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Animando Objetos
              </span>
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              CSS Animations & Transitions
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <ProgressIndicator />
          
          <div className="hidden items-center gap-1 border-l border-border pl-3 sm:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleReduceMotion}
                  aria-label={reduceMotion ? 'Activar animaciones' : 'Reducir animaciones'}
                  className="h-9 w-9"
                >
                  {reduceMotion ? (
                    <ZapOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Zap className="h-4 w-4 text-secondary" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {reduceMotion ? 'Activar animaciones' : 'Reducir animaciones'}
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                  className="h-9 w-9"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-secondary" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
