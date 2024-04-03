-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_attendees" ("created_at", "email", "event_id", "id", "name") SELECT "created_at", "email", "event_id", "id", "name" FROM "attendees";
DROP TABLE "attendees";
ALTER TABLE "new_attendees" RENAME TO "attendees";
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");
CREATE TABLE "new_checks_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ateendee_id" INTEGER NOT NULL,
    CONSTRAINT "checks_in_ateendee_id_fkey" FOREIGN KEY ("ateendee_id") REFERENCES "attendees" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_checks_in" ("ateendee_id", "created_at", "id") SELECT "ateendee_id", "created_at", "id" FROM "checks_in";
DROP TABLE "checks_in";
ALTER TABLE "new_checks_in" RENAME TO "checks_in";
CREATE UNIQUE INDEX "checks_in_ateendee_id_key" ON "checks_in"("ateendee_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
