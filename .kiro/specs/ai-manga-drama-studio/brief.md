# Brief: AI漫剧工作室

## Problem
个人AI漫剧创作者需要使用5-6个不同工具（AI生图→AI生视频→配音→剪映剪辑→配乐）拼接完成一部漫剧，流程碎片化导致效率极低。剪映作为通用剪辑工具，不针对AI漫剧工作流优化，创作者需要大量手动操作（角色一致性维护、配音对位、分镜转场等），制作10分钟漫剧视频至少需要半天时间。

## Current State
- 剪映：通用短视频剪辑器，非AI漫剧专用，缺乏角色库、分镜编排、AI生成集成
- 巨日禄AI/漫剧助手/造梦专家：偏重AI生成，编辑能力弱
- 现状：创作者必须同时使用多个工具，手动搬运素材，重复劳动多

## Desired Outcome
一款AI漫剧专用的桌面创作工具，实现从剧本到成片的一站式流程，让个人创作者无需切换工具即可完成全流程制作，将10分钟漫剧的制作时间从半天缩短到1-2小时。

## Approach
Tauri桌面客户端 + React前端 + 云端AI API + 本地GPU预览。客户端专注流程编排和编辑体验，AI生成能力通过调用Seedance/Kling/MidJourney等云端API实现，本地GPU仅用于预览和轻量剪辑渲染。

## Scope
- **In**: 剧本编写与分镜生成、AI角色库管理、AI图片/视频生成调度、配音合成与对位、时间轴编辑、转场效果、导出成片、基础模板库
- **Out**: 真人视频剪辑、直播功能、社交/社区功能、移动端适配、企业级协作

## Boundary Candidates
- 剧本与分镜引擎：文字→结构化分镜→AI生成指令
- 角色一致性系统：角色库定义、风格锁定、跨帧一致性控制
- AI生成调度层：统一调用多个AI模型API，管理生成队列和结果
- 时间轴编辑器：视频/音频轨道编排、配音对位、转场
- 导出与发布：渲染成片、多格式导出

## Out of Boundary
- AI模型训练/微调（使用现有API）
- 真人视频处理
- 社交/社区平台
- 移动端App

## Upstream / Downstream
- **Upstream**: AI模型API（Seedance/Kling/MidJourney/ElevenLabs等）、Tauri框架
- **Downstream**: 未来可扩展协作功能、移动端预览、发布到短视频平台

## Existing Spec Touchpoints
- **Extends**: 无（全新项目）
- **Adjacent**: 无

## MVP优先级
- 全流程闭环：剧本→分镜→AI生图→AI生视频+时间轴→配音+对位→导出成片
- 角色库管理和模板库在MVP中简化实现

## AI模型策略
- 图片生成：多模型统一接入（即梦/Seedance、MidJourney、Stable Diffusion等），用户自选
- 视频生成：多模型统一接入（Seedance、Kling、Vidu等），用户自选
- 配音合成：多服务统一接入（讯飞、ElevenLabs、百度语音等），用户自选

## 素材策略
- 允许用户导入本地素材（图片/视频/音频）与AI生成素材混用

## 存储策略
- 本地优先，用户可手动上传备份到云端

## Constraints
- 技术栈：Tauri 2.x + React 18+ + TypeScript + TailwindCSS + shadcn/ui
- AI生成依赖云端API，需联网使用（编辑和预览可离线）
- 目标平台：Windows优先，后续支持macOS
- 个人创作者定价：基础功能免费，高级功能订阅+生成额度按量付费
- 中文界面优先
