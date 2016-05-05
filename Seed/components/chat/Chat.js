'use strict';

// Example taken from https://github.com/FaridSafi/react-native-gifted-messenger
var React = require('react-native');
var {
  LinkingIOS,
  Platform,
  ActionSheetIOS,
  Dimensions,
  View,
  Text
} = React;

var GiftedMessenger = require('react-native-gifted-messenger');
var Communications = require('react-native-communications');
import NoData from '../shared/NoData';

import MessagesDB from '../../config/db/messages';
import Accounts from '../../config/db/accounts';

let MESSAGES_INTERVAL = 10;

export default React.createClass({
  getInitialState() {
    return {
      messages: [],
      totalMessageCount: 0
    }
  },
  componentWillMount() {
    MessagesDB.subscribe(0, MESSAGES_INTERVAL)
      .then(() => {
        MessagesDB.observe((messages) => {
          this.setState({
            messages: messages
          });
        });
      })
      .then(() => {
        return MessagesDB.messageCount();
      })
      .then((r) => {
        this.setState({
          totalMessageCount: r
        })
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  },
  getMessages() {
    let messages = this.state.messages;
    messages = messages
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      })
      .map((m) => {
        return {
          text: m.content,
          name: m.getUsername(),
          image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
          position: m.owner === this.props.user._id ? 'right' : 'left',
          date: m.createdAt
        }
      })
    return messages;
  },

  handleSend(message = {}, rowID = null) {

    return MessagesDB.insert({
      content: message.text
    })

    // Your logic here
    // Send message.text to your server

    // this._GiftedMessenger.setMessageStatus('Sent', rowID);
    // this._GiftedMessenger.setMessageStatus('Seen', rowID);
    // this._GiftedMessenger.setMessageStatus('Custom label status', rowID);
    // this._GiftedMessenger.setMessageStatus('ErrorButton', rowID); // => In this case, you need also to set onErrorButtonPress
  },

  // @oldestMessage is the oldest message already added to the list
  onLoadEarlierMessages(oldestMessage = {}, callback = () => {}) {

    MessagesDB.subscribe(this.state.messages.length, MESSAGES_INTERVAL)
      .then(()=> {
        callback([], false);
      })

    // Your logic here
    // Eg: Retrieve old messages from your server

    // newest messages have to be at the begining of the array
    // var earlierMessages = [
    //   {
    //     text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text',
    //     name: 'Developer',
    //     image: null,
    //     position: 'right',
    //     date: new Date(2014, 0, 1, 20, 0),
    //   }, {
    //     text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native',
    //     name: 'React-Native',
    //     image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
    //     position: 'left',
    //     date: new Date(2013, 0, 1, 12, 0),
    //   },
    // ];
    //
    // setTimeout(() => {
    //   callback([earlierMessages], false); // when second parameter is true, the "Load earlier messages" button will be hidden
    // }, 1000);
  },

  // will be triggered when the Image of a row is touched
  onImagePress(rowData = {}, rowID = null) {
    // Your logic here
    // Eg: Navigate to the user profile
  },

  render() {
    if (this.state.messages.length == 0) {
      return <NoData title="No messages yet." />
    }
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff',
          },
        }}

        autoFocus={false}
        messages={this.getMessages()}
        handleSend={this.handleSend}
        onErrorButtonPress={this.onErrorButtonPress}
        maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
        loadEarlierMessagesButton={ this.state.messages.length < this.state.totalMessageCount}
        loadEarlierMessagesButtonText={`Load earlier messages (${this.state.messages.length}/${this.state.totalMessageCount})`}
        onLoadEarlierMessages={this.onLoadEarlierMessages}

        senderName='Developer'
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}

        parseText={true} // enable handlePhonePress and handleUrlPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}

        inverted={true}
      />

    );
  },

  handleUrlPress(url) {
    if (Platform.OS !== 'android') {
      LinkingIOS.openURL(url);
    }
  },

  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ];
      var CANCEL_INDEX = 2;

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      });
    }
  },

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  },
});

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
// @todo check Navigator.NavigationBar.Styles.General.NavBarHeight
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);
