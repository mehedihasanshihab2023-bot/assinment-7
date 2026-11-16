"use client";

import { Toaster } from "react-hot-toast";

/** react-hot-toast — adds data-rht-toaster attributes automatically. */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: '"Hind Siliguri", ui-sans-serif, system-ui, sans-serif',
          borderRadius: "10px",
          background: "#1f2937",
          color: "#fff",
        },
        success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
        error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
      }}
    />
  );
}
