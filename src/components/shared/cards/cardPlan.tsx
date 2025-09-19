import { FaCheck } from "react-icons/fa";

interface CardPlanProps {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
}

export default function CardPlan({
  id,
  title,
  description,
  price,
  features,
  buttonText,
}: CardPlanProps) {
  return (
    <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-700">{description}</p>

      <div className="flex items-baseline justify-center my-5">
        <span className="mr-2 text-4xl font-extrabold">{price}</span>
      </div>

      <ul role="list" className="mb-8 space-y-1 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <FaCheck className="flex-shrink-0 w-5 h-5 text-green-500" />
            <span dangerouslySetInnerHTML={{ __html: feature }} />
          </li>
        ))}
      </ul>
      <a href={`/register?idPlan=${id}`}
        className="text-white bg-[#690cc6] hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-purple-900"
      >
        {buttonText}
      </a>
    </div>
  );
}
