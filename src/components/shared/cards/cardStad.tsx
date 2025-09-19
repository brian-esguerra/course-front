interface CardStadProps {
  title: string;
  number: string;
}

export default function CardStad({ title, number }: CardStadProps) {
  return (
    <div className="relative overflow-hidden bg-gray-100/50 rounded-lg shadow-2xl p-1">
      <div className="flex h-auto flex-col text-center justify-between rounded-md p-4">
        <div className="mt-0 lg:mt-2 space-y-2">
          <p className="text-md text-gray-500 ">{title}</p>
          <h1 className="font-bold text-[#690cc6]">{number}</h1>
        </div>
      </div>
    </div>
  );
}
