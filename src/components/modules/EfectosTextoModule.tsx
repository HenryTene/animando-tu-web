import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Code, Eye } from 'lucide-react';

interface TextDemoProps {
  title: string;
  description: string;
  demoContent: React.ReactNode;
  htmlCode: string;
  cssCode: string;
}

function TextDemo({ title, description, demoContent, htmlCode, cssCode }: TextDemoProps) {
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-3">
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <Button
          variant={showCode ? "default" : "outline"}
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="gap-2 shrink-0"
        >
          {showCode ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          {showCode ? 'Ver demo' : 'Ver código'}
        </Button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {!showCode ? (
          <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 p-6 border border-border/50">
            {demoContent}
          </div>
        ) : (
          <div className="space-y-3">
            <CodeBlock code={htmlCode} language="html" title="HTML" />
            <CodeBlock code={cssCode} language="css" title="CSS" />
          </div>
        )}
      </div>
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
          <h3 className="mb-2 text-lg font-semibold text-foreground">Demos interactivas</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Pasa el cursor sobre cada ejemplo para ver el efecto en acción. Usa el botón "Ver código" para copiar el HTML y CSS.
          </p>
          
          <div className="grid gap-4 lg:grid-cols-2">
            <TextDemo
              title="1. Sombra animada suave"
              description="Una sombra sutil que aparece al hacer hover"
              demoContent={
                <span className="text-2xl font-bold text-foreground transition-all duration-300 cursor-pointer hover:[text-shadow:2px_2px_8px_hsl(var(--primary)/0.5),_0_0_20px_hsl(var(--primary)/0.3)]">
                  Pasa el cursor aquí
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sombra Animada</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <span class="text-shadow-hover">
    Pasa el cursor aquí
  </span>
</body>
</html>`}
              cssCode={`/* styles.css */
.text-shadow-hover {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  cursor: pointer;
  transition: text-shadow 0.3s ease;
}

.text-shadow-hover:hover {
  text-shadow: 
    2px 2px 8px rgba(0, 150, 136, 0.5),
    0 0 20px rgba(0, 150, 136, 0.3);
}`}
            />
            
            <TextDemo
              title="2. Subrayado animado"
              description="Un subrayado que crece desde la izquierda"
              demoContent={
                <span className="underline-animated cursor-pointer text-2xl font-bold text-foreground">
                  Pasa el cursor aquí
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subrayado Animado</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a href="#" class="underline-animated">
    Pasa el cursor aquí
  </a>
</body>
</html>`}
              cssCode={`/* styles.css */
.underline-animated {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  text-decoration: none;
  cursor: pointer;
  
  /* El truco: usamos un gradiente como fondo */
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  
  transition: background-size 0.3s ease;
}

.underline-animated:hover {
  background-size: 100% 3px;
}`}
            />
            
            <TextDemo
              title="3. Texto con glow"
              description="Un brillo suave que pulsa (para títulos destacados)"
              demoContent={
                <span className="text-2xl font-bold text-primary animate-pulse" style={{
                  textShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2)'
                }}>
                  Texto brillante
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Texto Glow</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 class="text-glow">
    Texto brillante
  </h1>
</body>
</html>`}
              cssCode={`/* styles.css */
.text-glow {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00897b;
  
  /* Sombra de texto con múltiples capas */
  text-shadow: 
    0 0 10px rgba(0, 137, 123, 0.5),
    0 0 30px rgba(0, 137, 123, 0.3),
    0 0 40px rgba(0, 137, 123, 0.2);
  
  /* Animación de pulso */
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  from { 
    text-shadow: 
      0 0 5px rgba(0, 137, 123, 0.3),
      0 0 10px rgba(0, 137, 123, 0.2);
  }
  to { 
    text-shadow: 
      0 0 15px rgba(0, 137, 123, 0.6),
      0 0 30px rgba(0, 137, 123, 0.4),
      0 0 45px rgba(0, 137, 123, 0.2);
  }
}`}
            />
            
            <TextDemo
              title="4. Desplazamiento sutil"
              description="El texto se eleva ligeramente al hover"
              demoContent={
                <span className="inline-block text-2xl font-bold text-foreground transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:text-primary">
                  Pasa el cursor aquí
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Texto Elevado</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <span class="text-lift">
    Pasa el cursor aquí
  </span>
</body>
</html>`}
              cssCode={`/* styles.css */
.text-lift {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  cursor: pointer;
  
  /* Importante: inline-block para que transform funcione */
  transition: transform 0.3s ease, color 0.3s ease;
}

.text-lift:hover {
  transform: translateY(-8px);
  color: #00897b;
}`}
            />

            <TextDemo
              title="5. Texto con gradiente"
              description="Un degradado de colores que se mueve"
              demoContent={
                <span 
                  className="text-2xl font-bold cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #00897b, #26a69a, #4db6ac, #26a69a, #00897b)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 3s linear infinite',
                  }}
                >
                  Texto con gradiente
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Texto Gradiente</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 class="gradient-text">
    Texto con gradiente
  </h1>
</body>
</html>`}
              cssCode={`/* styles.css */
.gradient-text {
  font-size: 1.5rem;
  font-weight: bold;
  
  /* Gradiente como fondo */
  background: linear-gradient(
    90deg, 
    #00897b, 
    #26a69a, 
    #4db6ac, 
    #26a69a, 
    #00897b
  );
  background-size: 200% auto;
  
  /* Aplicar gradiente al texto */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Animación */
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}`}
            />

            <TextDemo
              title="6. Texto con borde animado"
              description="Un borde que aparece al hacer hover"
              demoContent={
                <span 
                  className="text-2xl font-bold cursor-pointer transition-all duration-500 text-outline-demo"
                >
                  Pasa el cursor aquí
                </span>
              }
              htmlCode={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Texto Outline</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <span class="text-outline">
    Pasa el cursor aquí
  </span>
</body>
</html>`}
              cssCode={`/* styles.css */
.text-outline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  cursor: pointer;
  
  /* Borde inicial transparente */
  -webkit-text-stroke: 1px transparent;
  
  transition: all 0.5s ease;
}

.text-outline:hover {
  /* Al hacer hover: solo borde, sin relleno */
  -webkit-text-stroke: 2px #00897b;
  color: transparent;
}`}
            />
          </div>
        </section>

        {/* Inyectar estilos para las animaciones */}
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          
          .text-outline-demo {
            color: hsl(var(--foreground));
            -webkit-text-stroke: 1px transparent;
            transition: all 0.5s ease;
          }
          
          .text-outline-demo:hover {
            color: transparent;
            -webkit-text-stroke: 2px hsl(var(--primary));
          }
        `}</style>

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
