import { forwardRef, type InputHTMLAttributes } from "react";

interface ConsentCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Required consent checkbox. forwardRef so react-hook-form `register` works. */
export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  function ConsentCheckbox({ label, error, id = "consent", ...props }, ref) {
    return (
      <div>
        <label htmlFor={id} className="flex items-start gap-2 text-sm text-slate-700">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
            aria-invalid={Boolean(error)}
            {...props}
          />
          <span>{label}</span>
        </label>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);
