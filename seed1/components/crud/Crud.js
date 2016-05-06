'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import {TransitionMotion, spring} from 'react-motion';

const presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};


export default React.createClass({
  getInitialState() {
    return {
      todos: [
        // key is creation date
        {key: 't1', data: {text: 'Board the plane', isDone: false}},
        {key: 't2', data: {text: 'Sleep', isDone: false}},
        {key: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
        {key: 't4', data: {text: 'Eat cheese and drink wine', isDone: false}},
        {key: 't5', data: {text: 'Go around in Uber', isDone: false}},
        {key: 't6', data: {text: 'Talk with conf attendees', isDone: false}},
        {key: 't7', data: {text: 'Show Demo 1', isDone: false}},
        {key: 't8', data: {text: 'Show Demo 2', isDone: false}},
        {key: 't9', data: {text: 'Lament about the state of animation', isDone: false}},
        {key: 't10', data: {text: 'Show Secret Demo', isDone: false}},
        {key: 't11', data: {text: 'Go home', isDone: false}},
      ],
      value: '',
      selected: 'all',
    };
  },
  getDefaultStyles() {
    const todos = this.state.todos.map(todo => ({...todo, style: {height: 0, opacity: 1}}));
    return todos;
  },
  getStyles() {
    const {todos, value, selected} = this.state;
    return todos.filter(({data: {isDone, text}}) => {
      return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
        (selected === 'completed' && isDone ||
        selected === 'active' && !isDone ||
        selected === 'all');
    })
    .map((todo, i) => {
      return {
        ...todo,
        style: {
          height: todo.data.isDone ? spring(20, presets.gentle) : spring(60, presets.gentle),
          opacity: todo.data.isDone ? spring(0.2, presets.gentle) : spring(1, presets.gentle),
          backgroundColor: spring('black', presets.gentle)
        }
      };
    });
  },
    willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  },

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  },
  handleDone(doneKey) {
    this.setState({
      todos: this.state.todos.map(todo => {
        const {key, data: {text, isDone}} = todo;
        return key === doneKey
          ? {key: key, data: {text: text, isDone: !isDone}}
          : todo;
      }),
    });
  },
  render(){
    return (
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <ScrollView>
                {styles.map(({key, style, data: {isDone, text}}) =>
                    <TouchableOpacity key={key} style={[style, baseStyles.row]} onPress={this.handleDone.bind(null, key)}>
                      <Text style={[baseStyles.text]}>{text}</Text>
                    </TouchableOpacity>
                  )}
            </ScrollView>
            }
          </TransitionMotion>
    )
  }
})

// <ScrollableTabView style={styles.container}>
//   <Items tabLabel="Payments" handleLogOut={this.props.handleLogOut} navigator={this.props.navigator} />
//   <View tabLabel="text"><Text>bla</Text></View>
// </ScrollableTabView>

const baseStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF"
  },
  row: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'blue'
  }
})
