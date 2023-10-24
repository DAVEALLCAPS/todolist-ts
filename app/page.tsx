"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import TaskSummary from "@/components/TaskSummary";

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

  const toggleTaskCompletion = (taskId: number) => {
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

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded-md shadow-md w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">To Do List</h1>
        <TaskSummary tasks={tasks} clearCompletedTasks={clearCompletedTasks} />
        <TaskForm onAddTask={addTask} />
        <div className="space-y-2">
          {tasks.map((task) => (
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
  );
};

export default Home;
