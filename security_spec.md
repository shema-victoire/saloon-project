# Security Specification - Keza Glam Hub

## Data Invariants
1. **Services & Gallery**: Managed by Admin only. Public can only read.
2. **Contact Info**: Managed by Admin only. Public can only read.
3. **Bookings**:
    - Anyone can create a booking with status 'pending'.
    - Only Admin can read all bookings.
    - Only Admin can update booking status or delete bookings.
    - Client cannot modify a booking once created (in this current simple implementation).
    - `serviceId` must refer to an existing service (if possible to check in rules, but definitely must be a valid ID).
    - `createdAt` must be set to `request.time`.
    - `status` must be 'pending' on creation.

## The Dirty Dozen Payloads (Rejection Tests)

1. **Service Poisoning**: Public user tries to create a service.
2. **Gallery Overwrite**: Public user tries to delete a gallery image.
3. **Contact Hijack**: Public user tries to update salon phone number.
4. **Booking Status Escalation**: Client tries to create a booking with `status: 'confirmed'`.
5. **Booking ID Poisoning**: Client tries to use a 2KB string as booking ID.
6. **Booking Identity Spoofing**: Client tries to set `id` to someone else's booking ID (not applicable for create, but for update).
7. **Service Price Injection**: Public user tries to update a service price.
8. **Contact PII Leak**: Public user tries to list all data in a way that bypasses individual reads (though here it's simple).
9. **Booking Note Overflow**: Client tries to send a 1MB string in `notes`.
10. **System Field Mutation**: Client tries to set `createdAt` to a past date.
11. **Orphaned Booking**: Client tries to book a service that doesn't exist (if checked).
12. **Admin Spoofing**: User tries to write to `services` pretending to be admin.

## Test Runner logic (to be implemented in rules)
These will be validated by `firestore.rules`.
