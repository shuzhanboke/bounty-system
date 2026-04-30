use serde::Serialize;

#[derive(Serialize)]
pub struct BackupStatus {
    pub last_backup: String,
    pub message: String,
}

#[tauri::command]
pub fn get_backup_status() -> BackupStatus {
    BackupStatus {
        last_backup: "从未备份".to_string(),
        message: "云备份服务就绪".to_string(),
    }
}
