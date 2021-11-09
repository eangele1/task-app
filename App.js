import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
      <View style={styles.tasksWrapper}>
        {/* Today's Tasks */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 24 }}>Today's Tasks</Text>
          <TouchableOpacity
            onPress={() =>
              setTasks((oldArray) => [
                ...oldArray,
                { name: text, complete: false },
              ])
            }
          >
            <Text style={{ fontSize: 20 }}>➕</Text>
          </TouchableOpacity>
        </View>

        {/* Tasks */}
        <View style={styles.items}>
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={false}
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
    backgroundColor: "#F9F9F9",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
});
