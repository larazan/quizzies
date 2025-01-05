/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categorystat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categorystat` DROP FOREIGN KEY `CategoryStat_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categorystat` DROP FOREIGN KEY `CategoryStat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `option` DROP FOREIGN KEY `Option_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_categoryId_fkey`;

-- DropIndex
DROP INDEX `CategoryStat_categoryId_fkey` ON `categorystat`;

-- DropIndex
DROP INDEX `Option_questionId_fkey` ON `option`;

-- DropIndex
DROP INDEX `Question_quizId_fkey` ON `question`;

-- DropIndex
DROP INDEX `Quiz_categoryId_fkey` ON `quiz`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categorystat` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `option` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `text` TEXT NOT NULL,
    MODIFY `questionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `question` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `text` TEXT NOT NULL,
    MODIFY `quizId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `quiz` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `email_verified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryStat` ADD CONSTRAINT `CategoryStat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryStat` ADD CONSTRAINT `CategoryStat_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
