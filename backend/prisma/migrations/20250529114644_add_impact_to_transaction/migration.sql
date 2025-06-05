/*
  Warnings:

  - Added the required column `impact` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `impact` VARCHAR(191) NOT NULL;
