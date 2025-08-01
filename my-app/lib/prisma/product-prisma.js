import prisma from './prisma';

export const getAllProduct = async () => {
  const payload = await prisma.product.findMany();
  return payload;
};