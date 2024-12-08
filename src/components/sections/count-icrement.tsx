import { Button } from "@/components/ui/button";

export default function CountIncrement({
  increaseFunction,
  decreaseFunction,
  count,
  type,
}: ComponentProp) {
  return (
    <div
      className={`flex items-center ${
        type ? "gap-1.5 sm:gap-3 px-2 py-1 sm:px-3 sm:py-2" : "gap-3 px-3 py-2"
      } border border-[#9F9F9F] rounded-[10px] w-fit`}
    >
      <Button
        className="py-1 px-2 h-fit bg-transparent hover:bg-lightOrange transition-all duration-300 text-black"
        onClick={decreaseFunction}
        disabled={count === 1 ? true : false}
      >
        -
      </Button>
      <p className="text-[13px] sm:text-base font-medium">{count}</p>
      <Button
        onClick={increaseFunction}
        className="py-1 px-2 h-fit bg-transparent hover:bg-lightOrange transition-all duration-300 text-black"
      >
        +
      </Button>
    </div>
  );
}

interface ComponentProp {
  increaseFunction: () => void;
  decreaseFunction: () => void;
  count: number;
  type?: "cart";
}
