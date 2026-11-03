# Property & Lease Management migration

## Storage

The app is local-first. IndexedDB database `condo-ledger` version 4 replaces the prior lightweight localStorage-only property list without deleting it. The legacy list is imported only if the IndexedDB `properties` store is empty.

| Store | Purpose |
|---|---|
| `properties` | Room metadata, current rental status, rent, notes and source flag |
| `tenants` | Tenant records, reserved for future normalization |
| `leases` | Historic/current leases; date-range overlap is rejected per room |
| `contractVersions` | Immutable draft text versions linked to a lease |
| `photos` | Original image Blob + metadata, category and cover flag |
| `statuses` | User-managed status name, color, order and enabled state |
| `statusHistory` | Each property status change with timestamp and note |
| `attachments` | PDF, DOCX or image Blob with optional property relationship |
| `settings` | Browser-local settings / handles |

## Data safeguards

- No files are stored as Base64 or in localStorage.
- A property can have many leases, photos and attachments.
- A room label alone does not create inferred tenant/rent/contract data. A508 and C424 are seeded only as review-needed room labels from the inventory.
- Full Backup creates a ZIP containing `backup.json` plus every photo/attachment Blob. Restore validates the backup format and merges by ID; it does not erase existing records.
- Lease intervals on the same room are rejected when they overlap unless an existing agreement is `Terminated`.

## Known browser constraint

The GitHub Pages URL uses a separate browser origin from `127.0.0.1`; browser-local data created on one origin does not automatically transfer to the other. Use Full Backup in the old origin and Restore in the GitHub Pages origin once during migration.
