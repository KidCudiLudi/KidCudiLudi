type Props = {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
};

export default function AdminHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#F5EDE8]">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#3D2B1F]">{title}</h1>
        {subtitle && <p className="text-sm text-[#8B6F5E] mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-[#D4726A] hover:bg-[#C4625A] text-white font-medium px-5 py-2.5 rounded-full transition-colors text-sm shadow-sm"
        >
          + {action.label}
        </button>
      )}
    </div>
  );
}
