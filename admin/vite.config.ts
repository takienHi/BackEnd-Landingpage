import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const fullReloadAlways: PluginOption = {
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  },
} as PluginOption;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadAlways],
  resolve: {
    alias: [
      {
        // "@": path.resolve(__dirname, "./src"),
        find: 'src',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});
