import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
    // log: ['query', 'info', 'warn', 'error'],

});

export default prisma;