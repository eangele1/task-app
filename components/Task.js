import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [text, onChangeText] = useState("");

  const handleComplete = () => {
    props.handleCheckMark(props.idx, !props.complete);
  };

  const handleEdit = () => {
    if (toggleEdit) {
      if (text !== "") {
        props.updateTask(props.idx, text);
        //toggles editing mode
        setToggleEdit(!toggleEdit);
      }
    } else {
      //this changes the "text" state
      onChangeText(props.text);
      //toggles editing mode
      setToggleEdit(!toggleEdit);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={() => handleComplete()}>
          <View
            style={[
              styles.square,
              props.complete ? { opacity: 1 } : { opacity: 0.25 },
            ]}
          />
        </TouchableOpacity>

        {toggleEdit ? (
          <TextInput
            autoFocus={true}
            style={styles.itemTextInput}
            onChangeText={onChangeText}
            value={text}
          ></TextInput>
        ) : (
          <Text style={styles.itemText}>{props.text}</Text>
        )}
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={() => handleEdit()}>
          <View style={[styles.circular, { backgroundColor: "blue" }]}>
            <Text style={{ color: "white" }}>
              {toggleEdit ? "OK" : "Update"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteTask()}>
          <View style={[styles.circular, { backgroundColor: "red" }]}>
            <Text style={{ color: "white" }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  itemTextInput: {
    width: 150,
  },
  circular: {
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Task;
