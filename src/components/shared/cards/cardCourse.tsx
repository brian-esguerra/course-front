import { FaStar, FaUser } from "react-icons/fa";

interface CardCourseProps {
  id: number;
  image: string;
  tag?: string;
  title: string;
  category: string;
  description: string;
  credits: string;
  teacher?: string;
}

export default function CardCourse({
  id,
  image,
  tag = "Featured",
  title,
  description,
  category,
  credits,
  teacher = "Detalle",
}: CardCourseProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden transform transition duration-500 hover:scale-102">
      <div className="relative">
        <a href={`/course/${id}`}>
        <img
          className="w-full h-45 object-cover"
          src={image}
          alt={title}
        />
        </a>
        {tag && (
          <div className="absolute top-0 right-0 bg-gray-200 text-gray-800 px-2 py-1 m-2 rounded-md">
            {tag}
          </div>
        )}
        <div className="absolute bottom-0 left-0 bg-[#690cc6] text-sm text-white px-2 py-1 ">
          {category}
        </div>
      </div>

      <div className="p-4 mb-auto">
        <a href={`/course/${id}`}>
          <h4 className="mb-2 text-gray-800 hover:text-[#690cc6]">{title}</h4>
        </a>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>

        <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <FaStar />
            <span class="ml-1">{credits} créditos</span>
          </span>

          <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <FaUser />
            <span class="ml-1">{teacher}</span>
          </span>
        </div>

    </div>
  );
}
