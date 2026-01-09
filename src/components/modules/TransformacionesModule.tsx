import { useState } from 'react';
import { ModuleCard, ConceptBox, TipBox, WarningBox, SummaryBox } from '@/components/ModuleCard';
import { CodeBlock } from '@/components/CodeBlock';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TransformacionesModule() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [originX, setOriginX] = useState(50);
  const [originY, setOriginY] = useState(50);

  const transformStyle = {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skew(${skewX}deg, ${skewY}deg)`,
    transformOrigin: `${originX}% ${originY}%`,
  };

  const generatedHTML = `<!-- HTML -->
<div class="elemento">
  DIV
</div>`;

  const generatedCSS = `/* CSS */
.elemento {
  transform: translate(${translateX}px, ${translateY}px) 
             rotate(${rotate}deg) 
             scale(${scale}) 
             skew(${skewX}deg, ${skewY}deg);
  transform-origin: ${originX}% ${originY}%;
}`;

  return (
    <ModuleCard moduleId="transformaciones" title="3. Transformaciones 2D (transform)">
      <div className="space-y-6">
        <ConceptBox>
          <p>
            La propiedad <code>transform</code> permite <strong>modificar la forma, posición y orientación</strong> de 
            un elemento sin afectar el flujo del documento. Las transformaciones son <em>instantáneas</em> por defecto, 
            pero se pueden animar con <code>transition</code>.
          </p>
        </ConceptBox>

        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Funciones de transformación</h3>
          
          <Tabs defaultValue="translate" className="rounded-lg border border-border">
            <TabsList className="w-full flex-wrap justify-start gap-1 rounded-none border-b border-border bg-muted/30 p-2">
              <TabsTrigger value="translate">translate()</TabsTrigger>
              <TabsTrigger value="rotate">rotate()</TabsTrigger>
              <TabsTrigger value="scale">scale()</TabsTrigger>
              <TabsTrigger value="skew">skew()</TabsTrigger>
            </TabsList>
            
            <TabsContent value="translate" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Mueve el elemento en los ejes X e Y. Acepta valores en <code>px</code>, <code>%</code>, <code>rem</code>, etc.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="contenedor">
  <div class="caja-original"></div>
  <div class="caja-movida">50px, 20px</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.contenedor {
  position: relative;
  width: 64px;
  height: 64px;
}

.caja-original {
  width: 64px;
  height: 64px;
  border: 2px dashed #888;
  border-radius: 8px;
}

.caja-movida {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.caja-movida:hover {
  transform: translate(50px, 20px);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              {/* Demo visual */}
              <div className="flex justify-center rounded-lg border border-dashed border-border bg-muted/20 p-8">
                <p className="text-xs text-muted-foreground mb-2 absolute top-2 left-2">Pasa el cursor sobre la caja</p>
                <div className="relative h-24 w-40">
                  <div className="absolute left-0 top-4 h-16 w-16 rounded-lg border-2 border-dashed border-muted-foreground/30"></div>
                  <div className="absolute left-0 top-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground transition-transform duration-300 hover:[transform:translate(50px,20px)] cursor-pointer">
                    Hover
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rotate" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Rota el elemento. Valores positivos = sentido horario.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="cajas">
  <div class="caja">0°</div>
  <div class="caja rotada-45">45°</div>
  <div class="caja rotada-90">90°</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.cajas {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.caja {
  width: 64px;
  height: 64px;
  background: #22c55e;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.caja:nth-child(2):hover {
  transform: rotate(45deg);
}

.caja:nth-child(3):hover {
  transform: rotate(90deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              {/* Demo visual */}
              <div className="flex justify-center gap-8 rounded-lg border border-dashed border-border bg-muted/20 p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-success text-lg font-bold text-white">
                  0°
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-success text-lg font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:rotate(45deg)]">
                  45°
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-success text-lg font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:rotate(90deg)]">
                  90°
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scale" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Escala el elemento. 1 = tamaño original, &lt;1 = reduce, &gt;1 = agranda.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="cajas">
  <div class="caja escala-05">0.5</div>
  <div class="caja">1.0</div>
  <div class="caja escala-15">1.5</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.cajas {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.caja {
  width: 64px;
  height: 64px;
  background: #f59e0b;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.caja:nth-child(1):hover {
  transform: scale(0.5);
}

.caja:nth-child(3):hover {
  transform: scale(1.5);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              {/* Demo visual */}
              <div className="flex items-center justify-center gap-12 rounded-lg border border-dashed border-border bg-muted/20 p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-warning text-sm font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:scale(0.5)]">
                  0.5
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-warning text-sm font-bold text-white">
                  1.0
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-warning text-sm font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:scale(1.5)]">
                  1.5
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="skew" className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Inclina el elemento en los ejes X e Y.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock 
                  code={`<!-- HTML -->
<div class="cajas">
  <div class="caja">Normal</div>
  <div class="caja skew-x">skewX</div>
  <div class="caja skew-xy">skew</div>
</div>`}
                  language="html"
                  title="HTML"
                />
                <CodeBlock 
                  code={`/* CSS */
.cajas {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
}

.caja {
  width: 80px;
  height: 64px;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.caja:nth-child(2):hover {
  transform: skewX(15deg);
}

.caja:nth-child(3):hover {
  transform: skew(10deg, 5deg);
}`}
                  language="css"
                  title="CSS"
                />
              </div>
              {/* Demo visual */}
              <div className="flex items-center justify-center gap-8 rounded-lg border border-dashed border-border bg-muted/20 p-8">
                <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-destructive text-xs font-bold text-white">
                  Normal
                </div>
                <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-destructive text-xs font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:skewX(15deg)]">
                  skewX
                </div>
                <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-destructive text-xs font-bold text-white cursor-pointer transition-transform duration-300 hover:[transform:skew(10deg,5deg)]">
                  skew
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="playground">
          <h3 className="mb-4 text-lg font-semibold text-foreground">🎮 Playground: Transformaciones</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Ajusta los controles para ver cómo cambia el elemento en tiempo real.
          </p>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Controls */}
            <div className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Translate X: <span className="text-primary">{translateX}px</span>
                </Label>
                <Slider
                  value={[translateX]}
                  onValueChange={([v]) => setTranslateX(v)}
                  min={-100}
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Translate Y: <span className="text-primary">{translateY}px</span>
                </Label>
                <Slider
                  value={[translateY]}
                  onValueChange={([v]) => setTranslateY(v)}
                  min={-100}
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Rotate: <span className="text-primary">{rotate}°</span>
                </Label>
                <Slider
                  value={[rotate]}
                  onValueChange={([v]) => setRotate(v)}
                  min={-180}
                  max={180}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Scale: <span className="text-primary">{scale.toFixed(2)}</span>
                </Label>
                <Slider
                  value={[scale]}
                  onValueChange={([v]) => setScale(v)}
                  min={0.2}
                  max={2}
                  step={0.05}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Skew X: <span className="text-primary">{skewX}°</span>
                  </Label>
                  <Slider
                    value={[skewX]}
                    onValueChange={([v]) => setSkewX(v)}
                    min={-45}
                    max={45}
                    step={1}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Skew Y: <span className="text-primary">{skewY}°</span>
                  </Label>
                  <Slider
                    value={[skewY]}
                    onValueChange={([v]) => setSkewY(v)}
                    min={-45}
                    max={45}
                    step={1}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Origin X: <span className="text-primary">{originX}%</span>
                  </Label>
                  <Slider
                    value={[originX]}
                    onValueChange={([v]) => setOriginX(v)}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Origin Y: <span className="text-primary">{originY}%</span>
                  </Label>
                  <Slider
                    value={[originY]}
                    onValueChange={([v]) => setOriginY(v)}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
            
            {/* Preview */}
            <div className="flex flex-col gap-4">
              <div className="relative flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                {/* Origin point indicator */}
                <div 
                  className="absolute h-2 w-2 rounded-full bg-destructive"
                  style={{
                    left: `calc(50% + ${translateX}px - 4px + (${originX - 50}% * 0.8))`,
                    top: `calc(50% + ${translateY}px - 4px + (${originY - 50}% * 0.8))`,
                    transform: `rotate(${rotate}deg) scale(${scale})`,
                    zIndex: 10,
                  }}
                  title="Punto de origen"
                />
                
                <div 
                  className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground"
                  style={transformStyle}
                >
                  DIV
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

        <WarningBox title="El orden importa">
          <p>
            Las transformaciones se aplican de <strong>derecha a izquierda</strong>. 
            <code>rotate(45deg) translate(100px, 0)</code> primero traslada y luego rota, 
            mientras que <code>translate(100px, 0) rotate(45deg)</code> primero rota y luego traslada.
          </p>
        </WarningBox>

        <TipBox>
          <p>
            <code>transform-origin</code> define el punto de referencia para rotaciones y escalas. 
            Por defecto es el centro (50% 50%). Prueba cambiarlo en el playground de arriba.
          </p>
        </TipBox>

        <SummaryBox 
          items={[
            "transform permite translate, rotate, scale y skew sin afectar el layout",
            "El orden de las funciones afecta el resultado final",
            "transform-origin define el punto de referencia para las transformaciones",
            "Las transformaciones son instantáneas; usa transition para animarlas"
          ]}
        />
      </div>
    </ModuleCard>
  );
}
