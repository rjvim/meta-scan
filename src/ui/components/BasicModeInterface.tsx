import { h } from "preact";

export const BasicModeInterface = () => {
  return (
    <div className="basic-mode p-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic Mode</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        This is the basic view of MetaScan. Advanced features are disabled.
      </p>
    </div>
  );
};
