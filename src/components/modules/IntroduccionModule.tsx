import { ModuleCard, ConceptBox, TipBox, SummaryBox, DemoArea } from '@/components/ModuleCard';

export function IntroduccionModule() {
  return (
    <ModuleCard moduleId="introduccion" title="1. Introducción: ¿Qué es la animación web?">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            Las <strong>animaciones web</strong> son cambios visuales que ocurren en los elementos de una página 
            a lo largo del tiempo. Sirven para <em>comunicar</em>, dar <em>feedback</em> al usuario, 
            y <em>guiar la atención</em> hacia elementos importantes.
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-3 text-lg font-semibold text-foreground">¿Para qué sirven las animaciones?</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg">
                💬
              </span>
              <div>
                <p className="font-medium text-foreground">Comunicación</p>
                <p className="text-sm text-muted-foreground">Transmiten estados y cambios de manera visual</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-lg">
                ✨
              </span>
              <div>
                <p className="font-medium text-foreground">Feedback</p>
                <p className="text-sm text-muted-foreground">Confirman acciones del usuario (clicks, hovers)</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-lg">
                👁️
              </span>
              <div>
                <p className="font-medium text-foreground">Guía visual</p>
                <p className="text-sm text-muted-foreground">Dirigen la atención hacia elementos importantes</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-lg">
                🎭
              </span>
              <div>
                <p className="font-medium text-foreground">Personalidad</p>
                <p className="text-sm text-muted-foreground">Dan vida y carácter a la interfaz</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Los 3 pilares de la animación CSS</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl text-primary-foreground">
                ⚡
              </div>
              <h4 className="mb-2 font-bold text-foreground">Transform</h4>
              <p className="text-sm text-muted-foreground">
                Cambio <strong>instantáneo</strong> de posición, rotación, escala o inclinación.
              </p>
              <p className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs">
                transform: rotate(45deg);
              </p>
            </div>
            
            <div className="rounded-xl border-2 border-secondary/20 bg-secondary/5 p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl text-secondary-foreground">
                ⏱️
              </div>
              <h4 className="mb-2 font-bold text-foreground">Transition</h4>
              <p className="text-sm text-muted-foreground">
                Cambio <strong>gradual</strong> entre estados, activado por interacción (hover, focus).
              </p>
              <p className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs">
                transition: all 0.3s ease;
              </p>
            </div>
            
            <div className="rounded-xl border-2 border-accent/20 bg-accent/5 p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-2xl text-accent-foreground">
                🎬
              </div>
              <h4 className="mb-2 font-bold text-foreground">Animation</h4>
              <p className="text-sm text-muted-foreground">
                Secuencia <strong>autónoma</strong> definida con @keyframes, se ejecuta sola.
              </p>
              <p className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs">
                animation: bounce 1s infinite;
              </p>
            </div>
          </div>
        </section>

        <DemoArea title="Demo: Comparación visual">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                <div className="h-16 w-16 rounded-lg bg-primary transition-none group-hover:rotate-45">
                  <span className="flex h-full items-center justify-center text-xs font-bold text-primary-foreground">
                    Hover
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Transform (instantáneo)</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                <div className="h-16 w-16 rounded-lg bg-secondary transition-transform duration-300 group-hover:rotate-45">
                  <span className="flex h-full items-center justify-center text-xs font-bold text-secondary-foreground">
                    Hover
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Transition (gradual)</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 animate-bounce-subtle rounded-lg bg-accent">
                <span className="flex h-full items-center justify-center text-xs font-bold text-accent-foreground">
                  Auto
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Animation (autónoma)</span>
            </div>
          </div>
        </DemoArea>

        <TipBox>
          <p>
            Pasa el cursor sobre los cuadros de "Transform" y "Transition" para ver la diferencia. 
            El cuadro "Animation" se mueve solo, sin necesidad de interacción.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "Las animaciones mejoran la UX comunicando estados y guiando al usuario",
            "Transform cambia propiedades instantáneamente",
            "Transition anima cambios de forma gradual al interactuar",
            "Animation se ejecuta de forma autónoma con @keyframes"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
