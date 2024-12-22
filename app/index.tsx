import { useState } from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TaskCard } from '../components/TaskCard';
import { useTaskContext } from '../contexts/TaskContext';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tasks, updateTask } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // handle toggle status
  const handleToggleStatus = (taskId: string): void => {
    updateTask(taskId, {
      status: tasks.find(t => t.id === taskId)?.status === 'completed' 
        ? 'pending' 
        : 'completed'
    });
  };

  // add search functionality
  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Search input */}
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#666" 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tasks..."
          placeholderTextColor="#999"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Task list */}
      <FlatList
        data={filteredTasks} 
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
  searchContainer: {
    margin: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#000',
  },
  list: {
    padding: 16,
    paddingTop: 8,
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