import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl p-4">To Do List</h1>
      <div className="flex-col justify-center">
        <Input />
        <Button>Add Task</Button>
      </div>
    </main>
  );
}
