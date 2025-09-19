import { ReactNode } from "react";

interface LabelProps {
  title: string;
  icon: ReactNode;
}

export default function Label({ title, icon }: LabelProps) {
  return (
    <div className="bg-gray-100s rounded flex px-2 h-full items-center">
      <div className="text-purple-800">{icon}</div>
      <span className="font-regular ml-2">{title}</span>
    </div>
  );
}
