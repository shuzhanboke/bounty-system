# 研究日志

## 摘要
AI漫剧工作室的技术发现与架构调研。核心发现：Tauri 2 + React 19 生态已成熟可用；视频渲染采用 Remotion 框架（React原生视频生成）；时间轴编辑器可基于 react-timeline-editor 定制；AI模型统一接入通过抽象 GenerationService 接口实现；本地视频导出通过 Tauri 侧调用 FFmpeg 实现。

## 研究日志

### 主题 1: Tauri 2 + React 桌面应用架构
- **来源**: Tauri官方文档、tauri-template
- **发现**: Tauri 2.x 已稳定，支持系统WebView渲染，包体<20MB；前端通过 @tauri-apps/api 与Rust后端通信；支持Tauri Commands（IPC）、Events（事件）、File System（文件系统）等核心能力
- **影响**: 架构选择确认，前端React + 后端Rust/Tauri Commands

### 主题 2: 视频时间轴编辑器
- **来源**: react-timeline-editor、React Video Editor (RVE)、Remotion Timeline
- **发现**: 
  - react-timeline-editor: 开源，轻量，支持多轨道、拖拽、缩放，适合定制
  - RVE Timeline: 商业组件，功能完整但闭源
  - Remotion: React原生视频渲染框架，支持程序化视频生成、实时预览、MP4导出
- **决策**: 采用 react-timeline-editor 作为时间轴UI基础 + Remotion 作为视频渲染引擎

### 主题 3: 视频导出方案
- **来源**: ffmpeg.wasm、Remotion、Tauri架构
- **发现**: 
  - ffmpeg.wasm: 纯浏览器端FFmpeg，但性能受限（WASM单线程约3-5x慢于原生）
  - Remotion: 自带渲染管线，支持本地FFmpeg渲染
  - Tauri侧调用本地FFmpeg: 性能最优，但需用户安装或内嵌
- **决策**: MVP使用Remotion渲染 + 内嵌便携版FFmpeg，避免WASM性能瓶颈

### 主题 4: AI模型统一接入
- **来源**: APIFrame等统一API服务、各模型官方API
- **发现**: 
  - 图片生成: 即梦/Seedance（字节）、MidJourney（需第三方API中转）、Stable Diffusion（自部署或Replicate）、Flux（开源高质量）
  - 视频生成: Seedance、Kling（快手）、Vidu（生数科技）
  - 配音: 讯飞（中文最佳）、ElevenLabs（多语言自然）、百度（便宜）
  - 统一接入模式: 定义 GenerationService 接口，每个模型实现 Adapter
- **决策**: 采用 Adapter 模式统一接入，MVP优先实现即梦+讯飞（国内延迟低）

### 主题 5: 数据持久化与离线
- **来源**: Tauri File System API、IndexedDB
- **发现**: 
  - Tauri提供 fs/path 插件访问本地文件系统
  - 前端可用 IndexedDB 存储项目元数据
  - 大文件（视频/音频素材）存本地文件系统，元数据存IndexedDB
- **决策**: 项目文件使用自定义JSON格式存储在本地，素材以原始格式存本地目录

## 设计决策

### 决策 1: 统一生成服务接口
- **选择**: GenerationService 泛化接口覆盖图片/视频/配音三种生成
- **理由**: 三种生成都是"输入参数→调用API→返回结果"的变体，统一接口减少重复代码
- **排除**: 为每种生成类型单独设计服务接口

### 决策 2: Remotion作为视频渲染引擎
- **选择**: Remotion框架
- **理由**: React生态原生集成，支持程序化视频生成、实时预览、时间轴映射
- **排除**: 纯Canvas渲染（开发量大）、ffmpeg.wasm（性能差）

### 决策 3: 本地FFmpeg导出
- **选择**: Tauri侧调用内嵌便携版FFmpeg
- **理由**: 性能最优，支持断点续传，Remotion渲染后FFmpeg合成
- **排除**: ffmpeg.wasm（性能差）、云端渲染（成本高、需上传大文件）

### 决策 4: MVP角色一致性策略
- **选择**: 参考图注入+手动标记，不做AI自动检测
- **理由**: AI自动检测角色偏差技术不成熟，MVP先做手动标记
- **排除**: 自动角色一致性评分检测

## 风险

1. **Remotion在Tauri WebView中的兼容性**: Remotion依赖浏览器API，需验证在Tauri WebView2中运行正常
2. **FFmpeg内嵌包体**: 便携版FFmpeg约80-100MB，会增加安装包大小
3. **AI模型API稳定性**: 第三方API可能变更或下线，需做好降级策略
4. **时间轴性能**: 大量视频片段时react-timeline-editor性能需测试
