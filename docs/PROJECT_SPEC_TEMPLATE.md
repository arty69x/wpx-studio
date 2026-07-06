# Project Technical Specification Template

Use this template for any new project before asking an agent to build the application.

## 1. Project Identity

- Project name:
- Repository:
- Product owner:
- Target users:
- Business goal:
- Current version:

## 2. Core Rules

Define non-negotiable architecture rules.

Example:

- Client-side only / backend allowed / hybrid
- Allowed services
- Prohibited services
- Data privacy constraints
- Deployment constraints

## 3. Tech Stack

- Framework:
- Language:
- UI library:
- Styling:
- State management:
- Database/storage:
- Testing:
- Deployment:

## 4. User Roles

List all users and permissions.

| Role | Description | Permissions |
|---|---|---|
| Admin | | |
| User | | |

## 5. Main User Flows

```text
Flow name:
Step 1 -> Step 2 -> Step 3 -> Result
```

## 6. Screens / Pages

| Screen | Purpose | Main Components |
|---|---|---|
| Dashboard | | |
| Settings | | |

## 7. Data Models

```ts
interface ExampleModel {
  id: string;
  createdAt: number;
  updatedAt: number;
}
```

## 8. Core Features

- Feature 1
- Feature 2
- Feature 3

## 9. Import / Export Requirements

- Import formats:
- Export formats:
- File naming:
- Folder structure:

## 10. Validation Rules

- Input validation
- File validation
- URL validation
- Size limits
- Permission checks

## 11. Error Handling

| Error | Cause | Recovery |
|---|---|---|
| EXAMPLE_ERROR | | |

## 12. Security Requirements

- Input sanitization
- Auth rules
- Secret handling
- Sandbox rules
- CSP rules
- Data protection rules

## 13. Performance Limits

- Max users:
- Max file size:
- Max records:
- Max request size:
- Target page load:

## 14. Testing Plan

- Unit tests
- Integration tests
- Build test
- Lint test
- Manual QA

## 15. Deployment Workflow

- Hosting:
- Branch strategy:
- Preview deployment:
- Production deployment:

## 16. MVP Phasing

| Phase | Scope | Acceptance |
|---|---|---|
| Phase 1 | | |
| Phase 2 | | |
| Phase 3 | | |

## 17. Acceptance Criteria

A feature is done when:

- Code is implemented.
- Type checks pass.
- Lint passes.
- Build passes.
- Tests pass where available.
- Documentation is updated.
- No prohibited architecture is introduced.
