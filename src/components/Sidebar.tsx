import { 
  BookOpen, 
  Type, 
  Move, 
  Box,
  Timer, 
  Play, 
  Layers, 
  ClipboardCheck,
  ChevronRight 
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { ModuleStatus } from '@/components/ProgressIndicator';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const MODULES = [
  { id: 'introduccion', label: 'Introducción', icon: BookOpen },
  { id: 'efectos-texto', label: 'Efectos de Texto', icon: Type },
  { id: 'transformaciones', label: 'Transformaciones 2D', icon: Move },
  { id: 'transformaciones-3d', label: 'Transformaciones 3D', icon: Box },
  { id: 'transiciones', label: 'Transiciones', icon: Timer },
  { id: 'animaciones', label: 'Animaciones', icon: Play },
  { id: 'laboratorio', label: 'Laboratorio: Slider', icon: Layers },
  { id: 'evaluacion', label: 'Evaluación Final', icon: ClipboardCheck },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { currentModule, setCurrentModule, isModuleCompleted } = useApp();

  const handleModuleClick = (moduleId: string) => {
    setCurrentModule(moduleId);
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 border-r border-border bg-sidebar transition-transform duration-300 lg:sticky lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full py-4">
          <nav className="space-y-1 px-3">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Módulos
            </p>
            
            {MODULES.map((module, index) => {
              const Icon = module.icon;
              const isActive = currentModule === module.id;
              const completed = isModuleCompleted(module.id);
              
              return (
                <Button
                  key={module.id}
                  variant="ghost"
                  onClick={() => handleModuleClick(module.id)}
                  className={cn(
                    "group relative w-full justify-start gap-3 px-3 py-6 text-left transition-all",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "hover:bg-sidebar-accent/50",
                    completed && !isActive && "text-success"
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                    {index + 1}
                  </span>
                  
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{module.label}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ModuleStatus moduleId={module.id} size="sm" />
                    <ChevronRight className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isActive && "rotate-90"
                    )} />
                  </div>
                  
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                </Button>
              );
            })}
          </nav>
          
          {/* Guide section */}
          <div className="mt-6 px-6">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="mb-2 text-sm font-semibold text-foreground">
                💡 Guía de uso
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Completa los módulos en orden</li>
                <li>• Practica en los playgrounds</li>
                <li>• Marca como completado al terminar</li>
                <li>• Tu progreso se guarda automáticamente</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
