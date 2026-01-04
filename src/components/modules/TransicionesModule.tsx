import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox, DemoArea } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const TIMING_FUNCTIONS = [
  { value: 'ease', label: 'ease (default)' },
  { value: 'linear', label: 'linear' },
  { value: 'ease-in', label: 'ease-in' },
  { value: 'ease-out', label: 'ease-out' },
  { value: 'ease-in-out', label: 'ease-in-out' },
  { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'bounce (custom)' },
];

export function TransicionesModule() {
  const [duration, setDuration] = useState(300);
  const [delay, setDelay] = useState(0);
  const [timingFunction, setTimingFunction] = useState('ease');
  const [withTransition, setWithTransition] = useState(true);

  const transitionStyle = withTransition 
    ? { transition: `all ${duration}ms ${timingFunction} ${delay}ms` }
    : {};

  const generatedHTML = `<!-- HTML -->
<div class="elemento">
  Hover me
</div>`;

  const generatedCSS = `/* CSS */
.elemento {
  /* Estado inicial */
  width: 100px;
  height: 100px;
  background: #00897b;
  border-radius: 12px;
  transform: scale(1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Transición */
  transition: transform ${duration}ms ${timingFunction} ${delay}ms,
              background ${duration}ms ${timingFunction} ${delay}ms,
              box-shadow ${duration}ms ${timingFunction} ${delay}ms;
}

.elemento:hover {
  transform: scale(1.1) translateY(-4px);
  background: #26a69a;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}`;

  return (
    <ModuleCard moduleId="transiciones" title="4. Transiciones (transition)">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            La propiedad <code>transition</code> permite crear <strong>cambios graduales</strong> entre 
            estados de un elemento. Se activan por interacciones como <code>:hover</code>, <code>:focus</code>, 
            o cambios de clase con JavaScript.
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Propiedades de transición</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 font-mono text-sm font-semibold text-primary">transition-property</h4>
              <p className="text-sm text-muted-foreground">
                Qué propiedad(es) animar: <code>all</code>, <code>transform</code>, <code>opacity</code>, etc.
              </p>
            </div>
            
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 font-mono text-sm font-semibold text-primary">transition-duration</h4>
              <p className="text-sm text-muted-foreground">
                Cuánto dura: <code>200ms</code>, <code>0.5s</code>, <code>1s</code>.
              </p>
            </div>
            
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 font-mono text-sm font-semibold text-primary">transition-timing-function</h4>
              <p className="text-sm text-muted-foreground">
                Curva de velocidad: <code>ease</code>, <code>linear</code>, <code>ease-in-out</code>.
              </p>
            </div>
            
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 font-mono text-sm font-semibold text-primary">transition-delay</h4>
              <p className="text-sm text-muted-foreground">
                Tiempo antes de iniciar: <code>0s</code>, <code>100ms</code>.
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <CodeBlock 
              code={`<!-- HTML -->
<button class="btn-transition">
  Hover me
</button>`}
              language="html"
              title="HTML"
            />
            <CodeBlock 
              code={`/* Forma larga */
transition-property: transform, opacity;
transition-duration: 300ms;
transition-timing-function: ease-out;
transition-delay: 0ms;

/* Shorthand (recomendado) */
transition: transform 300ms ease-out 0ms, 
            opacity 300ms ease-out 0ms;`}
              language="css"
              title="CSS"
            />
          </div>
        </section>

        <DemoArea title="Comparación: Sin vs Con transición">
          <div className="mb-4">
            <CodeBlock
              code={`<!-- HTML para ambos ejemplos -->
<div class="caja sin-transicion">Hover</div>
<div class="caja con-transicion">Hover</div>`}
              language="html"
              title="HTML"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="group flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl bg-destructive/80 font-bold text-destructive-foreground hover:scale-110 hover:-translate-y-1 hover:bg-destructive hover:shadow-lg">
                Hover
              </div>
              <span className="text-xs text-muted-foreground">Sin transición</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="group flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl bg-success/80 font-bold text-success-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-success hover:shadow-lg">
                Hover
              </div>
              <span className="text-xs text-muted-foreground">Con transición (300ms)</span>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock
              code={`/* CSS */
.caja {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  cursor: pointer;
}

.sin-transicion {
  background: #ef4444;
}

.con-transicion {
  background: #22c55e;
  transition: all 300ms ease;
}

.caja:hover {
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}`}
              language="css"
              title="CSS"
            />
          </div>
        </DemoArea>

        <section className="playground">
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎮 Playground: Transiciones</h3>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="with-transition" className="text-sm font-medium">
                  Transición activa
                </Label>
                <Switch
                  id="with-transition"
                  checked={withTransition}
                  onCheckedChange={setWithTransition}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Duración: <span className="text-primary">{duration}ms</span>
                </Label>
                <Slider
                  value={[duration]}
                  onValueChange={([v]) => setDuration(v)}
                  min={0}
                  max={2000}
                  step={50}
                  disabled={!withTransition}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Delay: <span className="text-primary">{delay}ms</span>
                </Label>
                <Slider
                  value={[delay]}
                  onValueChange={([v]) => setDelay(v)}
                  min={0}
                  max={1000}
                  step={50}
                  disabled={!withTransition}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Timing Function</Label>
                <Select 
                  value={timingFunction} 
                  onValueChange={setTimingFunction}
                  disabled={!withTransition}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMING_FUNCTIONS.map(tf => (
                      <SelectItem key={tf.value} value={tf.value}>
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div 
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground shadow-md hover:scale-110 hover:-translate-y-1 hover:bg-primary-glow hover:shadow-xl"
                  style={transitionStyle}
                >
                  Hover me
                </div>
              </div>
              
              <CodeBlock 
                code={generatedHTML}
                language="html"
                title="HTML"
              />
              
              <CodeBlock 
                code={generatedCSS}
                language="css"
                title="CSS Generado"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Curvas de timing visualizadas</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['linear', 'ease', 'ease-in', 'ease-out'].map(timing => (
              <div key={timing} className="rounded-lg border border-border bg-card p-4">
                <p className="mb-3 text-center font-mono text-sm font-medium text-primary">{timing}</p>
                <div className="flex h-20 items-end justify-center overflow-hidden rounded bg-muted">
                  <div 
                    className="h-4 w-4 rounded-full bg-primary"
                    style={{
                      animation: `moveRight 2s ${timing} infinite alternate`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes moveRight {
              from { transform: translateX(-40px); }
              to { transform: translateX(40px); }
            }
          `}</style>
        </section>

        <WarningBox title="Evita transition: all">
          <p>
            Usar <code>transition: all</code> anima <strong>todas</strong> las propiedades, incluso las que no 
            deberían cambiar. Es menos performante y puede causar efectos inesperados. Especifica las propiedades exactas.
          </p>
        </WarningBox>

        <TipBox title="Performance">
          <p>
            Las propiedades <code>transform</code> y <code>opacity</code> son las más eficientes porque 
            no provocan "reflow" del layout. Úsalas siempre que sea posible.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "transition anima cambios de estado de forma gradual",
            "Usa el shorthand: transition: propiedad duración timing delay",
            "Especifica propiedades exactas, evita 'all' por rendimiento",
            "transform y opacity son las propiedades más eficientes para animar"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
