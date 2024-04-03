-- CreateTable
CREATE TABLE "checks_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ateendee_id" INTEGER NOT NULL,
    CONSTRAINT "checks_in_ateendee_id_fkey" FOREIGN KEY ("ateendee_id") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "checks_in_ateendee_id_key" ON "checks_in"("ateendee_id");
