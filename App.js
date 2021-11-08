import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, onChangeText] = useState("");

  const handleDelete = (id) => {
    //const arr = tasks.filter((item) => item.id !== id);
    const arr = [...tasks];
    arr.splice(id, 1);
    setTasks(arr);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button
          onPress={() => setTasks((oldArray) => [...oldArray, { name: text }])}
          title="Add Task"
        ></Button>

        <View style={styles.items}>
          {/* Tasks */}
          {/*<Task text={"Task 1"} />*/}
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <Task deleteTask={() => handleDelete(index)} text={item.name} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
  },
  items: {
    marginTop: 30,
  },
});
