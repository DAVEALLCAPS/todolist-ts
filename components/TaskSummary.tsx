import React from "react";
import { isToday } from "date-fns";

interface Task {
  id: number;
  text: string;
  isComplete: boolean;
  createdAt: string;
  completedAt: string | null;
}

interface TaskSummaryProps {
  tasks: Task[];
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ tasks }) => {
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
    <div className="mb-4 flex justify-around">
      <SummaryItem label="Total Tasks" value={totalTasks} />
      <SummaryItem label="Tasks Completed Today" value={tasksCompletedToday} />
    </div>
  );
};

export default TaskSummary;
