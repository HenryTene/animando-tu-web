import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export function Transformaciones3DModule() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const [perspective, setPerspective] = useState(500);
  const [preserveChildren, setPreserveChildren] = useState(true);

  const transformStyle = {
    transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`,
  };

  const generatedCSS = `.contenedor {
  perspective: ${perspective}px;
}

.elemento {
  transform: rotateX(${rotateX}deg) 
             rotateY(${rotateY}deg) 
             rotateZ(${rotateZ}deg) 
             translateZ(${translateZ}px);
  transform-style: ${preserveChildren ? 'preserve-3d' : 'flat'};
}`;

  const htmlExample = `<div class="contenedor">
  <div class="elemento">
    3D
  </div>
</div>`;

  return (
    <ModuleCard moduleId="transformaciones-3d" title="4. Transformaciones 3D (transform)">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            Las <strong>transformaciones 3D</strong> permiten rotar, trasladar y escalar elementos en un espacio tridimensional. 
            A diferencia de las 2D, aquí trabajamos con tres ejes: <code>X</code> (horizontal), <code>Y</code> (vertical) 
            y <code>Z</code> (profundidad hacia/desde el usuario).
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Conceptos clave</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h4 className="mb-2 font-semibold text-primary">perspective</h4>
              <p className="text-sm text-muted-foreground">
                Define la distancia entre el usuario y el plano Z=0. Valores más pequeños = efecto 3D más pronunciado.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h4 className="mb-2 font-semibold text-primary">transform-style</h4>
              <p className="text-sm text-muted-foreground">
                <code>preserve-3d</code> mantiene la posición 3D de los hijos. <code>flat</code> los aplana.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h4 className="mb-2 font-semibold text-primary">backface-visibility</h4>
              <p className="text-sm text-muted-foreground">
                Controla si se muestra la parte trasera del elemento cuando está rotado.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h4 className="mb-2 font-semibold text-primary">perspective-origin</h4>
              <p className="text-sm text-muted-foreground">
                Define el punto de fuga de la perspectiva (por defecto: centro).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Funciones de transformación 3D</h3>
          
          <Tabs defaultValue="rotateX" className="rounded-lg border border-border">
            <TabsList className="w-full flex-wrap justify-start gap-1 rounded-none border-b border-border bg-muted/30 p-2">
              <TabsTrigger value="rotateX">rotateX()</TabsTrigger>
              <TabsTrigger value="rotateY">rotateY()</TabsTrigger>
              <TabsTrigger value="rotateZ">rotateZ()</TabsTrigger>
              <TabsTrigger value="translateZ">translateZ()</TabsTrigger>
              <TabsTrigger value="rotate3d">rotate3d()</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rotateX" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Rota el elemento alrededor del eje X (horizontal). Imagina un kebab girando en su espetón.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor-3d">
  <div class="caja">rotateX</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.contenedor-3d {
  perspective: 500px;
}

.caja {
  width: 128px;
  height: 96px;
  background: linear-gradient(135deg, #3b82f6, #3b82f699);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.caja:hover {
  transform: rotateX(180deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              
              {/* Demo visual */}
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-muted-foreground">Pasa el cursor sobre la caja</p>
                <div style={{ perspective: '500px' }}>
                  <div 
                    className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 font-bold text-primary-foreground shadow-lg transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]"
                  >
                    rotateX
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rotateY" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Rota el elemento alrededor del eje Y (vertical). Como una puerta giratoria.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor-3d">
  <div class="caja">rotateY</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.contenedor-3d {
  perspective: 500px;
}

.caja {
  width: 128px;
  height: 96px;
  background: linear-gradient(135deg, #22c55e, #22c55e99);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.caja:hover {
  transform: rotateY(180deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              
              {/* Demo visual */}
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-muted-foreground">Pasa el cursor sobre la caja</p>
                <div style={{ perspective: '500px' }}>
                  <div 
                    className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-success to-success/60 font-bold text-white shadow-lg transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]"
                  >
                    rotateY
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rotateZ" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Rota el elemento alrededor del eje Z (perpendicular a la pantalla). Igual que <code>rotate()</code> en 2D.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor-3d">
  <div class="caja">rotateZ</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.caja {
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #f59e0b, #f59e0b99);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: transform 0.5s ease;
}

.caja:hover {
  transform: rotateZ(180deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              
              {/* Demo visual */}
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-muted-foreground">Pasa el cursor sobre la caja</p>
                <div 
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-warning to-warning/60 font-bold text-white shadow-lg transition-transform duration-500 hover:[transform:rotateZ(180deg)]"
                >
                  rotateZ
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="translateZ" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Mueve el elemento en el eje Z. Valores positivos lo acercan, negativos lo alejan.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor-3d">
  <div class="caja">translateZ</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.contenedor-3d {
  perspective: 500px;
}

.caja {
  width: 128px;
  height: 96px;
  background: linear-gradient(135deg, #ef4444, #ef444499);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: transform 0.3s ease;
}

.caja:hover {
  transform: translateZ(60px);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              
              {/* Demo visual */}
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-muted-foreground">Pasa el cursor sobre la caja</p>
                <div style={{ perspective: '500px' }}>
                  <div 
                    className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-destructive to-destructive/60 font-bold text-white shadow-lg transition-transform duration-300 hover:[transform:translateZ(60px)]"
                  >
                    translateZ
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rotate3d" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Rota alrededor de un vector 3D personalizado: <code>rotate3d(x, y, z, angle)</code>
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor-3d">
  <div class="caja">rotate3d</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.contenedor-3d {
  perspective: 500px;
}

.caja {
  width: 128px;
  height: 96px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: transform 0.5s ease;
}

.caja:hover {
  /* Rota en diagonal (eje X=1, Y=1, Z=0) */
  transform: rotate3d(1, 1, 0, 45deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              
              {/* Demo visual */}
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-xs text-muted-foreground">Pasa el cursor sobre la caja</p>
                <div style={{ perspective: '500px' }}>
                  <div 
                    className="flex h-24 w-32 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-primary font-bold text-white shadow-lg transition-transform duration-500 hover:[transform:rotate3d(1,1,0,45deg)]"
                  >
                    rotate3d
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Ejemplo de tarjeta flip completa */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">📦 Ejemplo: Tarjeta Flip Completa</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Un patrón común usando transformaciones 3D: una tarjeta que voltea al hacer hover.
          </p>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <CodeBlock 
                code={`<!-- HTML -->
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <h3>Frente</h3>
      <p>Pasa el mouse</p>
    </div>
    <div class="flip-card-back">
      <h3>Atrás</h3>
      <p>¡Sorpresa!</p>
    </div>
  </div>
</div>`}
                language="html"
                title="HTML"
              />
              
              <CodeBlock 
                code={`/* CSS */
.flip-card {
  width: 200px;
  height: 150px;
  perspective: 1000px;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flip-card-front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.flip-card-back {
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: white;
  transform: rotateY(180deg);
}`}
                language="css"
                title="CSS"
              />
            </div>
            
            {/* Demo de flip card */}
            <div className="flex items-center justify-center">
              <div className="h-36 w-48 [perspective:1000px]">
                <div className="group relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-xl [backface-visibility:hidden]">
                    <h4 className="text-lg font-bold">Frente</h4>
                    <p className="text-sm opacity-80">Pasa el mouse</p>
                  </div>
                  {/* Back */}
                  <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-success to-primary text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h4 className="text-lg font-bold">Atrás</h4>
                    <p className="text-sm opacity-80">¡Sorpresa!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="playground">
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎮 Playground: Transformaciones 3D</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Ajusta los controles para experimentar con transformaciones 3D en tiempo real.
          </p>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Controls */}
            <div className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Perspective: <span className="text-primary">{perspective}px</span>
                </Label>
                <Slider
                  value={[perspective]}
                  onValueChange={([v]) => setPerspective(v)}
                  min={100}
                  max={1500}
                  step={50}
                />
                <p className="text-xs text-muted-foreground">
                  Menor = efecto más extremo | Mayor = más sutil
                </p>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Rotate X: <span className="text-primary">{rotateX}°</span>
                </Label>
                <Slider
                  value={[rotateX]}
                  onValueChange={([v]) => setRotateX(v)}
                  min={-180}
                  max={180}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Rotate Y: <span className="text-primary">{rotateY}°</span>
                </Label>
                <Slider
                  value={[rotateY]}
                  onValueChange={([v]) => setRotateY(v)}
                  min={-180}
                  max={180}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Rotate Z: <span className="text-primary">{rotateZ}°</span>
                </Label>
                <Slider
                  value={[rotateZ]}
                  onValueChange={([v]) => setRotateZ(v)}
                  min={-180}
                  max={180}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Translate Z: <span className="text-primary">{translateZ}px</span>
                </Label>
                <Slider
                  value={[translateZ]}
                  onValueChange={([v]) => setTranslateZ(v)}
                  min={-200}
                  max={200}
                  step={5}
                />
              </div>
              
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Switch
                  id="preserve-3d"
                  checked={preserveChildren}
                  onCheckedChange={setPreserveChildren}
                />
                <Label htmlFor="preserve-3d" className="text-sm font-medium">
                  transform-style: {preserveChildren ? 'preserve-3d' : 'flat'}
                </Label>
              </div>
            </div>
            
            {/* Preview */}
            <div className="flex flex-col gap-4">
              <div 
                className="relative flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20"
                style={{ perspective: `${perspective}px` }}
              >
                <div 
                  className="flex h-24 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-bold text-primary-foreground shadow-xl"
                  style={{
                    ...transformStyle,
                    transformStyle: preserveChildren ? 'preserve-3d' : 'flat',
                  }}
                >
                  3D
                </div>
              </div>
              
              <CodeBlock 
                code={htmlExample}
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

        {/* Ejemplo Cubo 3D */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎲 Ejemplo Avanzado: Cubo 3D</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Un cubo completo usando solo CSS. Pasa el mouse para rotarlo.
          </p>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <CodeBlock 
                code={`<!-- HTML -->
<div class="scene-cube">
  <div class="cube">
    <div class="face front">1</div>
    <div class="face back">2</div>
    <div class="face right">3</div>
    <div class="face left">4</div>
    <div class="face top">5</div>
    <div class="face bottom">6</div>
  </div>
</div>`}
                language="html"
                title="HTML"
              />
              
              <CodeBlock 
                code={`/* CSS */
.scene-cube {
  width: 100px;
  height: 100px;
  perspective: 400px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.scene-cube:hover .cube {
  transform: rotateX(45deg) rotateY(45deg);
}

.face {
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid rgba(0,0,0,0.1);
}

.front  { transform: translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }`}
                language="css"
                title="CSS"
              />
            </div>
            
            {/* Demo Cubo */}
            <div className="flex items-center justify-center py-8">
              <div className="h-24 w-24 [perspective:400px]">
                <div className="group relative h-full w-full transition-transform duration-1000 [transform-style:preserve-3d] hover:[transform:rotateX(45deg)_rotateY(45deg)]">
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-primary/80 text-2xl font-bold text-white [transform:translateZ(48px)]">
                    1
                  </div>
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-secondary/80 text-2xl font-bold text-white [transform:rotateY(180deg)_translateZ(48px)]">
                    2
                  </div>
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-success/80 text-2xl font-bold text-white [transform:rotateY(90deg)_translateZ(48px)]">
                    3
                  </div>
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-warning/80 text-2xl font-bold text-white [transform:rotateY(-90deg)_translateZ(48px)]">
                    4
                  </div>
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-destructive/80 text-2xl font-bold text-white [transform:rotateX(90deg)_translateZ(48px)]">
                    5
                  </div>
                  <div className="absolute flex h-24 w-24 items-center justify-center border-2 border-white/20 bg-muted text-2xl font-bold [transform:rotateX(-90deg)_translateZ(48px)]">
                    6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WarningBox title="Rendimiento 3D">
          <p>
            Las transformaciones 3D usan aceleración de hardware (GPU), pero un uso excesivo puede 
            afectar el rendimiento en dispositivos móviles. Usa <code>will-change: transform</code> 
            con moderación para optimizar.
          </p>
        </WarningBox>

        <TipBox>
          <p>
            <code>backface-visibility: hidden</code> es esencial para tarjetas flip. Sin él, 
            verás la cara trasera "invertida" cuando el elemento rote.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "perspective define la intensidad del efecto 3D (menor = más extremo)",
            "rotateX/Y/Z rotan en los tres ejes del espacio",
            "translateZ acerca o aleja elementos del usuario",
            "transform-style: preserve-3d mantiene el 3D en elementos hijos",
            "backface-visibility: hidden oculta la cara trasera al rotar"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
