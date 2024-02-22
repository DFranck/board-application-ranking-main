import { Proposition } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../../src/db/prisma";
type Data = {
  proposition: Proposition;
};

const BodyScheme = z.object({
  title: z.string().min(1).max(255),
});

const QueryScheme = z.object({
  boardid: z.string().transform((id) => Number(id)),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  try {
    console.log(req.query);
    const query = QueryScheme.parse(req.query);
    const body = BodyScheme.parse(JSON.parse(req.body));

    const proposition = await prisma.proposition.create({
      data: {
        title: body.title,
        boardId: query.boardid,
        ip: String(Math.random()),
      },
    });

    res.status(201).json({ proposition });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.flatten() });
    }
    console.error(error);
    res.status(500).json({ error: "Une erreur serveur est survenue" });
  }
}
