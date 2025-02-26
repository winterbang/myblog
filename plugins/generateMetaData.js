import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { parseFrontmatter } from '../src/utils';
const publicDir = path.resolve(__dirname, "../public");
const dataDir = path.join(publicDir, "data");

const generateMetaData = () => {
  return {
    name: "generate-meta-data",
    buildStart() {
      // 读取 public/posts 目录下的文件数据
      const postsDir = path.join(publicDir, "posts");
      const files = fs.readdirSync(postsDir);

      // 递归读取目录结构
      const readDirectory = (dir) => {
        const result = [];
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const itemPath = path.join(dir, item);
          const stats = fs.statSync(itemPath);
          if (stats.isDirectory()) {
            // result.push({
            //   name: item,
            //   type: 'directory',
            //   children: readDirectory(itemPath)
            // });
            return
          } 
          const content = fs.readFileSync(itemPath, 'utf-8');
          const { frontmatter: meta } = parseFrontmatter(content);
          const createdAt = dayjs(stats.birthtime.toISOString()).format('YYYY/MM/DD');
          const updatedAt = dayjs(stats.mtime.toISOString()).format('YYYY/MM/DD');
          result.push({
            file_name: item,
            meta,
            type: 'file',
            size: `${(stats.size / 1024).toFixed(2)}KB`,
            createdAt,
            updatedAt
          });
          
        });
        return result;
      };

      files.forEach(file => {
        const filePath = path.join(postsDir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        if(isDirectory) {
          const data = readDirectory(filePath);
          // 将目录结构写入 JSON 文件
          const outputPath = path.join(dataDir, `${file}.json`);
          fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
          console.log(`Directory: ${file}`);
          return;
        }
        // const fileContent = fs.readFileSync(filePath, 'utf-8');
        // console.log(`Content of ${file}:`);
      });

      
      // const directoryStructure = readDirectory(postsDir);

      // // 将目录结构写入 JSON 文件
      // const outputPath = path.join(dataDir, "directoryStructure.json");
      // fs.writeFileSync(outputPath, JSON.stringify(directoryStructure, null, 2));
      // console.log("Directory structure written to:", outputPath);
    },
  };
};
export default generateMetaData;