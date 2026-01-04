import { useState, useCallback } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Download, Copy, Check } from 'lucide-react';
import { ModuleCard, ConceptBox, TipBox } from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '¿Cuál es la diferencia principal entre transform y transition?',
    options: [
      'transform cambia la posición, transition cambia el color',
      'transform aplica cambios instantáneos, transition los anima gradualmente',
      'transform es para 3D, transition para 2D',
      'No hay diferencia, son sinónimos',
    ],
    correct: 1,
  },
  {
    id: 2,
    question: '¿Qué propiedad CSS se usa para definir cuánto dura una transición?',
    options: [
      'transition-time',
      'animation-duration',
      'transition-duration',
      'duration',
    ],
    correct: 2,
  },
  {
    id: 3,
    question: '¿Qué hace animation-fill-mode: forwards?',
    options: [
      'Repite la animación indefinidamente',
      'Mantiene los estilos del último keyframe al terminar',
      'Inicia la animación desde el final',
      'Aplica los estilos del primer keyframe',
    ],
    correct: 1,
  },
  {
    id: 4,
    question: '¿Por qué se recomienda evitar transition: all?',
    options: [
      'No funciona en todos los navegadores',
      'Es más lento y puede animar propiedades no deseadas',
      'Solo funciona con @keyframes',
      'Causa errores de sintaxis',
    ],
    correct: 1,
  },
  {
    id: 5,
    question: '¿Qué propiedades son más eficientes para animar?',
    options: [
      'width y height',
      'margin y padding',
      'transform y opacity',
      'left y top',
    ],
    correct: 2,
  },
  {
    id: 6,
    question: '¿Cómo se define una animación con múltiples estados intermedios?',
    options: [
      'Usando from/to solamente',
      'Con porcentajes en @keyframes (0%, 50%, 100%)',
      'Con transition-steps',
      'Con animation-frames',
    ],
    correct: 1,
  },
  {
    id: 7,
    question: '¿Qué hace transform-origin?',
    options: [
      'Define la duración de la transformación',
      'Establece el punto de referencia para rotaciones y escalas',
      'Inicia la transformación automáticamente',
      'Determina el orden de las transformaciones',
    ],
    correct: 1,
  },
  {
    id: 8,
    question: '¿Cuál es el orden correcto de aplicación en transform: rotate(45deg) translate(100px, 0)?',
    options: [
      'Primero rota, luego traslada',
      'Primero traslada, luego rota',
      'Ambas se aplican simultáneamente',
      'El orden no importa',
    ],
    correct: 1,
  },
  {
    id: 9,
    question: '¿Qué timing function produce un efecto de "rebote"?',
    options: [
      'linear',
      'ease-in-out',
      'cubic-bezier con valores negativos o > 1',
      'ease',
    ],
    correct: 2,
  },
  {
    id: 10,
    question: '¿Para qué sirve prefers-reduced-motion?',
    options: [
      'Para hacer las animaciones más rápidas',
      'Para detectar usuarios que prefieren menos movimiento',
      'Para optimizar el rendimiento',
      'Para activar el modo oscuro',
    ],
    correct: 1,
  },
];

const CHECKLIST_ITEMS = [
  'Usar transform y opacity para animaciones (mejor rendimiento)',
  'Especificar propiedades exactas en transition, evitar "all"',
  'Implementar prefers-reduced-motion para accesibilidad',
  'Usar animation-fill-mode: forwards si necesitas mantener el estado final',
  'Considerar el orden de las funciones de transform',
  'Pausar animaciones infinitas cuando no son visibles',
  'Probar las animaciones en diferentes velocidades de CPU',
  'Asegurar contraste suficiente durante las transiciones de color',
  'Usar timing functions apropiadas para cada contexto',
  'Evitar animaciones excesivas que distraigan al usuario',
];

