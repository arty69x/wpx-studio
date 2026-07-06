# Architecture Template

## Architecture Overview

Describe the system purpose, runtime model, deployment model, architectural style, primary modules, and main data flows.

## System Context

Identify users, client applications, backend services, external systems, databases, queues, object stores, identity providers, monitoring systems, and deployment platforms.

## Runtime Boundaries

Define what runs in the browser, server, worker, mobile client, desktop shell, edge runtime, background job, database, and third-party service.

## Module Boundaries

Describe each module, its responsibilities, inputs, outputs, dependencies, public interfaces, and ownership. State which modules must not depend on each other.

## Data Flow

Document request flows, event flows, import/export flows, background processing, cache behavior, persistence, and failure recovery.

## Security Architecture

Explain authentication, authorization, session management, secrets, encryption, input validation, output encoding, audit logging, tenant isolation, and abuse prevention.

## Scalability and Reliability

Describe expected load, scaling strategy, bottlenecks, rate limits, retry policies, circuit breakers, queues, timeouts, and disaster recovery.

## Observability

Define logs, metrics, traces, dashboards, alerts, correlation IDs, business events, and error reporting.

## Dependency Policy

Explain dependency selection criteria, update cadence, allowed licenses, replacement strategy, and ownership.

## Architectural Decisions

Record major decisions with context, options considered, decision, consequences, and date.

## Prohibited Patterns

List patterns the project must not use, such as bypassing authorization, mixing presentation with persistence, unbounded retries, hidden network calls, global mutable state, or undocumented background work.
