import { Button } from "@/components/ui/button";

interface ComponentProp {
  increaseFunction: () => void;
  decreaseFunction: () => void;
  count: number;
  type?: "cart";
  maxCount?: number;
}

export default function CountIncrement({
  increaseFunction,
  decreaseFunction,
  count,
  type,
  maxCount,
}: ComponentProp) {
  const isMaxReached = maxCount !== undefined && count >= maxCount;

  return (
    <div
      className={`flex items-center ${
        type ? "gap-1.5 sm:gap-3 px-2 py-1 sm:px-3 sm:py-2" : "gap-3 px-3 py-2"
      } border border-[#9F9F9F] rounded-[10px] w-fit`}
    >
      <Button
        className="py-1 px-2 h-fit bg-transparent hover:bg-lightOrange transition-all duration-300 text-black"
        onClick={decreaseFunction}
        disabled={count === 1}
      >
        -
      </Button>
      <p className="text-[13px] sm:text-base font-medium">{count}</p>
      <Button
        onClick={increaseFunction}
        disabled={isMaxReached}
        className="py-1 px-2 h-fit bg-transparent hover:bg-lightOrange transition-all duration-300 text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </Button>
    </div>
  );
}
