import { forwardRef, type TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  id: string;
  containerClassName?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className = '', containerClassName = '', ...rest },
  ref,
) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>
      <textarea ref={ref} id={id} className={`input mt-2 ${className}`.trim()} aria-invalid={!!error} {...rest} />
      {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
    </div>
  );
});

export default Textarea;
