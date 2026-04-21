import clsx from "clsx";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, lede, align = "left", className }: Props) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="display-lg">{title}</h2>
      {lede && <p className="prose-editorial mt-6 text-granite/85">{lede}</p>}
    </div>
  );
}
