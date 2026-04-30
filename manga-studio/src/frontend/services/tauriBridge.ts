import { invoke } from "@tauri-apps/api/core";

export async function greet(name: string): Promise<string> {
  const result = await invoke<{ message: string }>("greet", { name });
  return result.message;
}

export async function getExportStatus(): Promise<{ ready: boolean; message: string }> {
  return invoke("get_export_status");
}

export async function getBackupStatus(): Promise<{ last_backup: string; message: string }> {
  return invoke("get_backup_status");
}

export async function getSystemInfo(): Promise<{ os: string; arch: string; version: string }> {
  return invoke("get_system_info");
}
