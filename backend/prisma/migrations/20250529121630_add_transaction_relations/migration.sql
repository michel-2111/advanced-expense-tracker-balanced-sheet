-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `assetId` INTEGER NULL,
    ADD COLUMN `equityId` INTEGER NULL,
    ADD COLUMN `liabilityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_liabilityId_fkey` FOREIGN KEY (`liabilityId`) REFERENCES `Liability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_equityId_fkey` FOREIGN KEY (`equityId`) REFERENCES `Equity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
