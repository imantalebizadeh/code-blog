/*
  Warnings:

  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `_posttotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_posttotag` DROP FOREIGN KEY `_PostToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_posttotag` DROP FOREIGN KEY `_PostToTag_B_fkey`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `image`,
    ADD COLUMN `cover_image` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `_posttotag`;

-- DropTable
DROP TABLE `tags`;
