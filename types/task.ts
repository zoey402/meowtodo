export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Change Bedding',
    description: 'last changed on 2024-03-01',
    status: 'pending',
    createdAt: new Date('2024-03-19T10:00:00'),
    updatedAt: new Date('2024-03-19T10:00:00')
  },
  {
    id: '2',
    title: 'project setup',
    description: 'basic layout, navigation, and task list',
    status: 'pending',
    createdAt: new Date('2024-03-19T11:00:00'),
    updatedAt: new Date('2024-03-19T11:00:00')
  },
  {
    id: '3',
    title: 'grocery shopping',
    description: 'Fred Meyer, 99 Ranch Market, Costco',
    status: 'completed',
    createdAt: new Date('2024-03-18T09:00:00'),
    updatedAt: new Date('2024-03-19T15:00:00')
  }
];