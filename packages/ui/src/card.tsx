"use client"

interface CardProps{
  title: string,
  children: React.ReactNode
}

export function Card({ title, children }: CardProps): JSX.Element {
  return (
    <div
      className="border p-6 rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
