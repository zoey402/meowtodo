import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleStatus: () => void;
}

export function TaskCard({ task, onPress, onToggleStatus }: TaskCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onToggleStatus();
          }}
          style={styles.checkbox}
        >
          <Ionicons 
            name={task.status === 'completed' ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={task.status === 'completed' ? '#2E7D32' : '#666'}
          />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.title,
              task.status === 'completed' && styles.completedTitle
            ]} 
            numberOfLines={1}
          >
            {task.title}
          </Text>
          
          <Text style={styles.dateText}>
            {new Date(task.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
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
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
    padding: 4, 
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
});