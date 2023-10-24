import React from "react";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
  createdAt: string;
  completedAt: string | null;
}

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (taskId: number) => void;
  onRemove: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleCompletion,
  onRemove,
}) => {
  return (
    <div
      className={`p-2 border rounded ${task.isComplete ? "bg-green-300" : ""}`}
    >
      <div
        className={`flex items-center justify-between ${
          task.isComplete ? "line-through text-gray-500" : "text-primary"
        }`}
      >
        <div>
          {task.text}
          <div className="text-xs text-gray-500">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </div>
          {task.isComplete && task.completedAt && (
            <div className="text-xs text-gray-500">
              Completed at: {new Date(task.completedAt).toLocaleString()}
            </div>
          )}
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => onToggleCompletion(task.id)}
            className="text-sm bg-green-500"
          >
            {task.isComplete ? "Undo" : "Complete"}
          </Button>
          <Button
            onClick={() => onRemove(task.id)}
            className="text-sm bg-red-500"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
