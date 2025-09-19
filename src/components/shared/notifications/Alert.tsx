import { FC } from "react";
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
}

const alertStyles: Record<AlertType, { bg: string; text: string; icon: JSX.Element }> = {
  success: {
    bg: "bg-green-200",
    text: "text-green-800",
    icon: <AiOutlineCheckCircle className="text-green-600 w-5 h-5 mr-3" />,
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800",
    icon: <AiOutlineCloseCircle className="text-red-600 w-5 h-5 mr-3" />,
  },
  warning: {
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    icon: <AiOutlineWarning className="text-yellow-600 w-5 h-5 mr-3" />,
  },
  info: {
    bg: "bg-blue-200",
    text: "text-blue-800",
    icon: <AiOutlineInfoCircle className="text-blue-600 w-5 h-5 mr-3" />,
  },
};

const Alert: FC<AlertProps> = ({ type = "info", message }) => {
  const { bg, text, icon } = alertStyles[type];

  return (
    <div
      className={`${bg} px-6 py-3 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg`}
    >
      {icon}
      <span className={text}>{message}</span>
    </div>
  );
};

export default Alert;
