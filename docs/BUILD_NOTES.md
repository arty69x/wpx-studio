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
