import React from "react";

export default function Message({ type = "info", children }) {
  const base = "p-3 rounded text-sm";
  const cls =
    type === "error"
      ? "bg-red-100 text-red-800"
      : type === "success"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  return <div className={`${base} ${cls}`}>{children}</div>;
}
