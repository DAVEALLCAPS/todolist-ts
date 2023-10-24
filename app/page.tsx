"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import TaskSummary from "@/components/TaskSummary";
import SearchBox from "@/components/SearchBox";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
  createdAt: string;
  completedAt: string | null;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();
  const [taskIdCounter, setTaskIdCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = (taskText: string) => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: taskIdCounter,
        text: taskText,
        isComplete: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      setTasks([...tasks, newTask]);
      setTaskIdCounter(taskIdCounter + 1);
      toast({
        title: "Task Added",
        description: `Task "${taskText}" was successfully added to the list.`,
      });
    }
  };

  const toggleTaskCompletion = (taskId: number): void => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            isComplete: !t.isComplete,
            completedAt: !t.isComplete ? new Date().toISOString() : null,
          }
        : t
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

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.isComplete);
    setTasks(updatedTasks);
    toast({
      title: "Completed Tasks Cleared",
      description: "All completed tasks have been removed.",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex w-full max-w-4xl p-6 rounded-md">
        <div className="flex flex-col w-1/3 space-y-4 pr-4 border-r">
          <h1 className="text-3xl font-bold mb-4">To Do List</h1>
          <TaskForm onAddTask={addTask} />
          <TaskSummary
            tasks={tasks}
            clearCompletedTasks={clearCompletedTasks}
          />
          <SearchBox value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="w-2/3 pl-4">
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleCompletion={toggleTaskCompletion}
                onRemove={removeTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
