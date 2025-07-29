import { Progress } from "flowbite-react";
import { FaTruck, FaCheckCircle } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { BsBank } from "react-icons/bs";

interface CheckoutStepsProps {
  progress: number;
}

const steps = [
  { label: "Thông tin vận chuyển", icon: FaTruck },
  { label: "Xác nhận đơn hàng", icon: GiConfirmed },
  { label: "Thanh toán", icon: BsBank },
];

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ progress }) => {
  const currentStep = Math.ceil(progress / (100 / steps.length));

  return (
    <div className="relative px-4 py-4 max-w-4xl mx-auto mt-6">
      {/* Thanh tiến trình chính */}
      <Progress progress={progress} color="blue" className="h-2 rounded-full" />

      {/* Các bước (icon + label) */}
      <div className="absolute top-1 left-0 right-0 flex justify-between px-1">
        {steps.map(({ label, icon: Icon }, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < currentStep;
          const isCurrent = stepIndex === currentStep;

          return (
            <div key={index} className="flex flex-col items-center w-20">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mb-1
                  ${isCompleted ? "bg-blue-500 text-white border-blue-500" : ""}
                  ${isCurrent ? "border-blue-500 text-blue-500 bg-white" : ""}
                  ${!isCompleted && !isCurrent ? "border-gray-300 text-gray-400 bg-white" : ""}
                `}
              >
                {isCompleted ? <FaCheckCircle size={16} /> : <Icon size={16} />}
              </div>
              <span
                className={`text-[12px] text-center leading-tight ${
                  isCurrent ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
