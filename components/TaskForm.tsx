import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle"; // Make sure to import ModeToggle

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = () => {
    onAddTask(task);
    setTask("");
  };

  return (
    <div className="flex space-x-2 mb-4">
      <ModeToggle /> {/* Add ModeToggle back in */}
      <Input value={task} onChange={handleInputChange} className="flex-grow" />
      <Button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow w-1/4"
      >
        Add Task
      </Button>
    </div>
  );
};

export default TaskForm;
