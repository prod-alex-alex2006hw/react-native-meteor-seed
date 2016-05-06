import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';

module.exports = React.createClass({
  render() {
    return (
      <View style={[styles.container, this.props.style || {}]}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.subtitle}>{this.props.subtitle}</Text>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: 'center',
    color: "white"
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: "white"
  }
})
