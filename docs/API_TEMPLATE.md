# API Design Template

## API Overview

Describe the API purpose, consumers, protocol, authentication model, versioning strategy, base URLs, and compatibility guarantees.

## Resource Model

Define resources, identifiers, ownership, permissions, lifecycle states, and relationships.

## Endpoint Contract

For each endpoint, document method, path, purpose, authentication, authorization, request parameters, request body, response body, status codes, errors, idempotency, rate limits, and examples.

## Error Model

Define consistent error shape, user-safe message, developer diagnostics, correlation ID, validation details, retryability, and localization behavior.

## Security

Document authentication, authorization, input validation, output encoding, CSRF requirements, CORS policy, abuse protection, and sensitive data redaction.

## Pagination, Filtering, and Sorting

Define defaults, maximum page sizes, cursor rules, filter syntax, sorting options, and stability guarantees.

## Webhooks and Events

Define event names, payloads, signing, retries, ordering, idempotency, and failure handling.

## Testing

Specify contract tests, integration tests, negative tests, performance tests, authorization tests, and backward compatibility tests.
