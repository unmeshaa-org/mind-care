import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  id: string;
  containerClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = '', containerClassName = '', ...rest },
  ref,
) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>
      <input ref={ref} id={id} className={`input mt-2 ${className}`.trim()} aria-invalid={!!error} {...rest} />
      {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
    </div>
  );
});

export default Input;
