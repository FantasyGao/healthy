import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  Platform
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
//引入主界面
import Home from './views/Start.js';

const {height, width} = Dimensions.get('window');
//相当于application,Navigatory一定要在应用启动的时候初始化
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  renderScene(route, navigator) {
   let Component = route.component;
   _navigator = navigator;
   return (
     <Component navigator={navigator} route={route} />
   );
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar
            barStyle='light-content'
            backgroundColor='transparent'
            style={{height: STATUS_BAR_HEIGHT}}
       />
       <Navigator
          ref='navigator'
          style={styles.container}
          // configureScene={(route) => {
          //   return Navigator.SceneConfigs.VerticalUpSwipeJump;
          // }}
          renderScene={
           (route,navigator)=>{
             let Component = route.component;
             return <Component {...route.params} navigator={navigator}/>
           }
         }
          initialRoute={{
            component: Home,
            name: 'Home'
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:height,
    width:width
  }
});
