'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Platform,
  CameraRoll,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Navigator
} from 'react-native';

var Digits = require('react-native-fabric-digits');
var { DigitsLoginButton, DigitsLogoutButton } = Digits;

var groupByEveryN = require('groupByEveryN');
var logError = require('logError');

import Accounts from '../../config/db/accounts';
import Router from '../../config/router';

// Using _loggedOutEmitterSet property on global
// to prevent emitter being set multiple times
// TODO: Find more elegant solution
let __global = this;

var propTypes = {
  /**
   * The group where the photos will be fetched from. Possible
   * values are 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream'
   * and SavedPhotos.
   */
  groupTypes: React.PropTypes.oneOf([
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos',
  ]),

  /**
   * Number of images that will be fetched in one page.
   */
  batchSize: React.PropTypes.number,

  /**
   * A function that takes a single image as a parameter and renders it.
   */
  renderImage: React.PropTypes.func,

  /**
   * imagesPerRow: Number of images to be shown in each row.
   */
  imagesPerRow: React.PropTypes.number,

   /**
   * The asset type, one of 'Photos', 'Videos' or 'All'
   */
  assetType: React.PropTypes.oneOf([
    'Photos',
    'Videos',
    'All',
  ]),

};

export default React.createClass({
  componentWillMount() {
    if (!__global._loggedOutEmitterSet) {
      Accounts.emitter.on('loggedOut', ()=> {
        console.log('emit');
        this.props.navigator.resetTo(Router.getOnboarding())
      })
      __global._loggedOutEmitterSet = true;
    }
  },
  handlePress(route, rightButton) {
    this.props.navigator.push(route.route)
  },

   propTypes: propTypes,

    getDefaultProps: function(): Object {
        return {
        groupTypes: 'SavedPhotos',
        batchSize: 5,
        imagesPerRow: 1,
        assetType: 'Photos',
        renderImage: function(asset) {
            var imageSize = 150;
            var imageStyle = [styles.image, {width: imageSize, height: imageSize}];
            return (
            <Image
                source={asset.node.image}
                style={imageStyle}
            />
            );
        },
        };
    },

  getInitialState: function() {
    console.log('Seeding: props: ', this.props);
    let nav = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});

    return {
      assets: ([]: Array<Image>),
      groupTypes: this.props.groupTypes,
      lastCursor: (null : ?string),
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      dataSource: ds,
    };
  },
  rendererChanged: function() {
    var ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.state.dataSource = ds.cloneWithRows(
      groupByEveryN(this.state.assets, this.props.imagesPerRow)
    );
  },
  componentDidMount: function() {
    this.fetch();
  },
  componentWillReceiveProps: function(nextProps: {groupTypes?: string}) {
    if (this.props.groupTypes !== nextProps.groupTypes) {
      this.fetch(true);
    }
  },
  _fetch: function(clear?: boolean) {
    if (clear) {
      this.setState(this.getInitialState(), this.fetch);
      return;
    }

    var fetchParams: Object = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === "android") {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams)
      .then((data) => this._appendAssets(data), (e) => logError(e));
  },
  fetch: function(clear?: boolean) {
        if (!this.state.loadingMore) {
            this.setState({loadingMore: true}, () => { this._fetch(clear); });
        }
    },

  handlePressLogout() {
    console.log('Home: handlePressLogout')
    this.props.navigator.resetTo(Router.getOnboarding(this.props))
  },
  render() {
    return (
      <View style={styles.container}>
        <ListView
            renderRow={this._renderRow}
            renderFooter={this._renderFooterSpinner}
            onEndReached={this._onEndReached}
            style={styles.container}
            dataSource={this.state.dataSource}
        />
        <DigitsLogoutButton
            completion={this.handlePressLogout}
            text="Logout"
            buttonStyle={styles.DigitsAuthenticateButton}
            textStyle={styles.DigitsAuthenticateButtonText}/>
      </View>
    );
  },

  _rowHasChanged: function(r1: Array<Image>, r2: Array<Image>): boolean {
    if (r1.length !== r2.length) {
      return true;
    }

    for (var i = 0; i < r1.length; i++) {
      if (r1[i] !== r2[i]) {
        return true;
      }
    }

    return false;
  },

  _renderFooterSpinner: function() {
    if (!this.state.noMore) {
      return <ActivityIndicatorIOS style={styles.spinner} />;
    }
    return null;
  },

  // rowData is an array of images
  _renderRow: function(rowData: Array<Image>, sectionID: string, rowID: string)  {
    var images = rowData.map((image) => {
      if (image === null) {
        return null;
      }
      return this.props.renderImage(image);
    });

    return (
      <View style={styles.row}>
        {images}
      </View>
    );
  },

  _appendAssets: function(data: Object) {
    var assets = data.edges;
    var newState: Object = { loadingMore: false };

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.assets = this.state.assets.concat(assets);
      newState.dataSource = this.state.dataSource.cloneWithRows(
        groupByEveryN(newState.assets, this.props.imagesPerRow)
      );
    }

    this.setState(newState);
  },

  _onEndReached: function() {
    if (!this.state.noMore) {
      this.fetch();
    }
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
   subtitle: {
    textAlign: 'center',
  },
  DigitsAuthenticateButton: {
    height: 50,
    width: 230,
    backgroundColor: '#13988A',
    justifyContent: 'center',
    borderRadius: 5
  },
  DigitsAuthenticateButtonText: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
    url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});
