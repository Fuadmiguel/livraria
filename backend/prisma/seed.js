import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seu código para popular o banco de dados
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());