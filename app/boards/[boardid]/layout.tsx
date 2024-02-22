import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { prisma } from "~/src/db/prisma";
export default async function LayoutBoard({
  params,
  children,
}: PropsWithChildren<{
  params: { boardid: string };
}>) {
  const boardId = Number(params.boardid);
  if (isNaN(boardId)) return notFound();
  const board = await prisma.board.findUniqueOrThrow({
    where: { id: boardId },
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold">{board.title}</h2>
      {children}
    </div>
  );
}
