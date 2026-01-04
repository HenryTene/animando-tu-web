import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { IntroduccionModule } from '@/components/modules/IntroduccionModule';
import { EfectosTextoModule } from '@/components/modules/EfectosTextoModule';
import { TransformacionesModule } from '@/components/modules/TransformacionesModule';
import { TransicionesModule } from '@/components/modules/TransicionesModule';
import { AnimacionesModule } from '@/components/modules/AnimacionesModule';
import { LaboratorioModule } from '@/components/modules/LaboratorioModule';
import { EvaluacionModule } from '@/components/modules/EvaluacionModule';
import { ScrollArea } from '@/components/ui/scroll-area';

const MODULE_COMPONENTS: Record<string, React.ComponentType> = {
  'introduccion': IntroduccionModule,
  'efectos-texto': EfectosTextoModule,
  'transformaciones': TransformacionesModule,
  'transiciones': TransicionesModule,
  'animaciones': AnimacionesModule,
  'laboratorio': LaboratorioModule,
  'evaluacion': EvaluacionModule,
};

function MainContent() {
  const { currentModule } = useApp();
  const ModuleComponent = MODULE_COMPONENTS[currentModule] || IntroduccionModule;

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <main className="container max-w-4xl py-8">
        <ModuleComponent />
      </main>
    </ScrollArea>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header 
        sidebarOpen={sidebarOpen} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      <div className="flex w-full">
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <div className="flex-1">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default Index;
