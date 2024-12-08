import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LinkOutlineButton({
  className = "",
  text,
  link,
}: {
  className?: string;
  text: string;
  link: string;
}) {
  return (
    <Button
      asChild
      variant={`outline`}
      className={`${className} border-myOrange text-sm font-medium text-myOrange hover:bg-lightOrange hover:text-myOrange`}
    >
      <Link href={link}>{text}</Link>
    </Button>
  );
}
