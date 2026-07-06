# End-to-End Build Checklist

Use this checklist when asking an agent to build a project in one run.

## Before Coding

- [ ] Read `AGENTS.md`
- [ ] Read `README.md`
- [ ] Read primary technical specification
- [ ] Read architecture documents
- [ ] Read build notes
- [ ] Confirm tech stack
- [ ] Confirm prohibited architecture
- [ ] Create feature branch

## Implementation

- [ ] Install dependencies when environment allows
- [ ] Create or verify folder structure
- [ ] Implement app shell
- [ ] Implement design system
- [ ] Implement core data types
- [ ] Implement main screens
- [ ] Implement state management
- [ ] Implement import / ingestion workflow
- [ ] Implement processing logic
- [ ] Implement preview or output workflow
- [ ] Implement persistence layer
- [ ] Implement export workflow
- [ ] Implement settings
- [ ] Implement error handling
- [ ] Implement security controls
- [ ] Implement responsive layout
- [ ] Implement tests where practical

## Verification

- [ ] Run `npm install`
- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Run `npm test` if available
- [ ] Fix all code errors
- [ ] Document environment blockers if any

## Git / PR

- [ ] Commit changes
- [ ] Push feature branch
- [ ] Open Pull Request
- [ ] Confirm Vercel Preview if connected
- [ ] Do not merge unless instructed

## Final Report

Agent final report must include:

- Summary
- Implemented modules
- Files changed
- Documentation updated
- Dependencies added
- Commands executed
- Build status
- Lint status
- Test status
- Deployment status
- Pull Request link
- Remaining TODOs
- Known blockers
- Next recommended improvements
