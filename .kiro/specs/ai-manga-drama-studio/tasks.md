# 实施计划

## 基础阶段

- [ ] 1. 项目脚手架与开发环境搭建
- [x] 1.1 初始化Tauri 2 + React 19 + TypeScript项目
  - 使用create-tauri-app创建项目，配置React 19、TypeScript 5、TailwindCSS 4、shadcn/ui
  - 配置Vite构建、ESLint、Prettier
  - 项目可在本地`npm run tauri dev`启动并显示空白窗口
  - _Requirements: —_

- [x] 1.2 安装核心依赖与配置Zustand状态管理
  - 安装zustand、react-timeline-editor、@tauri-apps/api、@tauri-apps/plugin-fs、@tauri-apps/plugin-dialog、@tauri-apps/plugin-shell
  - 创建4个空store文件（projectStore、timelineStore、generationStore、accountStore）
  - 应用根组件可渲染，store可正常读写
  - _Requirements: —_

- [x] 1.3 Tauri后端基础结构与IPC通信验证
  - 创建src-tauri/src/main.rs，注册所有Tauri Commands占位
  - 创建commands/目录（project.rs、export.rs、backup.rs、system.rs）
  - 创建services/目录（ffmpeg_service.rs、storage_service.rs）
  - 前端通过@tauri-apps/api invoke调用后端command并收到响应
  - _Requirements: —_

- [x] 1.4 应用布局与导航框架
  - 创建主布局组件：顶部工具栏、左侧面板区、中央编辑区、右侧属性面板
  - 实现面板切换导航（剧本、分镜、角色、素材、模板、账户）
  - 应用启动后显示完整布局框架，面板可切换
  - _Requirements: —_

- [x] 1.5 核心类型定义与数据模型
  - 在各feature/types.ts中定义Project、Scene、Storyboard、Character、Asset、TimelineData、Track、Clip、GenerationTask等核心接口
  - 在services/generationService.ts中定义GenerationService、GenerationOrchestrator接口
  - TypeScript编译无错误，所有类型可被其他模块引用
  - _Requirements: 1.1, 2.1, 3.1, 5.1, 6.1_

## 核心阶段

- [ ] 2. 剧本编辑器与分镜拆解
- [x] 2.1 剧本文本编辑器
  - 实现ScriptEditor组件，支持文本输入、粘贴、实时编辑
  - 空剧本时显示提示信息而非空分镜
  - 编辑器可输入和显示剧本文本，空状态有明确提示
  - _Requirements: 1.1, 1.4_
  - _Boundary: ScriptEditor_

- [x] 2.2 分镜自动拆解与卡片展示
  - 实现剧本→分镜拆解逻辑：按场景标记和对话行拆解为Storyboard列表
  - 实现StoryboardPanel展示分镜卡片列表
  - 实现StoryboardCard展示画面描述、角色、对话、运镜建议
  - 输入剧本后自动生成分镜卡片列表，点击卡片展示详情
  - _Requirements: 1.1, 1.2, 1.5_
  - _Boundary: StoryboardPanel_

- [x] 2.3 分镜编辑与AI生成指令预览
  - 实现分镜画面描述编辑功能
  - 修改画面描述时实时更新generationPrompt字段
  - 角色选择下拉列表（角色库存在时）
  - 编辑分镜描述后指令预览区实时更新
  - _Requirements: 1.3, 2.4_
  - _Boundary: StoryboardPanel_

- [ ] 3. (P) 角色库管理
- [ ] 3.1 (P) 角色CRUD与参考图上传
  - 实现CharacterManager面板：角色列表、新增、编辑、删除
  - 实现CharacterForm：名称、外貌描述、风格标签、参考图上传
  - 参考图通过Tauri dialog选择文件，复制到项目assets目录
  - 可创建角色并上传参考图，角色列表实时更新
  - _Requirements: 2.1, 2.2_
  - _Boundary: CharacterManager_

- [ ] 3.2 (P) 角色与分镜关联及重新生成标记
  - 分镜中指定角色时自动注入参考图和外貌描述到生成指令
  - 修改角色外貌描述或参考图时标记所有关联分镜needsRegeneration=true
  - 修改角色后关联分镜显示"需重新生成"标记
  - _Requirements: 2.3, 2.6_
  - _Boundary: CharacterManager, StoryboardPanel_

- [ ] 4. (P) AI生成调度层
- [ ] 4.1 (P) GenerationService统一接口与Seedance适配器
  - 实现GenerationService接口和GenerationOrchestrator
  - 实现seedanceAdapter：调用即梦图片生成API
  - 实现generationStore管理队列状态
  - 可通过Orchestrator提交图片生成任务，队列状态正确流转
  - _Requirements: 3.1, 3.7_
  - _Boundary: GenerationOrchestrator_

