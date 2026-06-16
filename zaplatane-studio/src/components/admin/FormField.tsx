type InputProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
};

export function InputField({ label, type = 'text', value, onChange, placeholder, required, hint }: InputProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">{label}{required && ' *'}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
      />
      {hint && <p className="text-xs text-[#C9A96E] mt-1">{hint}</p>}
    </div>
  );
}

type SelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
};

export function SelectField({ label, value, onChange, options, required }: SelectProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">{label}{required && ' *'}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

type TextareaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
};

export function TextareaField({ label, value, onChange, placeholder, rows = 4, required }: TextareaProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-[#8B6F5E] font-medium block mb-1">{label}{required && ' *'}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full border border-[#F5EDE8] rounded-xl px-4 py-2.5 text-sm text-[#3D2B1F] outline-none focus:border-[#D4726A] transition-colors resize-none"
      />
    </div>
  );
}

export function ToggleField({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-[#3D2B1F]">{label}</p>
        {hint && <p className="text-xs text-[#C9A96E]">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-[#D4726A]' : 'bg-[#E8D5C4]'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export function FormActions({ onCancel, submitLabel = 'Zapisz' }: { onCancel: () => void; submitLabel?: string }) {
  return (
    <div className="flex gap-3 pt-4 border-t border-[#F5EDE8]">
      <button type="button" onClick={onCancel} className="flex-1 border border-[#E8D5C4] text-[#8B6F5E] py-3 rounded-full text-sm hover:border-[#D4726A] hover:text-[#D4726A] transition-colors">
        Anuluj
      </button>
      <button type="submit" className="flex-1 bg-[#D4726A] hover:bg-[#C4625A] text-white py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
        {submitLabel}
      </button>
    </div>
  );
}
