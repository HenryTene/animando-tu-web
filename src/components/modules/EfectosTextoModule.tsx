import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox, DemoArea } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TextDemoProps {
  title: string;
  description: string;
  className: string;
  cssCode: string;
}

function TextDemo({ title, description, className, cssCode }: TextDemoProps) {
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <button
          onClick={() => setShowCode(!showCode)}
          className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80"
        >
          {showCode ? 'Ocultar CSS' : 'Ver CSS'}
        </button>
      </div>
      
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      
      <div className="mb-4 flex min-h-[80px] items-center justify-center rounded-lg bg-muted/30 p-4">
        <span className={className}>
          Texto de ejemplo
        </span>
      </div>
      
      {showCode && (
        <CodeBlock code={cssCode} language="css" />
      )}
    </div>
  );
}

export function EfectosTextoModule() {
  return (
    <ModuleCard moduleId="efectos-texto" title="2. Efectos de Texto con CSS">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            Los efectos de texto en CSS nos permiten añadir <strong>interactividad visual</strong> a 
            nuestro contenido sin recurrir a JavaScript. Usamos propiedades como <code>text-shadow</code>, 
            <code>background-size</code> y transiciones para crear microinteracciones elegantes.
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Demos interactivas</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Pasa el cursor sobre cada ejemplo para ver el efecto en acción.
          </p>
          
          <div className="grid gap-4 lg:grid-cols-2">
            <TextDemo
              title="1. Sombra animada suave"
              description="Una sombra sutil que aparece al hacer hover"
              className="text-xl font-bold text-foreground transition-all duration-300 hover:[text-shadow:2px_2px_8px_hsl(var(--primary)/0.4)]"
              cssCode={`.text-shadow-hover {
  transition: text-shadow 0.3s ease;
}

.text-shadow-hover:hover {
  text-shadow: 2px 2px 8px rgba(0, 150, 136, 0.4);
}`}
            />
            
            <TextDemo
              title="2. Subrayado animado"
              description="Un subrayado que crece desde la izquierda"
              className="underline-animated cursor-pointer text-xl font-bold text-foreground"
              cssCode={`.underline-animated {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
}

.underline-animated:hover {
  background-size: 100% 2px;
}`}
            />
            
            <TextDemo
              title="3. Texto con glow"
              description="Un brillo suave que pulsa (para títulos destacados)"
              className="animate-pulse text-xl font-bold text-primary text-glow"
              cssCode={`.text-glow {
  text-shadow: 
    0 0 10px hsl(var(--primary) / 0.5),
    0 0 20px hsl(var(--primary) / 0.3);
}

/* Con animación */
.text-glow-animated {
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from { text-shadow: 0 0 5px ...; }
  to { text-shadow: 0 0 20px ...; }
}`}
            />
            
            <TextDemo
              title="4. Desplazamiento sutil"
              description="El texto se eleva ligeramente al hover"
              className="inline-block text-xl font-bold text-foreground transition-transform duration-200 hover:-translate-y-1"
              cssCode={`.text-lift {
  display: inline-block;
  transition: transform 0.2s ease;
}

.text-lift:hover {
  transform: translateY(-4px);
}`}
            />
          </div>
        </section>

        <Tabs defaultValue="cuando-usar" className="rounded-lg border border-border">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/30 p-0">
            <TabsTrigger value="cuando-usar" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              ¿Cuándo usar?
            </TabsTrigger>
            <TabsTrigger value="cuando-evitar" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              ¿Cuándo evitar?
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cuando-usar" className="p-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>En <strong>enlaces y botones</strong> para indicar interactividad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>En <strong>títulos hero</strong> para captar atención (con moderación)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Para dar <strong>feedback</strong> en elementos clicables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>En <strong>navegación</strong> para indicar el estado activo/hover</span>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="cuando-evitar" className="p-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>En <strong>texto de lectura</strong> (artículos, párrafos largos)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Efectos muy <strong>agresivos o parpadeantes</strong> (causan fatiga visual)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Múltiples efectos <strong>simultáneos</strong> en el mismo elemento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Sin considerar <strong>accesibilidad</strong> (contraste, reduce-motion)</span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>

        <WarningBox title="Error común">
          <p>
            Aplicar efectos de texto llamativos a todo el contenido. Recuerda: las animaciones 
            deben <strong>guiar</strong> la atención, no distraer. Menos es más.
          </p>
        </WarningBox>

        <TipBox title="Accesibilidad">
          <p>
            Siempre respeta <code>prefers-reduced-motion</code>. Los usuarios con sensibilidad 
            al movimiento agradecerán que desactives las animaciones automáticamente.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "text-shadow y background-size permiten crear efectos elegantes",
            "Usa efectos en elementos interactivos, no en texto de lectura",
            "Combina con transition para suavizar los cambios",
            "Siempre considera la accesibilidad y el rendimiento"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
