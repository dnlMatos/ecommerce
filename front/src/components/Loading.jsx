import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div role="status">
        <button type="button" class="bg-blue-600 ..." disabled>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
          Carregando...
        </button>
      </div>
    </div>
  );
};
