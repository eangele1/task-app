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

  const handleCheckMark = (idx, isComplete) => {
    const arr = [...tasks];
    arr[idx] = { ...arr[idx], complete: isComplete };
    setTasks(arr);
  };

  const handleUpdate = (idx, newName) => {
    const arr = [...tasks];
    arr[idx] = { ...arr[idx], name: newName };
    setTasks(arr);
  };

  const handleDelete = (idx) => {
    const arr = [...tasks];
    arr.splice(idx, 1);
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
          onPress={() => {
            if (text !== "")
              setTasks((oldArray) => [
                ...oldArray,
                { name: text, complete: false },
              ]);
          }}
          title="Add Task"
        ></Button>

        <View style={styles.items}>
          {/* Tasks */}
          {/*<Task text={"Task 1"} />*/}
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <Task
                idx={index}
                handleCheckMark={handleCheckMark}
                complete={item.complete}
                updateTask={handleUpdate}
                deleteTask={() => handleDelete(index)}
                text={item.name}
              />
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
