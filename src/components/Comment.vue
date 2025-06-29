<template></template>
<script setup>
const GH_API_URL = "https://api.github.com/repos/[YOUR-USERNAME]/[YOUR-REPO-NAME]";
const POST_ID = "[文章唯一标识符]"; // 可以是文章文件名、标题或自定义ID
const ISSUE_ID = "[对应的ISSUE-ID]"; // 如果已创建Issue，直接使用ID
function loadComments() {
  let commentsSection = document.getElementById("gh-comments-list");
  commentsSection.innerHTML = "<p>加载评论中...</p>";

  // 获取特定Issue的评论
  fetch(`${GH_API_URL}/issues/${ISSUE_ID}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      if (comments.length === 0) {
        commentsSection.innerHTML = "<p>暂无评论</p>";
        return;
      }

      let commentsList = "";

      comments.forEach(function (comment) {
        const date = new Date(comment.created_at);
        const formattedDate =
          date.toLocaleDateString("zh-CN") + " " + date.toLocaleTimeString("zh-CN");

        commentsList += `
          <div class="gh-comment">
            <div class="gh-comment-header">
              <img src="${comment.user.avatar_url}" alt="${
          comment.user.login
        }" width="24">
              <a href="${comment.user.html_url}" target="_blank">${comment.user.login}</a>
              <span>${formattedDate}</span>
            </div>
            <div class="gh-comment-body markdown-body">
              ${comment.body_html || comment.body}
            </div>
          </div>`;
      });

      commentsSection.innerHTML = commentsList;

      // 添加评论链接
      commentsSection.innerHTML += `
        <div class="gh-comments-footer">
          <a href="${GH_API_URL.replace("api.", "").replace(
            "/repos",
            ""
          )}/issues/${ISSUE_ID}" target="_blank">
            在GitHub上查看或发表评论
          </a>
        </div>`;
    })
    .catch((error) => {
      commentsSection.innerHTML = "<p>评论加载失败</p>";
      console.error(error);
    });
}

// 自动创建Issue（如果需要）
async function createIssueIfNeeded() {
  // 检查是否已存在标题匹配的Issue
  const response = await fetch(
    `${GH_API_URL}/issues?labels=blog-comments&creator=[YOUR-USERNAME]`
  );
  const issues = await response.json();

  const existingIssue = issues.find(
    (issue) => issue.title === `Comments for: ${POST_ID}`
  );

  if (existingIssue) {
    return existingIssue.number;
  } else {
    // 如果没有匹配的Issue，创建一个新的
    // 注意：这需要GitHub Token，应该在服务器端操作，这里仅作示例
    // 实际使用中，您可能需要预先创建Issue或使用后端服务来创建
    return null;
  }
}

loadComments();
</script>
