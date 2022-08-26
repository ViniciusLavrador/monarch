import { createRouter } from '../context';
import { z } from 'zod';

const PropertyTypeRouter = createRouter().mutation('create', {
  input: z.object({
    name: z.string(),
  }),
  async resolve({ ctx, input }) {
    return await ctx.prisma.propertyType.create({
      data: {
        name: input.name,
      },
    });
  },
});

export default PropertyTypeRouter;
