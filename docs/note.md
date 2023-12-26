### Color: 
https://colorhunt.co/palette/4f6f5273907286a789d2e3c8

### CSS
add in tsconfig.json: "jsxImportSource": "@emotion/react",

### Path
using "@/components"
- install: yarn add vite-tsconfig-paths --dev
- config in tsconfig.json: 
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
- import in vite.config.js:
  import { defineConfig } from 'vite';
  import tsconfigPaths from 'vite-tsconfig-paths';

  export default defineConfig({
    // Other Vite configurations...
    plugins: [tsconfigPaths()],
  });
