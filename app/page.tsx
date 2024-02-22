import { BoardCard } from "~/src/components/board/BoardCard";
import { prisma } from "../src/db/prisma";
import BoardForm from "./boards/new/BoardForm";

export default async function Home() {
  const board = await prisma.board.findMany();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-bold">Board list</h1>
      <BoardForm />
      <ul className="flex flex-col gap-2">
        {board.map((board: any) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </ul>
    </div>
  );
}
