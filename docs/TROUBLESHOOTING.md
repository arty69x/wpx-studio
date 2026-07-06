# Troubleshooting Guide

## Git

Use `git status` to inspect working tree state, `git branch` to confirm the active branch, `git log --oneline --decorate --graph` to inspect history, `git diff` to review unstaged changes, `git restore` to discard specific file changes, and `git reflog` to recover lost commits. If push fails because no remote exists, run `git remote -v`, add the correct remote, and push the current branch.

## GitHub

If pull request creation fails, confirm the branch exists on GitHub, credentials are valid, repository permissions allow push, branch protection rules are satisfied, and required status checks are configured. For missing reviews, check CODEOWNERS and branch protection.

## Vercel

If deployment does not start, confirm the GitHub integration, project link, branch filters, build command, output settings, environment variables, framework preset, and team permissions. If deployment fails, inspect build logs, dependency installation logs, environment variable availability, and runtime compatibility.

## Node.js

If scripts fail, confirm the Node version, package manager, lockfile, environment variables, native build tools, and platform architecture. Use `node -v` and the project engine requirements to identify version drift.

## npm

For npm installation failures, inspect registry configuration, authentication, proxy settings, lockfile integrity, cache state, package policy, and network access. Use `npm config list`, `npm cache verify`, and exact error output to distinguish registry policy from dependency defects.

## pnpm

For pnpm issues, confirm `pnpm-lock.yaml`, workspace configuration, package manager version, store path, peer dependency warnings, and strictness settings. Use `pnpm install --frozen-lockfile` in CI when lockfile integrity is required.

## yarn

For Yarn issues, confirm whether the project uses Yarn Classic or Berry, inspect `.yarnrc.yml`, lockfile state, node linker mode, package extensions, and registry authentication.

## Next.js

For Next.js build issues, inspect server/client component boundaries, environment variable prefixes, route configuration, dynamic rendering choices, image configuration, middleware runtime, TypeScript errors, and dependency availability. Hydration errors usually indicate mismatched server and client render output.

## TypeScript

For TypeScript errors, inspect `tsconfig.json`, path aliases, module resolution, strictness settings, generated types, ambient declarations, and dependency type packages. Avoid solving type errors with broad casts unless the runtime invariant is documented.

## Tailwind

For missing styles, check content globs, Tailwind version, PostCSS configuration, class name construction, purge behavior, layer order, and global CSS imports. Dynamic class names must be represented in a way Tailwind can detect.

## React

For React issues, inspect component state ownership, hook dependency arrays, keys, memoization, context scope, effect cleanup, hydration behavior, and controlled versus uncontrolled inputs. Performance issues often come from unnecessary re-renders or unbounded lists.

## Electron

For Electron issues, verify main and renderer process separation, preload script paths, context isolation, IPC validation, Node integration settings, code signing, auto-update configuration, and platform-specific packaging requirements.

## Flutter

For Flutter issues, verify SDK version, platform tooling, package resolution, Gradle or Xcode configuration, device permissions, widget constraints, state management, and platform channel behavior. Use Flutter doctor output as environment evidence.

## Laravel

For Laravel issues, verify PHP version, Composer dependencies, `.env`, app key, caches, migrations, queues, storage symlinks, permissions, policies, middleware, and service providers. Clear caches intentionally with framework commands when configuration changes.

## NestJS

For NestJS issues, inspect module imports, provider scopes, dependency injection tokens, guards, interceptors, pipes, DTO validation, exception filters, environment configuration, and lifecycle hooks. Circular module dependencies should be removed or explicitly managed.

## Docker

For Docker issues, inspect build context, Dockerfile stages, base image architecture, environment variables, secrets, network access, volume mounts, file permissions, health checks, and container logs. Rebuild without cache when diagnosing stale layers.

## Windows

For Windows issues, check path separators, shell differences, execution policy, line endings, native build tools, long path support, antivirus interference, and WSL behavior.

## macOS

For macOS issues, check Xcode command-line tools, Homebrew paths, file permissions, code signing, Gatekeeper, architecture differences between Intel and Apple Silicon, and case-insensitive filesystem assumptions.

## Linux

For Linux issues, check package prerequisites, glibc or musl compatibility, file permissions, executable bits, system libraries, service users, SELinux or AppArmor policy, and distribution-specific package names.
