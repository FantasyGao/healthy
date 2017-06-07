'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';


export default class About extends React.Component {
  constructor(props) {
    super(props);
  }
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
          <View style={{height:48,backgroundColor:'#51a1e6',flexDirection:'row'}}>
                <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                  style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white'}}>返回</Text>
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>关于应用</Text>
                </View>
                <View style={{width:48,height:48}}/>
          </View>
          <View style={{alignItems:'center',marginTop:80}}>
             <Image source={require('../../images/start.jpg')} style={{width:110,height:110}}/>
             <Text style={styles.text_version}>版本:V1.0.0</Text>
          </View>
          <View style={{alignItems:'center',marginTop:10}}>
            <Text style={{fontSize:15,color:'black'}}>健康APP</Text>
          </View>
          <View style={{marginBottom:10,flex:1}}>
             <View style={styles.text_right}>
               <View style={{flexDirection:'row'}}>
                  <Text>开发者：</Text>
                  <Text style={{color:'#63B8FF'}}>高廷荣</Text>
               </View>
             </View>
          </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
   text_version:{
      color:'#ddd',
      marginTop:8
   },
   text_right:{
      alignSelf:'center',
      alignItems:'center',
      flex:1,
      justifyContent:'flex-end'
   }
});
