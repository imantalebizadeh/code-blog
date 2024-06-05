import prisma from "../db";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("خطای نامشخص, لطفا مجددا تلاش کنید");
  }
};
