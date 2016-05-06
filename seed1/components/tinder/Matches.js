'use strict';

import React, { StyleSheet, Text, View, Image, ListView, Dimensions} from 'react-native';
import MatchesDB from '../../config/db/matches';

let device = require('Dimensions').get('window');

export default React.createClass({
  getInitialState() {
    return {
      matches: []
    }
  },
  getDataSource(matches) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(matches);
  },
  componentWillMount() {
    MatchesDB.subscribe()
      .then(() => {
        MatchesDB.observe((matches) => {

          // Sort by yup vs. nope votes
          matches = matches.sort((a, b)=> {
            return (b.yupCount / (b.yupCount + b.nopeCount)) - (a.yupCount / (a.yupCount + a.nopeCount))
          })

          this.setState({
            matches: matches
          });
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  },
  renderRow(m) {
    let yupWidth = (device.width * m.yupCount) / (m.yupCount + m.nopeCount);
    let nopeWidth = (device.width * m.nopeCount) / (m.yupCount + m.nopeCount);

    return (
      <View ref={m.key} style={styles.row}>
        <View style={[styles.colorBlock, styles.nope, {width: nopeWidth , backgroundColor: m.key}]}>
          <Text style={styles.text}>{m.nopeCount > 0 ? m.nopeCount : null}</Text>
        </View>
        <View style={[styles.colorBlock, styles.yup, {width: yupWidth, backgroundColor: m.key}]}>
          <Text style={styles.text}>{m.yupCount > 0 ? m.yupCount : null}</Text>
        </View>
      </View>
    )
  },
  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.getDataSource(this.state.matches)}
        renderRow={this.renderRow}
      />
    )
  }
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5FCFF"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    height: 200
  },
  colorBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  yup: {
    opacity: 1
  },
  nope: {
    opacity: 0.5
  },
  text: {
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 20,
  }
})
