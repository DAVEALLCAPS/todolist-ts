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

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold">Task Summary</div>
      <div>Total Tasks: {totalTasks}</div>
      <div>Tasks Completed Today: {tasksCompletedToday}</div>
    </div>
  );
};

export default TaskSummary;
