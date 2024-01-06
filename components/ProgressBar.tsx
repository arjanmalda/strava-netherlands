import React, { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";

interface ProgressBarProperties
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentStep?: number;
  totalSteps?: number;
}

export const ProgressBar = ({
  currentStep = 0,
  totalSteps = 0,
}: ProgressBarProperties) => {
  const percentage = useMemo(
    () =>
      (currentStep / totalSteps) * 100 > 100
        ? 100
        : (currentStep / totalSteps) * 100,
    [currentStep, totalSteps]
  );

  const progressBarStyle = useMemo(() => {
    return { width: `${percentage}%`, transition: "all 0.2s ease" };
  }, [percentage]);

  return (
    <div className=" flex flex-col align-middle gap-1 justify-center w-full ">
      <div
        aria-valuemax={totalSteps}
        aria-valuemin={0}
        aria-valuenow={currentStep}
        className="bg-gray-200 h-4 w-full relative rounded-xl"
        role="progressbar"
      >
        <div
          style={progressBarStyle}
          className=" bg-green-300 h-4 absolute rounded-xl"
        />
      </div>
      <div className="w-full flex justify-center font-bold text-lg">
        {Math.round(percentage)}
        <span>%</span>
      </div>
    </div>
  );
};
