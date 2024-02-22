"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "~/src/components/form/Bouton";
import { Input } from "~/src/components/form/Input";

type PropositionFormProps = {
  boardId: number;
};

export default function PropositionForm({ boardId }: PropositionFormProps) {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title"));

    fetch(`/api/boards/${boardId}/propositions`, {
      method: "POST",
      body: JSON.stringify({ title }),
    })
      .then((res) => {
        console.log("res", res);
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Unknown error");
          });
        }
        return res.json();
      })
      .then((data) => {
        router.refresh();
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(`Une erreur est survenue : ${error.message}`);
        } else {
          console.error("Erreur capturée:", error);
          alert(`Une erreur est survenue : ${JSON.stringify(error)}`);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Title" name="title" />
      <Button type="submit">Create proposition</Button>
    </form>
  );
}
