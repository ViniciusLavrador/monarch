/*
  Warnings:

  - You are about to drop the column `Country` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Property` table. All the data in the column will be lost.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` DROP COLUMN `Country`,
    DROP COLUMN `State`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `placeID` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
