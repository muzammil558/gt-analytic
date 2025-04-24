"use client";

import React from "react";

const ErrorComponent = ({ error, reset }: { error: Error; reset: any }) => {
  return (
    <div>
      <h1>Error: {error.message}</h1>

      <button onClick={reset}>Retry</button>
    </div>
  );
};

export default ErrorComponent;
