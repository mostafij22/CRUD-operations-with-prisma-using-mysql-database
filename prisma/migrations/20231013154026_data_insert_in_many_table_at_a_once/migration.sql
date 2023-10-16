/*
  Warnings:

  - You are about to drop the column `fname` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `profile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `fname`,
    DROP COLUMN `lname`,
    DROP COLUMN `postCode`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL;
