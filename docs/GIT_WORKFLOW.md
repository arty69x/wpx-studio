# Git Workflow

## Principles

Git history should tell a clear story of intent, implementation, verification, and release. Branches isolate work, commits capture logical units, and pull requests create reviewable change sets.

## Daily Flow

1. Sync the integration branch.
2. Create a feature branch.
3. Make focused changes.
4. Run relevant checks.
5. Commit with a Conventional Commit message.
6. Push the branch.
7. Open a pull request.
8. Address review and QA feedback.
9. Squash, merge, or rebase according to repository policy.

## Commit Messages

Use `type(scope): summary` when helpful. Common types include `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`, `chore`, and `revert`.

## Pull Requests

Pull requests should include motivation, summary, files changed, screenshots for UI, commands run, test results, risks, rollback plan, and linked issues.

## Recovery

Use `git status`, `git log`, `git diff`, `git restore`, `git switch`, and `git reflog` to understand and recover state before making destructive changes.
