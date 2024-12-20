import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Tasks',
            headerStyle: {
              backgroundColor: '#f4f4f4',
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="task/[id]" 
          options={{
            title: 'Task Details',
            headerStyle: {
              backgroundColor: '#f4f4f4',
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="task/create" 
          options={{
            title: 'New Task',
            headerStyle: {
              backgroundColor: '#f4f4f4',
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}