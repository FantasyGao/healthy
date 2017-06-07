'use strict';

import React, {
    Component } from 'react'
import{
	StyleSheet,
    Image,
    Text,
    View,
    InteractionManager
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Home from './Home.js'
import Tag from './Tag.js'
import Anwser from './Anwser.js'
import Personal from './Personal.js'

const HOME = 'home';
const HOME_TITLE = '主页';
const HOME_NORMAL = require('../images/tab_home.png');
const HOME_FOCUS = require('../images/tab_home_press.png');

const TAG = 'tag';
const TAG_TITLE = '标签';
const TAG_NORMAL = require('../images/tab_tag.png');
const TAG_FOCUS = require('../images/tab_tag_press.png');

const ANWSER = 'anwser';
const ANWSER_TITLE = '提问';
const ANWSER_NORMAL = require('../images/tab_write.png');
const ANWSER_FOCUS = require('../images/tab_write_press.png');

const PER = 'personal';
const PER_TITLE = '我的';
const PER_NORMAL = require('../images/tab_center.png');
const PER_FOCUS = require('../images/tab_center_press.png');

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
    }
    _renderTabItem(img, selectedImg, tag, tit,childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                title = {tit}
                selectedTitleStyle={styles.selectedTextStyle}
                titleStyle={styles.textStyle}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => {this.setState({ selectedTab: tag })}}>
                {childView}
            </TabNavigator.Item>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME,HOME_TITLE,<Home {...this.props}/>)}
                    {this._renderTabItem(TAG_NORMAL, TAG_FOCUS, TAG,TAG_TITLE,<Tag {...this.props}/>)}
                    {this._renderTabItem(ANWSER_NORMAL, ANWSER_FOCUS, ANWSER,ANWSER_TITLE,<Anwser {...this.props}/>)}
                    {this._renderTabItem(PER_NORMAL, PER_FOCUS, PER,PER_TITLE,<Personal {...this.props}/>)}
                </TabNavigator>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    head:{height:50,fontSize:26,padding:10,backgroundColor:'#F5F5D5'},
    tab: {
        height: 56,
        alignItems: 'center',
    },
    tabIcon: {
        width: 26,
        height: 26,
        resizeMode: 'stretch',
        marginTop: 12.5
    },
    textStyle:{
    color:'#999',
    },
    selectedTextStyle:{
        color:'black',
    }
});
