# Contributing Guide

Thank you for improving this engineering documentation framework. Contributions should make the framework clearer, more reusable, more operationally useful, or safer for production teams.

## Contribution Standards

- Keep documents project-agnostic unless the document explicitly describes how to specialize it.
- Use precise, imperative language.
- Avoid vague advice when a concrete action, decision rule, checklist item, or example would help.
- Maintain consistent Markdown structure and heading hierarchy.
- Do not include empty sections, unresolved notes, or speculative claims.
- Update related documents when changing workflow, release, security, QA, or coding guidance.

## Local Workflow

1. Create a feature branch from the current integration branch.
2. Make focused documentation changes.
3. Review the full rendered Markdown for formatting issues.
4. Run repository checks when available.
5. Commit using Conventional Commits, such as `docs: improve release checklist`.
6. Push the branch and open a pull request.

## Pull Request Expectations

A pull request should include the reason for the change, files changed, affected workflows, validation performed, known limitations, and any follow-up recommendations.

## Documentation Style

Use active voice, short paragraphs, descriptive lists, and testable statements. Prefer measurable requirements over aspirational language.

## Review Criteria

Reviewers should verify accuracy, completeness, non-duplication, professional tone, cross-document consistency, and practical usefulness for a real engineering team.


## Operating Principles

- Prefer explicit decisions over implicit assumptions.
- Record evidence for important engineering claims.
- Keep source code, documentation, tests, and release notes synchronized.
- Treat security, accessibility, reliability, and maintainability as product features.
- When a command fails, capture the exact command, exit condition, and remediation path.
