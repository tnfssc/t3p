/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXPOSED_ENV: string;
  readonly UNEXPOSED_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
