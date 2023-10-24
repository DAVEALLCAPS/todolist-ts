import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = () => {
    if (task.trim() !== "") {
      onAddTask(task.trim());
      setTask("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <ModeToggle />
      <div className="flex space-x-2">
        <Input
          placeholder="Enter task..."
          value={task}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Add Task
        </Button>
      </div>
      <span className="text-xs text-gray-500 text-center">
        Ctrl+Enter to submit
      </span>
    </div>
  );
};

export default TaskForm;