- [ ] 4.2 (P) 生成队列管理与UI
  - 实现useGenerationQueue Hook：submitTask、cancelTask、retryTask
  - 实现GenerationQueue组件：队列进度、当前任务状态、预计剩余时间
  - 实现GenerationPanel：单分镜生成按钮、批量生成、结果展示
  - API错误/超时时标记失败并显示重试按钮
  - 队列UI实时展示任务状态，失败任务可重试
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_
  - _Boundary: GenerationOrchestrator_

- [ ] 4.3 (P) Kling视频生成适配器
  - 实现klingAdapter：调用快手Kling视频生成API
  - 以已生成图片为起始帧生成视频
  - 视频生成结果可保存到素材库
  - _Requirements: 3.2_
  - _Boundary: GenerationOrchestrator_

- [ ] 4.4 (P) MidJourney适配器与模型选择器
  - 实现midjourneyAdapter：通过第三方API中转调用MidJourney
  - 实现ModelSelector组件：展示可用模型列表，用户可选择
  - 生成结果标注所用模型名称
  - 用户可切换模型，生成结果标注模型来源
  - _Requirements: 3.7_
  - _Boundary: GenerationOrchestrator_

- [ ] 4.5 生成结果采纳与时间轴关联
  - 用户确认采纳生成结果后自动关联到分镜的selectedImageId/selectedVideoId
  - 采纳的视频结果自动添加到时间轴视频轨道
  - 采纳后分镜卡片更新缩略图，时间轴出现新片段
  - _Requirements: 3.8_
  - _Depends: 4.1, 5.1_
  - _Boundary: GenerationOrchestrator, TimelineEditor_

- [ ] 5. (P) 时间轴编辑器
- [ ] 5.1 (P) 多轨道时间轴基础
  - 基于react-timeline-editor定制TimelineEditor
  - 展示视频轨道、配音轨道、配乐轨道
  - 支持拖拽素材到时间轴，按分镜顺序自动排列
  - 时间轴显示3个轨道，拖拽素材后自动排列
  - _Requirements: 5.1, 5.2_
  - _Boundary: TimelineEditor_

- [ ] 5.2 (P) 片段编辑与间隙/重叠检测
  - 实现片段起止时间拖拽调整
  - 实现间隙和重叠的视觉标记（红色高亮）
  - 调整片段后预览画面实时更新
  - 片段间隙和重叠有红色标记，拖拽起止时间后预览更新
  - _Requirements: 5.3, 5.6_
  - _Boundary: TimelineEditor_

- [ ] 5.3 (P) 转场效果与背景配乐
  - 实现TransitionEditor：两个片段间添加转场效果
  - 实现背景配乐添加：独立轨道、音量调节、淡入淡出
  - 转场在预览中可见，配乐轨道可调节音量
  - _Requirements: 5.4, 5.7_
  - _Boundary: TimelineEditor_

- [ ] 5.4 预览播放器
  - 实现PreviewPlayer：基于Remotion Player实时预览
  - 同步播放视频和音频轨道内容
  - 播放位置与时间轴游标同步
  - 点击播放后视频和音频同步播放，游标跟随移动
  - _Requirements: 5.3, 5.5_
  - _Boundary: PreviewPlayer_

- [ ] 6. (P) 配音合成与对位
- [ ] 6.1 (P) 讯飞语音适配器与音色选择
  - 实现xfyunAdapter：调用讯飞语音合成API
  - 实现VoiceSelector：音色列表展示与试听
  - 角色对话为空时跳过配音生成
  - 音色列表可试听，空对话分镜自动跳过
  - _Requirements: 4.1, 4.4_
  - _Boundary: GenerationOrchestrator_

- [ ] 6.2 (P) ElevenLabs适配器与配音生成
  - 实现elevenLabsAdapter：调用ElevenLabs语音合成API
  - 实现VoicePanel：生成配音按钮、配音状态展示
  - 配音生成完成自动放置到时间轴配音轨道对应位置
  - 生成配音后时间轴配音轨道自动出现片段
  - _Requirements: 4.2, 4.3_
  - _Boundary: GenerationOrchestrator, TimelineEditor_

- [ ] 6.3 配音时长适配与旁白轨道
  - 调整分镜时长时自动调整配音片段播放速度
  - 旁白文本使用旁白音色生成并放置到独立音频轨道
  - 调整分镜时长后配音自动适配，旁白出现在独立轨道
  - _Requirements: 4.5, 4.6_
  - _Depends: 5.1_
  - _Boundary: TimelineEditor_

