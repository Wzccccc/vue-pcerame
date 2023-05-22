/**
 * feat: 新功能
 * fix: 修补某功能的bug
 * docs: 文档变更
 * style: 仅样式改动
 * refactor: 重构某个功能(不包括 bug 修复,功能新增)
 * perf: 性能优化
 * test: 添加测试
 * build 修改项目构建系统
 * ci: 修改 CI 配置,脚本等
 * chore: 构建过程或辅助工具的变动
 * revert: 回滚 commit
 * wip: 正在开发中
 * workflow: 工作流程改进
 * types: 类型定义文件修改
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert", "wip", "workflow", "types"]
    ]
  }
};
