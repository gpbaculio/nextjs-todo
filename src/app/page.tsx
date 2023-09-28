import React, { Suspense, use } from "react";

import Link from "next/link";

import { TodoItem } from "@/components";
import prisma from "./db";

export const dynamic = "force-dynamic";

async function getTodos() {
  "use server";
  return await prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

function App() {
  const todos = use(getTodos());

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <App />
    </Suspense>
  );
}
