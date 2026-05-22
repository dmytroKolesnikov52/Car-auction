import { useTranslation } from 'react-i18next';

export function PerPageSelect({
  perPage,
  setPerPage,
  setVisibleCount,
  setVisibleCountPagination,
  setStartIndex,
}: {
  perPage: string;
  setPerPage: React.Dispatch<React.SetStateAction<string>>;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  setVisibleCountPagination: React.Dispatch<React.SetStateAction<number>>;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm leading-tight text-white/80">
        {t('perPage.show')}
        <br />
        {t('perPage.page')}
      </span>

      <div className="relative group">
        <select
          value={perPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPerPage(e.target.value);
            setVisibleCount(value);
            setVisibleCountPagination(value);
            setStartIndex(0);
          }}
          className="
        appearance-none
        bg-white/5
        backdrop-blur-md
        border border-white/20
        rounded-xl
        px-5 py-2.5 pr-10
        text-white
        outline-none
        cursor-pointer
        transition-all duration-300
        hover:border-yellow-400/70
        hover:bg-white/10
      "
        >
          <option className="bg-black text-white">2</option>
          <option className="bg-black text-white">4</option>
          <option className="bg-black text-white">6</option>
        </select>

        <span
          className="
        pointer-events-none
        absolute right-3 top-1/2 -translate-y-1/2
        text-white/70
        transition-transform duration-300
        group-hover:rotate-180
        group-hover:text-yellow-400
      "
        >
          ▼
        </span>
      </div>
    </div>
  );
}
