import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      // Torna as variáveis VITE_ disponíveis no cliente
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
      'import.meta.env.VITE_ACCESS_TOKEN_KEY': JSON.stringify(env.VITE_ACCESS_TOKEN_KEY),
      'import.meta.env.VITE_DEV': JSON.stringify(env.VITE_DEV),
      'import.meta.env.VITE_SWAGGER_PATH': JSON.stringify(env.VITE_SWAGGER_PATH),
    },
  };
});
