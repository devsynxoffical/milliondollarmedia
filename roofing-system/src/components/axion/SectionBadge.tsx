export function SectionBadge({
  num,
  label,
  dark = false,
}: {
  num: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold sm:h-7 sm:w-7 sm:text-[12px] ${
          dark ? "bg-white text-gray-900" : "bg-gray-900 text-white"
        }`}
      >
        {num}
      </span>
      <span
        className={`rounded-full border px-3 py-1 text-[12px] font-medium sm:px-4 sm:py-1.5 sm:text-[13px] ${
          dark ? "border-white/25 text-white" : "border-gray-200 text-gray-900"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
