"use client";
import { useAppContext } from "../AppContext";

export default function Toast() {
  const { toast } = useAppContext();

  if (!toast) return null;

  return (
    <div key={toast.id} className={`toast toast-${toast.tone}`}>
      {toast.text}
    </div>
  );
}
