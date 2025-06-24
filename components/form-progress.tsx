import { CheckCircle } from "lucide-react"

interface FormProgressProps {
  currentStep: number
  steps: string[]
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${index <= currentStep ? "text-[rgb(0_154_204)]" : "text-black"}`}
          >
            <div
              className={`
              flex items-center justify-center w-4 h-4 rounded-full border-[2px] 
              ${
                index < currentStep
                  ? "bg-[rgb(0_154_204)] border-[rgb(0_154_204)]"
                  : index === currentStep
                    ? "border-[rgb(0_154_204)]"
                    : "border-black"
              }
            `}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <span className={index === currentStep ? "text-[rgb(0_154_204)] text-[10px] font-bold" : "text-black leading-[8px]  text-[10px] font-bold"}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className="ml-2 text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>

      <div className="md:hidden mt-4">
        <p className="text-center font-medium text-[rgb(0_154_204)]">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </p>
      </div>
    </div>
  )
}
