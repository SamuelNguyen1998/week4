import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView
} from "react-native";

import Constants from "expo-constants";
import TodoItem from "../components/TodoItem";

import { TODOS } from "../utils/data.js";

export default class AllScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: TODOS,
      todoBody: ""
    };
  }

  onToggleTodo = id => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    todo.status = todo.status === "Done" ? "Active" : "Done";
    const foundIndex = this.state.todoList.findIndex(todo => todo.id === id);
    this.state.todoList[foundIndex] = todo;
    const newTodoList = [...this.state.todoList];
    this.setState({ todoList: newTodoList });

    setTimeout(() => {
      this.props.navigation.navigate("SingleTodo", {
        updatedTodo: todo
      });
    }, 100);
  };

  onDeleteTodo = id => {
    const newTodoList = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: newTodoList });
  };

  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.todoBody,
      status: "Active",
      id: this.state.todoList.length + 1
    };
    const newTodoList = [...this.state.todoList, newTodo];
    this.setState({todoList: newTodoList});
    this.setState({todoBody: ""});
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/images/wallpaper.jpg")}
      >
        <View
          style={{ flex: 1, width: "90%", paddingTop: 10, paddingBottom: 10 }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              value={this.state.todoBody}
              style={styles.todoInput}
              onChangeText={text => this.setState({ todoBody: text })}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 7}}>
          <View style={{ flex: 1, padding: 10 }}>
            <ScrollView
              style={{ flex: 1, backgroundColor: "rgba(177, 150, 128, 0.5)", borderRadius: 20, padding: 10 }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: 'white', fontSize: 30}}>Todo List</Text>
              </View>
              <View style={{ flex: 6, paddingBottom: 30 }}>
                {this.state.todoList.map((todo, idx) => {
                  return (
                    <TodoItem
                      idx={idx}
                      todo={todo}
                      key={todo.body}
                      onToggleTodo={this.onToggleTodo}
                      onDeleteTodo={this.onDeleteTodo}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

AllScreen.navigationOptions = {
  //title: "All todos"
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: "black",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: "95%",
    color: "white",
    borderRadius: 5,
    flexWrap: "wrap"
  },
  todoText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  todoInput: {
    width: "95%",
    minHeight: 30,
    color: "white",
    borderWidth: 1,
    //marginTop: "20%",
    //marginBottom: "5%",
    borderColor: "grey"
  },
  inputContainer: {
    //flex: 1,
    width: "90%",
    //marginTop: 20,
    //marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center"
    //marginBottom: 100
  },
  button: {
    height: 50,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});
