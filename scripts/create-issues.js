const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

// 配置信息
const config = {
  owner: "winterbang",
  repo: "myblog",
  postsDir: "./public/posts", // 博客文章所在目录
  token: "您的GitHub个人访问令牌"
};

// 创建GitHub API客户端
const octokit = new Octokit({
  auth: config.token
});

// 读取博客文章目录
const files = fs.readdirSync(config.postsDir);

// 为每篇文章创建Issue
async function createIssuesForPosts() {
  for (const file of files) {
    if (file.endsWith(".md") || file.endsWith(".mdx")) {
      const filePath = path.join(config.postsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      
      // 简单解析文章元数据(假设使用YAML front matter)
      const titleMatch = content.match(/title:\s*["']?(.*?)["']?\s*(\n|$)/);
      const title = titleMatch ? titleMatch[1] : path.basename(file, path.extname(file));
      
      const issueTitle = `Comments for: ${title}`;
      const issueBody = `这是为博客文章《${title}》创建的评论区。\n\n对应文件: ${file}`;
      
      try {
        // 检查是否已存在同名Issue
        const { data: issues } = await octokit.issues.listForRepo({
          owner: config.owner,
          repo: config.repo,
          labels: "blog-comments",
        });
        
        const existingIssue = issues.find(issue => issue.title === issueTitle);
        
        if (!existingIssue) {
          // 创建新Issue
          const { data: issue } = await octokit.issues.create({
            owner: config.owner,
            repo: config.repo,
            title: issueTitle,
            body: issueBody,
            labels: ["blog-comments"]
          });
          
          console.log(`Created issue #${issue.number} for "${title}"`);
          
          // 创建关联文件，存储issue ID和文章的映射关系
          fs.appendFileSync(
            "issue-map.json", 
            `${file.replace(/\.[^/.]+$/, "")}: ${issue.number}\n`
          );
        } else {
          console.log(`Issue already exists for "${title}" (#${existingIssue.number})`);
        }
      } catch (error) {
        console.error(`Error creating issue for "${title}":`, error);
      }
      
      // 避免触发GitHub API速率限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

createIssuesForPosts();