export function EvaluacionModule() {
  const { setQuizScore } = useApp();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnswer = useCallback((questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (Object.keys(answers).length < QUIZ_QUESTIONS.length) {
      alert('Por favor responde todas las preguntas antes de enviar.');
      return;
    }
    setSubmitted(true);
    setShowResults(true);
    
    const correctCount = QUIZ_QUESTIONS.filter(q => answers[q.id] === q.correct).length;
    const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setQuizScore(score);
  }, [answers, setQuizScore]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
  }, []);

  const correctCount = QUIZ_QUESTIONS.filter(q => answers[q.id] === q.correct).length;
  const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  const handleCopyChecklist = useCallback(async () => {
    const text = CHECKLIST_ITEMS.map((item, i) => `☐ ${item}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <ModuleCard moduleId="evaluacion" title="7. Evaluación Final + Checklist">
      <div className="space-y-8">
        <ConceptBox>
          <p>
            ¡Es hora de poner a prueba lo aprendido! Completa el quiz de 10 preguntas y obtén 
            tu puntuación. Al final encontrarás un checklist de buenas prácticas para descargar.
          </p>
        </ConceptBox>

        {/* Quiz Section */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-foreground">📝 Quiz: CSS Animations</h3>
          
          {showResults && (
            <div className={cn(
              "mb-6 rounded-xl p-6",
              score >= 80 ? "bg-success/10" : score >= 60 ? "bg-secondary/10" : "bg-destructive/10"
            )}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground">
                    {score >= 80 ? '🎉 ¡Excelente!' : score >= 60 ? '👍 ¡Buen trabajo!' : '📚 Sigue practicando'}
                  </h4>
                  <p className="text-muted-foreground">
                    Has acertado {correctCount} de {QUIZ_QUESTIONS.length} preguntas
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-foreground">{score}%</div>
                  <Progress value={score} className="mt-2 h-2 w-24" />
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((question, qIndex) => {
              const isCorrect = submitted && answers[question.id] === question.correct;
              const isWrong = submitted && answers[question.id] !== undefined && answers[question.id] !== question.correct;
              
              return (
                <div 
                  key={question.id}
                  className={cn(
                    "rounded-lg border p-4 transition-colors",
                    isCorrect && "border-success/50 bg-success/5",
                    isWrong && "border-destructive/50 bg-destructive/5",
                    !submitted && "border-border bg-card"
                  )}
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground">
                      <span className="mr-2 text-primary">{qIndex + 1}.</span>
                      {question.question}
                    </p>
                    {submitted && (
                      isCorrect 
                        ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        : <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                    )}
                  </div>
                  
                  <RadioGroup
                    value={answers[question.id]?.toString()}
                    onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                    disabled={submitted}
                  >
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2 py-1">
                        <RadioGroupItem 
                          value={oIndex.toString()} 
                          id={`q${question.id}-o${oIndex}`}
                          className={cn(
                            submitted && oIndex === question.correct && "border-success text-success",
                            submitted && answers[question.id] === oIndex && oIndex !== question.correct && "border-destructive text-destructive"
                          )}
                        />
                        <Label 
                          htmlFor={`q${question.id}-o${oIndex}`}
                          className={cn(
                            "cursor-pointer text-sm",
                            submitted && oIndex === question.correct && "font-medium text-success",
                            submitted && answers[question.id] === oIndex && oIndex !== question.correct && "text-destructive line-through"
                          )}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex gap-3">
            {!submitted ? (
              <Button 
                onClick={handleSubmit}
                className="gap-2"
                disabled={Object.keys(answers).length < QUIZ_QUESTIONS.length}
              >
                <CheckCircle2 className="h-4 w-4" />
                Enviar respuestas ({Object.keys(answers).length}/{QUIZ_QUESTIONS.length})
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reintentar quiz
              </Button>
            )}
          </div>
        </section>

        {/* Checklist Section */}
        <section>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-foreground">✅ Checklist de Buenas Prácticas</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyChecklist}
              className="gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
          
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
            <ul className="space-y-3">
              {CHECKLIST_ITEMS.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-background text-xs">
                    ☐
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TipBox title="¿Qué sigue?">
          <p>
            Ahora que dominas las animaciones CSS 2D, puedes explorar <strong>animaciones 3D</strong> con 
            <code>perspective</code> y <code>transform-style: preserve-3d</code>, o profundizar en 
            <strong>Web Animations API</strong> para control programático avanzado.
          </p>
        </TipBox>
      </div>
    </ModuleCard>
  );
}
