import "./Card.scss";

type CardParams = {
  children: any;
  type?: "outlined" | "solid" | "transparent" | "white";
  className?: string;
};

export function Card({ className, children, type }: CardParams) {
  return <div className={`card ${className ?? ""} ${type ?? "solid"}`}>{children}</div>;
}
