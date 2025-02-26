// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Post from '../Post.vue';
import Index from '@pages/Index.vue';

const posts = import.meta.glob('/public/posts/**/*.md')
const allowedGroup = []
Object.keys(posts).forEach(path => {
  const fs = path.split('/public/posts/')[1].split('/')
  if(fs.length > 1) {
    allowedGroup.push(fs[0])
  }
})
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/technical_notes',
    name: 'Technical',
    component: () => import('@pages/PostsIndex.vue'),
    meta: { template: '' },
  },
  {
    path: '/essay',
    name: 'Essay',
    component: () => import('@pages/PostsIndex2.vue'),
    meta: { template: '' },
  },
  {
    path: '/:group',
    component: () => import('@pages/PostsIndex.vue'),
    beforeEnter: (to, from, next) => {
      const group = to.params.group;
      if (allowedGroup.includes(group)) {
        next();
      } else {
        next({ ...to, matched: [] });
      }
    }
  },
  { 
    path: '/:post*',
    name: 'Post',
    component: Post,
    sensitive: false
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;