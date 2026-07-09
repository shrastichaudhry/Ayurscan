-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "medicinalUses" TEXT NOT NULL,
    "precautions" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionHistory" (
    "id" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "predictedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "PredictionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritePlant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "FavoritePlant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_scientificName_key" ON "Plant"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritePlant_userId_plantId_key" ON "FavoritePlant"("userId", "plantId");

-- AddForeignKey
ALTER TABLE "PredictionHistory" ADD CONSTRAINT "PredictionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionHistory" ADD CONSTRAINT "PredictionHistory_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePlant" ADD CONSTRAINT "FavoritePlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePlant" ADD CONSTRAINT "FavoritePlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
