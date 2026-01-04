import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'css', title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  const lines = code.trim().split('\n');

  return (
    <div className="code-block group relative overflow-hidden rounded-lg border border-border">
      {title && (
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/10 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-mono text-primary">
            {language.toUpperCase()}
          </span>
        </div>
      )}

      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute right-2 top-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted/20 cursor-pointer"
          aria-label="Copiar código"
          type="button"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        <pre className="overflow-x-auto p-4 text-sm">
          <code className="font-mono">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 select-none text-muted-foreground/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code.trim()
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
