
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: ['es2020'], // 提高目标以支持更多特性，如果需要
  },
});