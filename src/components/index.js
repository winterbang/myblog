// 自动导入所有组件
const components = import.meta.glob("./*.vue", { eager: true });

// 导出所有组件
export const componentsList = Object.entries(components).map(
  ([path, module]) => {
    const name = path.match(/\.\/(.*)\.vue$/)[1];
    return {
      name,
      component: module.default,
    };
  }
);

// 提供 install 方法供 Vue.use() 注册
export default {
  install: (app) => {
    componentsList.forEach(({ name, component }) => {
      app.component(name, component);
    });
  },
};
