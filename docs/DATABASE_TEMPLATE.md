# Database Design Template

## Data Ownership

Define the business owner, technical owner, privacy classification, retention period, and deletion requirements for each data category.

## Entity Model

For every entity, document purpose, fields, types, nullability, defaults, constraints, indexes, relationships, lifecycle states, and audit fields.

## Relationships

Describe one-to-one, one-to-many, many-to-many, polymorphic, hierarchical, and external-reference relationships. Include cascade rules and deletion behavior.

## Migrations

Define migration naming, review, rollout, rollback, backfill, locking, zero-downtime safety, and data validation procedures.

## Indexing Strategy

Document query patterns, required indexes, uniqueness constraints, compound indexes, full-text search, and index maintenance cost.

## Transactions and Consistency

State transaction boundaries, isolation assumptions, idempotency rules, conflict handling, optimistic locking, and eventual consistency expectations.

## Backup and Recovery

Define backup frequency, retention, restore tests, point-in-time recovery, disaster recovery objectives, and responsibilities.

## Security

Define database credentials, least privilege, encryption, row-level security, tenant isolation, audit logs, and sensitive-field handling.

## Performance

Define query budgets, pagination, batch size, connection pooling, caching, archive strategy, and large-table operations.