- [ ] 7. (P) 素材导入与素材库
- [ ] 7.1 (P) 本地素材导入
  - 实现AssetImporter：通过Tauri dialog选择本地文件
  - 支持PNG/JPG/WebP图片、MP4/WebM视频、MP3/WAV音频
  - 不支持的格式显示提示信息
  - 可选择并导入本地素材，不支持的格式有提示
  - _Requirements: 9.1, 9.5_
  - _Boundary: AssetLibrary_

- [ ] 7.2 (P) 素材库管理与预览
  - 实现AssetLibrary面板：素材缩略图网格展示
  - 视频素材生成缩略图预览
  - 素材可拖拽到分镜或时间轴
  - 素材库显示缩略图，可拖拽到时间轴
  - _Requirements: 9.2, 9.3, 9.4_
  - _Boundary: AssetLibrary_

- [ ] 8. (P) 导出成片
- [ ] 8.1 (P) Remotion视频渲染管线
  - 实现remotion/Root.tsx和MangaComposition.tsx
  - 将时间轴数据映射为Remotion Composition
  - Remotion可基于时间轴数据渲染帧序列
  - _Requirements: 6.2_
  - _Boundary: ExportEngine_

- [ ] 8.2 (P) FFmpeg导出与断点续传
  - 实现Tauri侧ffmpeg_service.rs：调用FFmpeg合成视频
  - 实现ExportDialog：分辨率/格式/帧率/画面比例选项
  - 实现ExportProgress：进度条展示
  - 导出失败时保留已渲染帧，支持续传
  - 导出完成显示文件路径和大小
  - 可选择参数导出MP4，失败后可续传
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - _Boundary: ExportEngine_

## 集成阶段

- [ ] 9. 模板库与账户额度
- [ ] 9.1 基础模板库
  - 实现3-5个预设模板（玄幻、都市、悬疑等）
  - 实现TemplateGallery：模板列表展示与选择
  - 选择模板后自动应用风格参数和示例剧本
  - 可保存当前项目为自定义模板
  - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - _Boundary: TemplateGallery_

- [ ] 9.2 用户账户与额度管理
  - 实现AccountPanel：注册/登录引导
  - 实现QuotaDisplay：剩余额度展示（图片次数、视频次数、配音时长）
  - 实现useQuotaGuard：额度不足时阻止生成并提示
  - 免费用户限制每日生成次数和1080P导出上限
  - 登录后显示额度，额度不足有购买提示
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  - _Boundary: AccountPanel_

- [ ] 10. 离线编辑与数据持久化
- [ ] 10.1 自动保存与本地持久化
  - 实现useAutoSave Hook：30秒debounce自动保存
  - 实现Tauri侧storage_service.rs：项目JSON文件读写
  - 异常退出后重启可恢复最近自动保存点
  - 编辑后30秒内项目文件自动更新
  - _Requirements: 1.6, 10.5_
  - _Boundary: ProjectStore_

- [ ] 10.2 离线检测与手动云备份
  - 实现useNetworkStatus Hook：检测网络状态
  - 网络断开时禁用AI生成和配音，显示网络状态提示条
  - 实现手动云备份：备份到云端/从云端恢复
  - 断网时AI功能禁用有提示，可手动备份和恢复
  - _Requirements: 10.1, 10.2, 10.3, 10.4_
  - _Boundary: ProjectStore, CloudBackup_

- [ ] 11. 全流程集成与端到端验证
- [ ] 11.1 全流程串联测试
  - 验证完整流程：新建项目→写剧本→拆分镜→创建角色→生成图片→生成视频→配音→时间轴调整→导出MP4
  - 修复流程中的集成问题
  - 完整流程可走通，导出MP4可正常播放
  - _Requirements: 1.1-1.6, 2.1-2.6, 3.1-3.8, 4.1-4.6, 5.1-5.7, 6.1-6.5_

- [ ] 11.2 角色不一致标记与素材混用验证
  - 验证AI生成结果角色不一致时手动标记功能
  - 验证本地导入素材与AI生成素材混用流程
  - 角色不一致可手动标记，导入素材可在时间轴中与AI素材混排
  - _Requirements: 2.5, 9.1-9.5_

- [ ] 11.3 离线场景与模板端到端验证
  - 验证离线编辑→恢复网络→AI生成流程
  - 验证模板选择→修改→生成→导出流程
  - 离线编辑后恢复网络可正常生成，模板流程可走通
  - _Requirements: 7.1-7.4, 10.1-10.5_
