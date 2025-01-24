-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `password` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenWhiteList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `refreshTokenId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolesOnUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Routes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` TEXT NULL,
    `driverId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sequence` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `priority` BOOLEAN NOT NULL DEFAULT false,
    `routeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolesOnUsers` ADD CONSTRAINT `RolesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolesOnUsers` ADD CONSTRAINT `RolesOnUsers_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Routes` ADD CONSTRAINT `Routes_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Drivers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Routes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;


INSERT INTO `Roles` (`id`, `name`) VALUES (1, 'admin');
INSERT INTO `Roles` (`id`, `name`) VALUES (2, 'customer');

INSERT INTO `User` (`id`, `email`, `firstName`, `lastName`,  `password`) VALUES (1, 'armank.17@gmail.com', 'Armando', 'Aliaga Saldaña', '8cc12f7adfffe3591d238849666eef0954b77587f6a660a60b41f57947dd9bf31d1bc6bf7e3c9af734716bcc343fab850284f82c9f6ddd1d8df1fb0666a8654d6a950acecf87e86071d1490da13df61ad6cf1b540a805e2da131a62dcc82befe767c97b256b0');

INSERT INTO `RolesOnUsers` (`id`, `userId`, `roleId`) VALUES (1, 1, 1);

INSERT INTO `Drivers` (`id`, `name`) VALUES (9, 'Eduardo B.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (10, 'José N.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (11, 'Mauricio J.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (12, 'Miguel T.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (13, 'Álvaro T.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (14, 'Juan D.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (15, 'Ariel F.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (16, 'Carlos M.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (17, 'Roberto R.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (18, 'Basilio M.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (19, 'Jorge G.');
INSERT INTO `Drivers` (`id`, `name`) VALUES (20, 'Felipe V.');