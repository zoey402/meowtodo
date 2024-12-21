// app/task/[id].tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTaskContext } from '../../contexts/TaskContext';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, deleteTask } = useTaskContext(); 
  
  const task = tasks.find(t => t.id === id);

  const handleDelete = () => {
    deleteTask(id as string);
    router.back();
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={[
            styles.status,
            task.status === 'completed' ? styles.statusCompleted : styles.statusPending
          ]}>
            <Text style={[
              styles.statusText,
              task.status === 'completed' ? styles.statusCompletedText : styles.statusPendingText
            ]}>
              {task.status === 'completed' ? 'Completed' : 'In Progress'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.description}>{task.description}</Text>
        
        <Text style={styles.dateText}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => router.push(`/task/edit?id=${id}`)}
        >
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete} 
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusCompletedText: {
    color: '#2E7D32',
  },
  statusPendingText: {
    color: '#EF6C00',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
});