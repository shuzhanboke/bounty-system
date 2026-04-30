use serde::Serialize;

#[derive(Serialize)]
pub struct ExportStatus {
    pub ready: bool,
    pub message: String,
}

#[tauri::command]
pub fn get_export_status() -> ExportStatus {
    ExportStatus {
        ready: true,
        message: "导出引擎就绪".to_string(),
    }
}
