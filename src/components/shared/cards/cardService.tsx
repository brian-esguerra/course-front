import { ReactNode } from "react";

interface CardServiceProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function CardService({ title, description, icon }: CardServiceProps) {
  return (
    <div className="relative overflow-hidden bg-gray-100/50 rounded-lg shadow-2xl p-1">
      <div className="flex h-[175px] md:h-[200px] flex-col text-center justify-between rounded-md p-4">
        <div className="self-center text-[#fff] bg-[#690cc6] rounded-full p-3">{icon}</div>
        <div className="mt-0 lg:mt-2 space-y-2">
          <h4 className="font-bold">{title}</h4>
          <p className="text-md text-gray-600 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
