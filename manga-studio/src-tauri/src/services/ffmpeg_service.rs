// FFmpeg服务 - 调用本地FFmpeg便携版进行视频合成与转码
// MVP阶段占位实现

pub struct FfmpegService {
    ffmpeg_path: String,
}

impl FfmpegService {
    pub fn new(ffmpeg_path: &str) -> Self {
        Self {
            ffmpeg_path: ffmpeg_path.to_string(),
        }
    }

    pub fn is_available(&self) -> bool {
        std::path::Path::new(&self.ffmpeg_path).exists()
    }
}
