import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(true);
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
              props.complete
                ? { backgroundColor: "#FFD52E" }
                : { backgroundColor: "transparent" },
            ]}
          >
            {props.complete ? (
              <Text
                style={{ fontSize: 12, textAlign: "center", color: "white" }}
              >
                ✔️
              </Text>
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>

        {toggleEdit ? (
          <TextInput
            autoFocus={true}
            style={styles.itemTextInput}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={() => handleEdit()}
          ></TextInput>
        ) : (
          <Text style={styles.itemText}>{props.text}</Text>
        )}
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={() => handleEdit()}>
          <View style={[styles.circular, { backgroundColor: "transparent" }]}>
            <Text style={{ color: "white", fontSize: 20 }}>
              {toggleEdit ? "✅" : "📝"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.deleteTask()}>
          <View style={[styles.circular, { backgroundColor: "transparent" }]}>
            <Text style={{ fontSize: 20 }}>❌</Text>
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
    borderColor: "#FFD52E",
    borderWidth: 3,
    borderRadius: 5,
    marginRight: 15,
    alignItems: "center",
  },
  itemText: {},
  itemTextInput: {},
  circular: {
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 5,
    alignItems: "center",
  },
});

export default Task;
