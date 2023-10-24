import React from "react";
import { isToday } from "date-fns";
import { Button } from "./ui/button";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
  createdAt: string;
  completedAt: string | null;
}

interface TaskSummaryProps {
  tasks: Task[];
  clearCompletedTasks: () => void;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({
  tasks,
  clearCompletedTasks,
}) => {
  const totalTasks = tasks.length;
  const tasksCompletedToday = tasks.filter(
    (task) =>
      task.isComplete && task.completedAt && isToday(new Date(task.completedAt))
  ).length;

  const SummaryItem: React.FC<{ label: string; value: number }> = ({
    label,
    value,
  }) => (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );

  return (
    <div className="mb-4 flex flex-col items-center">
      <div className="flex justify-around w-full">
        <SummaryItem label="Total Tasks" value={totalTasks} />
        <SummaryItem
          label="Tasks Completed Today"
          value={tasksCompletedToday}
        />
      </div>
      {tasks.some((task) => task.isComplete) && (
        <Button
          onClick={clearCompletedTasks}
          className="bg-red-500 text-white px-4 py-2 rounded shadow mt-4"
        >
          Clear All Completed
        </Button>
      )}
    </div>
  );
};

export default TaskSummary;
