"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  const { toast } = useToast(); // Use the useToast hook

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      toast({
        title: "Task Added",
        description: `Task "${task}" was successfully added to the list.`,
      });
      setTask("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div className="space-y-2 justify-items-center">
      <h1 className="text-3xl p-4">To Do List</h1>
      <div className="flex space-x-2">
        <Input value={task} onChange={handleInputChange} />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="space-y-2 mt-4">
        {tasks.map((task, index) => (
          <div key={index} className="p-2 border rounded">
            {task}
          </div>
        ))}
      </div>
    </div>
  );
}
