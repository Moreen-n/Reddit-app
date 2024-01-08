import { prisma } from "./prisma.js";

export async function countComments(post) {
  const comments = await prisma.post.findMany({
    where: {
      parentId: post.id,
    },
  });
  let ct = 0;
  for (const c of comments) {
    ct += await countComments(c);
  }
  if (post.parentId) {
    ct += 1;
  }
  return ct;
}
