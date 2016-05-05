'use strict';

// Example taken from https://github.com/meteor-factory/react-native-tinder-swipe-cards
import React, { StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import MatchesDB from '../../config/db/matches';

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const Cards = [
  {text: 'RED RED', backgroundColor: 'red'},
  {text: 'ppppppp', backgroundColor: 'purple'},
  {text: 'vegetarian', backgroundColor: 'green'},
  {text: 'sea', backgroundColor: 'blue'},
  {text: 'cyanara?', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

const Cards2 = [
  {text: 'lemon', backgroundColor: 'yellow'},
  {text: 'Moo Moo 5', backgroundColor: 'maroon'}
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    return MatchesDB.upvote(card.backgroundColor, true);
  },
  handleNope (card) {
    return MatchesDB.upvote(card.backgroundColor, false);
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'grey'
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
