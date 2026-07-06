# Build Notes

## Required Checks

Run before commit when the environment allows:

```bash
npm install
npm run lint
npm run build
```

Run tests if available:

```bash
npm test
```

## Environment Failure Handling

If `npm install` fails due to npm registry/network/auth/firewall/403 policy:

- Do not remove required dependencies.
- Do not change architecture to bypass dependency installation.
- Record the exact npm error here.
- Continue work that does not require installed packages.

If `npm run lint` fails because dependencies are unavailable:

- Treat the root cause as dependency installation failure.
- Do not rewrite ESLint config unnecessarily.
- Confirm `package.json` contains the expected dependencies.

If `npm run build` fails because Next.js or other packages are unavailable:

- Treat the root cause as dependency installation failure.
- Do not remove Next.js.
- Do not add backend workarounds.

If `git push` fails because no origin remote exists:

```bash
git remote add origin https://github.com/arty69x/wpx-studio.git
git push -u origin <branch>
```

## Vercel

Feature branch pushes should create Preview Deployments automatically when the repository is connected to Vercel.

`main` should deploy Production only after an approved merge.

## 2026-07-06 Environment Blocker

Required validation was attempted for `feature/complete-wpx-studio` after implementing the client-side WPX Studio phases.

### Commands Run

```bash
npm install
```

Result: failed because the configured npm registry/policy returned:

```text
npm error code E403
npm error 403 403 Forbidden - GET https://registry.npmjs.org/@types%2ffile-saver
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
```

```bash
npm run lint
```

Result: failed because dependencies were not installed after the registry 403:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'eslint-config-next' imported from /workspace/wpx-studio/eslint.config.mjs
```

```bash
npm run build
```

Result: failed because dependencies were not installed after the registry 403:

```text
sh: 1: next: not found
```

No dependencies were removed and no backend workaround was introduced. The blocker is dependency installation access, not application architecture.

### Git Push Blocker

```bash
git push -u origin feature/complete-wpx-studio
```

Result: failed because no `origin` remote is configured in this checkout:

```text
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.
```

Repository inspection commands were run:

```bash
git status
git branch
git remote -v
```

Manual recovery commands for a maintainer with repository credentials:

```bash
git remote add origin https://github.com/arty69x/wpx-studio.git
git push -u origin feature/complete-wpx-studio
```
