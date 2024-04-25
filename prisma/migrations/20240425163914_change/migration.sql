-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'professor');

-- DropIndex
DROP INDEX "User_username_key";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "major" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
