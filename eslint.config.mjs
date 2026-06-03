import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Also ignore nested build output and stale git worktrees so ESLint
    // doesn't lint generated Next.js chunks (e.g. .worktrees/*/.next/**).
    "**/.next/**",
    ".worktrees/**",
  ]),
]);

export default eslintConfig;
