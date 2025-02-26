// Description: 用于解析 Frontmatter 的工具函数
import yaml from "js-yaml";
export function parseFrontmatter(content) {
  const regex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(regex);

  if (!match) {
    return { frontmatter: null, markdown: content }; // 如果没有找到 Frontmatter，返回原内容
  }
  const frontmatterString = match[1];

  // 将 Frontmatter 字符串转换为对象
  // const frontmatterLines = frontmatterString.split("\n");
  // const frontmatter = {};
  // frontmatterLines.forEach((line) => {
  //   const [key, ...value] = line.split(":");
  //   if (key) {
  //     frontmatter[key.trim()] = value.join(":").trim();
  //   }
  // });

  // 使用 js-yaml 解析 Frontmatter 字符串
  let frontmatter;
  try {
    frontmatter = yaml.load(frontmatterString);
  } catch (e) {
    console.error("Error parsing YAML Frontmatter:", e);
    frontmatter = {};
  }

  const markdown = content.slice(match[0].length).trim(); // 从匹配的长度切除 Frontmatter

  return { frontmatter, markdown };
}
