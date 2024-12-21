import { View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TaskCard } from '../components/TaskCard';
import { useTaskContext } from '../contexts/TaskContext';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tasks, updateTask } = useTaskContext();

  const handleToggleStatus = (taskId: string) => {
    updateTask(taskId, {
      status: tasks.find(t => t.id === taskId)?.status === 'completed' 
        ? 'pending' 
        : 'completed'
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard 
            task={item}
            onPress={() => router.push(`/task/${item.id}`)}
            onToggleStatus={() => handleToggleStatus(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => router.push('/task/create')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  list: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});