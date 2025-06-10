import { Video } from 'expo-av';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks(prev => [...prev, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/background.mp4')} 
        
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.heading}>My Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} color="#FF6F61" />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={[styles.task, item.completed && styles.completed]}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={item.completed ? styles.lineThrough : undefined}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: 'red' }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6F61',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    borderColor: '#FF6F61',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  task: {
    backgroundColor: '#FFF7E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completed: {
    backgroundColor: '#56CFE1',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: 'white',
  },
});
