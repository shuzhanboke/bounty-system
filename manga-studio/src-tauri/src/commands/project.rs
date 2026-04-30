use serde::Serialize;

#[derive(Serialize)]
pub struct Greeting {
    pub message: String,
}

#[tauri::command]
pub fn greet(name: &str) -> Greeting {
    Greeting {
        message: format!("你好, {}! 欢迎使用AI漫剧工作室", name),
    }
}
