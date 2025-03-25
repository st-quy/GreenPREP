import { GrammarIcon } from "@assets/images";

export default function GrammarHeader() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#F9F9F9] mb-6 sm:mb-8">
      <img
        src={GrammarIcon}
        alt="Grammar Icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain"
      />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black m-0">
        Grammar Test
      </div>
    </div>
  );
}
