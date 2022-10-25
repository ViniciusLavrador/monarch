/*
  Warnings:

  - You are about to drop the `PropertyAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `Country` VARCHAR(191) NOT NULL,
    ADD COLUMN `State` VARCHAR(191) NOT NULL,
    ADD COLUMN `additionalAddressLine1` VARCHAR(191) NULL,
    ADD COLUMN `additionalAddressLine2` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `lat` DECIMAL(10, 6) NULL,
    ADD COLUMN `long` DECIMAL(10, 6) NULL,
    ADD COLUMN `number` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `PropertyAddress`;
