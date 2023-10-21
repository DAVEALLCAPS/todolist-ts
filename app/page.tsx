"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const { toast } = useToast();
  const [taskIdCounter, setTaskIdCounter] = useState(0);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { id: taskIdCounter, text: task, isComplete: false },
      ]);
      setTaskIdCounter(taskIdCounter + 1);
      toast({
        title: "Task Added",
        description: `Task "${task}" was successfully added to the list.`,
      });
      setTask("");
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, isComplete: !t.isComplete } : t
    );
    setTasks(updatedTasks);

    const toggledTask = tasks.find((t) => t.id === taskId);
    if (toggledTask) {
      toast({
        title: toggledTask.isComplete
          ? "Task Marked Incomplete"
          : "Task Completed",
        description: `Task "${toggledTask.text}" has been marked as ${
          toggledTask.isComplete ? "incomplete" : "complete"
        }.`,
      });
    }
  };

  const removeTask = (taskId: number) => {
    const removedTask = tasks.find((t) => t.id === taskId);
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);

    if (removedTask) {
      toast({
        title: "Task Removed",
        description: `Task "${removedTask.text}" has been removed from the list.`,
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">To Do List</h1>
        <div className="flex space-x-2 mb-4">
          <Input
            value={task}
            onChange={handleInputChange}
            className="flex-grow"
          />
          <Button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow w-1/4"
          >
            Add Task
          </Button>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-2 border rounded ${
                task.isComplete ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              <span
                className={`flex items-center justify-between ${
                  task.isComplete
                    ? "line-through text-gray-500"
                    : "text-gray-700"
                }`}
              >
                {task.text}
                <div className="space-x-2">
                  <Button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="text-sm bg-green-500"
                  >
                    {task.isComplete ? "Undo" : "Complete"}
                  </Button>
                  <Button
                    onClick={() => removeTask(task.id)}
                    className="text-sm bg-red-500"
                  >
                    Remove
                  </Button>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
