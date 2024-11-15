# MarkToDown

Demonstration: [https://www.youtube.com/watch?v=pvTTrd6UrZY](https://www.youtube.com/watch?v=pvTTrd6UrZY)

## Reproduction

### Requirements

* PostgreSQL
* Next.js
* Node.js OR Bun runtime
* A JavaScript package manager

### Environment Variables

* `DATABASE_URL` - PostgreSQL database URL
* `NEXT_PUBLIC_BASE_URL` - Website address (required due to prerender failure with the `window` API)

### Migrating the Database

Run the following command:

```
bun drizzle-kit push
```
