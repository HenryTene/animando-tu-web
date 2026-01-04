import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ModuleCard, ConceptBox, TipBox, SummaryBox } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SLIDES = [
  {
    id: 1,
    gradient: 'from-primary to-primary-glow',
    title: 'CSS Animations',
    description: 'Creando movimiento con código',
  },
  {
    id: 2,
    gradient: 'from-secondary to-orange-400',
    title: 'Transiciones suaves',
    description: 'De un estado a otro con elegancia',
  },
  {
    id: 3,
    gradient: 'from-accent to-purple-400',
    title: '@keyframes',
    description: 'Control total del movimiento',
  },
  {
    id: 4,
    gradient: 'from-success to-emerald-400',
    title: 'Transformaciones 2D',
    description: 'Rotate, scale, translate, skew',
  },
  {
    id: 5,
    gradient: 'from-pink-500 to-rose-400',
    title: '¡Practica!',
    description: 'La práctica hace al maestro',
  },
];

const AUTO_PLAY_INTERVAL = 4000;

export function LaboratorioModule() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(goToNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== sliderRef.current && 
          !sliderRef.current?.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, togglePlay]);

  const sliderCSS = `/* ========== SLIDER CSS ========== */

/* Contenedor principal */
.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
}

/* Contenedor de slides */
.slider-track {
  display: flex;
  transition: transform 500ms ease-in-out;
}

.slider-track[data-current="0"] { transform: translateX(0%); }
.slider-track[data-current="1"] { transform: translateX(-100%); }
.slider-track[data-current="2"] { transform: translateX(-200%); }
/* ... etc */

/* Cada slide */
.slide {
  flex: 0 0 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0.5;
  transition: opacity 500ms ease;
}

.slide.active {
  opacity: 1;
}

/* Indicadores (dots) */
.dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  border: none;
  cursor: pointer;
  transition: background 300ms ease, transform 300ms ease;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

.dot:hover {
  background: rgba(255,255,255,0.6);
}

/* Botones prev/next */
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background 200ms ease, transform 200ms ease;
}

.slider-btn:hover {
  background: rgba(0,0,0,0.5);
  transform: translateY(-50%) scale(1.1);
}

.slider-btn.prev { left: 1rem; }
.slider-btn.next { right: 1rem; }`;

  const sliderHTML = `<!-- HTML Structure -->
<div class="slider" 
     tabindex="0" 
     role="region" 
     aria-label="Carrusel de imágenes">
  
  <!-- Track con slides -->
  <div class="slider-track" data-current="0">
    <div class="slide active" aria-hidden="false">
      <h3>Slide 1</h3>
      <p>Descripción</p>
    </div>
    <div class="slide" aria-hidden="true">
      <h3>Slide 2</h3>
      <p>Descripción</p>
    </div>
    <!-- ... más slides -->
  </div>
  
  <!-- Controles -->
  <button class="slider-btn prev" aria-label="Anterior">
    ←
  </button>
  <button class="slider-btn next" aria-label="Siguiente">
    →
  </button>
  
  <!-- Indicadores -->
  <div class="dots" role="tablist">
    <button class="dot active" 
            role="tab" 
            aria-selected="true"
            aria-label="Ir a slide 1"></button>
    <button class="dot" 
            role="tab" 
            aria-selected="false"
            aria-label="Ir a slide 2"></button>
    <!-- ... más dots -->
  </div>
  
  <!-- Play/Pause -->
  <button class="play-pause" aria-label="Pausar">
    ⏸
  </button>
</div>`;

  return (
    <ModuleCard moduleId="laboratorio" title="6. Laboratorio: Slider Animado">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            En este laboratorio construiremos un <strong>slider/carrusel funcional</strong> que integra 
            todo lo aprendido: transformaciones, transiciones y animaciones CSS. El slider cambia 
            automáticamente, responde al teclado, y es accesible.
          </p>
        </ConceptBox>

        {/* Interactive Slider */}
        <section className="playground">
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎠 Slider en acción</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Usa las flechas, los puntos, o el teclado (← →) para navegar. El slider pausa al hover.
          </p>
          
          <div 
            ref={sliderRef}
            className="relative overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0}
            role="region"
            aria-label="Carrusel de demostración"
            aria-live="polite"
          >
            {/* Slides Track */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={cn(
                    "flex min-h-[280px] w-full flex-shrink-0 flex-col items-center justify-center bg-gradient-to-br p-8 text-center transition-opacity duration-500",
                    slide.gradient,
                    index === currentSlide ? 'opacity-100' : 'opacity-60'
                  )}
                  aria-hidden={index !== currentSlide}
                >
                  <h3 className="mb-2 text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
                    {slide.title}
                  </h3>
                  <p className="text-lg text-white/90 drop-shadow">
                    {slide.description}
                  </p>
                  <div className="mt-4 text-sm text-white/70">
                    Slide {slide.id} de {SLIDES.length}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Slide siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            {/* Dots Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist">
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-3 w-3 rounded-full border-2 border-white/50 transition-all hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                    index === currentSlide 
                      ? 'scale-125 bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  )}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>⌨️ Usa ← → para navegar</span>
            <span>•</span>
            <span>🖱️ Hover para pausar</span>
            <span>•</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              isPlaying ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
            )}>
              {isPlaying ? (isHovered ? 'En pausa (hover)' : 'Reproduciendo') : 'Pausado'}
            </span>
          </div>
        </section>

        {/* Code Tutorial */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">📝 Paso a paso: Construir el slider</h3>
          
          <Tabs defaultValue="css" className="rounded-lg border border-border">
            <TabsList className="w-full justify-start gap-1 rounded-none border-b border-border bg-muted/30 p-2">
              <TabsTrigger value="css">1. CSS (Estilos)</TabsTrigger>
              <TabsTrigger value="html">2. HTML (Estructura)</TabsTrigger>
              <TabsTrigger value="tips">3. Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="css" className="p-0">
              <CodeBlock 
                code={sliderCSS}
                language="css"
                showLineNumbers
              />
            </TabsContent>
            
            <TabsContent value="html" className="p-0">
              <CodeBlock 
                code={sliderHTML}
                language="html"
                showLineNumbers
              />
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-4 p-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Puntos clave del slider:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    <span>La animación principal usa <code>transform: translateX()</code> con <code>transition</code> para deslizar suavemente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    <span>Los controles (prev/next, dots) usan <code>transition</code> para efectos de hover.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    <span>El auto-play usa <code>setInterval</code> en JavaScript, pero la transición es CSS puro.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    <span>Para accesibilidad: <code>tabindex</code>, <code>aria-labels</code>, y soporte de teclado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">5.</span>
                    <span>El pause-on-hover mejora la UX permitiendo al usuario leer el contenido.</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <TipBox title="CSS vs JavaScript">
          <p>
            Este slider usa CSS para las animaciones (transform + transition) y JavaScript solo para 
            la lógica de navegación. Este enfoque <strong>CSS-first</strong> es más performante y 
            mantiene la separación de responsabilidades.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "transform: translateX() mueve el track del slider",
            "transition suaviza el cambio entre slides",
            "JavaScript controla la lógica, CSS controla el movimiento",
            "Accesibilidad: tabindex, aria-labels, navegación por teclado"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
