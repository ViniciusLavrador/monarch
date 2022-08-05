// src/server/db/client.ts
import { PrismaClient, Status } from '@prisma/client';
import { env } from '../../env/server.mjs';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Middleware
// SOFT DELETE RECORDS
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { status: Status.DELETED };
  }

  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data !== undefined) {
      params.args.data['status'] = Status.DELETED;
    } else {
      params.args['data'] = { status: Status.DELETED };
    }
  }

  return next(params);
});
