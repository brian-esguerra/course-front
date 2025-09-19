interface CardListProps {
  title: string;
  price: string;
  desc: string;
}

export default function CardList({ title, price, desc }: CardListProps) {
  return (
    <div class="px-6 py-4 bg-white rounded-lg shadow">
      <div class="flex justify-between">
          <span class="font-semibold text-lg">{title}</span>
          <span class="text-gray-500">{price}</span>
      </div>
      <p class="text-gray-700">
        {desc}
      </p>
    </div>
  );
}
