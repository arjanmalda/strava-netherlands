import React, { ReactNode } from "react";

interface Properties {
  label?: ReactNode | string;
  active: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SwitchToggle = ({ label, active, onChange }: Properties) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChange}
        defaultChecked={active}
      />
      <div
        className={`w-8 h-4  peer-focus:ring-blue-400 rounded-full peer ${
          active ? "bg-green-100" : "bg-red-50"
        } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] ${
          active ? "after:left-[8px]" : "after:left-[5px]"
        } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all border-gray-600 peer-checked:bg-blue-600`}
      />
      {typeof label === "string" ? (
        <span className={`ml-1 font-medium text-gray-950`}>{label}</span>
      ) : (
        label
      )}
    </label>
  );
};
