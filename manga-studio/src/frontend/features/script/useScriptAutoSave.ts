import { useEffect, useRef, useCallback } from "react";

interface UseScriptAutoSaveOptions {
  data: unknown;
  onSave: (data: unknown) => void | Promise<void>;
  intervalMs?: number;
}

export function useScriptAutoSave({ data, onSave, intervalMs = 30000 }: UseScriptAutoSaveOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  const save = useCallback(async () => {
    const serialized = JSON.stringify(data);
    if (serialized !== lastSavedRef.current) {
      await onSave(data);
      lastSavedRef.current = serialized;
    }
  }, [data, onSave]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, intervalMs, save]);
}
