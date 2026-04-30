// 存储服务 - 项目JSON文件读写
// MVP阶段占位实现

use std::path::PathBuf;

pub struct StorageService {
    base_dir: PathBuf,
}

impl StorageService {
    pub fn new(base_dir: PathBuf) -> Self {
        Self { base_dir }
    }

    pub fn ensure_project_dir(&self, project_id: &str) -> std::io::Result<PathBuf> {
        let dir = self.base_dir.join("projects").join(project_id);
        std::fs::create_dir_all(&dir)?;
        Ok(dir)
    }
}
