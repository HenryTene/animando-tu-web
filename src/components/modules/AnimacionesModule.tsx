import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox, DemoArea } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ANIMATION_PRESETS = [
  { 
    value: 'spin', 
    label: 'Spinner (rotate)', 
    keyframes: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}` 
  },
  { 
    value: 'bounce', 
    label: 'Bounce (translate)', 
    keyframes: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}` 
  },
  { 
    value: 'fadeIn', 
    label: 'Fade In (opacity)', 
    keyframes: `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}` 
  },
  { 
    value: 'pulse', 
    label: 'Pulse (scale)', 
    keyframes: `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}` 
  },
  { 
    value: 'shake', 
    label: 'Shake (translate)', 
    keyframes: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}` 
  },
];

const DIRECTIONS = [
  { value: 'normal', label: 'normal' },
  { value: 'reverse', label: 'reverse' },
  { value: 'alternate', label: 'alternate' },
  { value: 'alternate-reverse', label: 'alternate-reverse' },
];

const FILL_MODES = [
  { value: 'none', label: 'none' },
  { value: 'forwards', label: 'forwards' },
  { value: 'backwards', label: 'backwards' },
  { value: 'both', label: 'both' },
];

export function AnimacionesModule() {
  const [selectedPreset, setSelectedPreset] = useState('spin');
  const [duration, setDuration] = useState(1000);
  const [iterations, setIterations] = useState('infinite');
  const [direction, setDirection] = useState('normal');
  const [fillMode, setFillMode] = useState('none');
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // For restarting animation

  const preset = ANIMATION_PRESETS.find(p => p.value === selectedPreset);
  
  const animationStyle: React.CSSProperties = {
    animation: isPlaying 
      ? `${selectedPreset} ${duration}ms ease-in-out ${iterations} ${direction} ${fillMode}`
      : 'none',
  };

  const generatedCSS = `${preset?.keyframes}

.elemento {
  animation-name: ${selectedPreset};
  animation-duration: ${duration}ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: ${iterations};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
  animation-play-state: ${isPlaying ? 'running' : 'paused'};
}`;

  const handleRestart = () => {
    setKey(prev => prev + 1);
    setIsPlaying(true);
  };

  return (
    <ModuleCard moduleId="animaciones" title="5. Animaciones con @keyframes">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            Las animaciones CSS con <code>@keyframes</code> permiten crear <strong>secuencias de cambios 
            autónomas</strong> que se ejecutan sin necesidad de interacción del usuario. Son ideales para 
            loaders, efectos de entrada, y elementos decorativos.
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Estructura de @keyframes</h3>
          
          <CodeBlock 
            code={`/* Sintaxis con from/to (2 estados) */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sintaxis con porcentajes (múltiples estados) */
@keyframes bounce {
  0% { transform: translateY(0); }
  25% { transform: translateY(-10px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}`}
            language="css"
            title="Definir @keyframes"
          />
        </section>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Propiedades de animación</h3>
          
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { prop: 'animation-name', desc: 'Nombre del @keyframes' },
              { prop: 'animation-duration', desc: 'Duración total' },
              { prop: 'animation-timing-function', desc: 'Curva de velocidad' },
              { prop: 'animation-delay', desc: 'Tiempo antes de iniciar' },
              { prop: 'animation-iteration-count', desc: 'Repeticiones (1, 3, infinite)' },
              { prop: 'animation-direction', desc: 'Dirección (normal, reverse, alternate)' },
              { prop: 'animation-fill-mode', desc: 'Estado al terminar' },
              { prop: 'animation-play-state', desc: 'Pausar/reanudar' },
            ].map(item => (
              <div key={item.prop} className="rounded-lg border border-border bg-card p-3">
                <p className="font-mono text-xs font-semibold text-primary">{item.prop}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <DemoArea title="Demos de animaciones básicas">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="text-xs text-muted-foreground">Spinner</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-bounce-subtle rounded-lg bg-secondary" />
              <span className="text-xs text-muted-foreground">Bounce</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-accent" />
              <span className="text-xs text-muted-foreground">Fade Pulse</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i}
                    className="h-3 w-3 rounded-full bg-primary"
                    style={{
                      animation: 'bounce 0.6s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Stagger Loader</span>
            </div>
          </div>
        </DemoArea>

        <section className="playground">
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎮 Playground: Animaciones</h3>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Preset de animación</Label>
                <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ANIMATION_PRESETS.map(p => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Duración: <span className="text-primary">{duration}ms</span>
                </Label>
                <Slider
                  value={[duration]}
                  onValueChange={([v]) => setDuration(v)}
                  min={100}
                  max={3000}
                  step={100}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Iteraciones</Label>
                  <Select value={iterations} onValueChange={setIterations}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="infinite">infinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Dirección</Label>
                  <Select value={direction} onValueChange={setDirection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DIRECTIONS.map(d => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Fill Mode</Label>
                <Select value={fillMode} onValueChange={setFillMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILL_MODES.map(fm => (
                      <SelectItem key={fm.value} value={fm.value}>
                        {fm.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isPlaying ? "outline" : "default"}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pausar' : 'Reanudar'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRestart}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div 
                  key={key}
                  className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground"
                  style={animationStyle}
                >
                  DIV
                </div>
              </div>
              
              <CodeBlock 
                code={generatedCSS}
                language="css"
                title="CSS Generado"
                showLineNumbers
              />
            </div>
          </div>
          
          {/* Inject keyframe styles */}
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
            }
          `}</style>
        </section>

        <TipBox title="fill-mode explicado">
          <p>
            <code>forwards</code> mantiene los estilos del último keyframe al terminar. 
            <code>backwards</code> aplica los del primer keyframe durante el delay. 
            <code>both</code> hace ambas cosas.
          </p>
        </TipBox>

        <WarningBox>
          <p>
            Las animaciones infinitas consumen recursos. Paúsalas cuando el elemento no está visible 
            (por ejemplo, cuando el usuario cambia de pestaña) usando la API de Visibility o Intersection Observer.
          </p>
        </WarningBox>

        <SummaryBox 
          items={[
            "@keyframes define la secuencia de estados de la animación",
            "Usa porcentajes (0%, 50%, 100%) para control fino del timing",
            "animation-fill-mode: forwards mantiene el estado final",
            "Considera el rendimiento: pausa animaciones no visibles"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
