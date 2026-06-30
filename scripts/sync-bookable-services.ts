import { PrismaClient } from "@prisma/client";
import {
  BARBER_SERVICE_LABELS,
  SALON_SERVICE_LABELS,
} from "../lib/bookable-services-catalog";

const prisma = new PrismaClient();

async function main() {
  await prisma.bookableService.deleteMany();

  for (const [index, label] of BARBER_SERVICE_LABELS.entries()) {
    await prisma.bookableService.create({
      data: { category: "barber", label, sortOrder: index },
    });
  }

  for (const [index, label] of SALON_SERVICE_LABELS.entries()) {
    await prisma.bookableService.create({
      data: { category: "hairdresser", label, sortOrder: index },
    });
  }

  console.log(
    `Synced ${BARBER_SERVICE_LABELS.length + SALON_SERVICE_LABELS.length} bookable services.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
