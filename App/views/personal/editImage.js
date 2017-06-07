'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    Platform,
    TextInput,
    ToastAndroid,
} from 'react-native';

import ShortLineTwo from '../../component/ShortLineTwo';
import config from '../../config.js';

const URL = config.URL;

export default class ListViewBasics extends Component {
  constructor(props) {
      super(props);
      this.state={
//
        iconTo:''
      }
  }
  加载数据
  componentDidMount(){
    this.fetchData();
  }
  fetchData(){
    fetch(URL+'person_center?user='+this.props.userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.code==1){
        let listData = responseJson.data;
        if(listData.length==0) return;
        this.setState({
            icon:responseJson.data[0].icon
        });
      }else{
        (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
      }
   })
  }
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  resetSuccesAction(){
    fetch(URL+'edit_icon',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:this.props.userId,
          icon:this.state.iconTo,
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.code==1){
        this.setState({
            icon:this.state.iconTo
        });
		(Platform.OS === 'android') ? ToastAndroid.show("修改成功",ToastAndroid.SHORT) : '';
      }else{
        (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
      }
    })
  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <View style={{height:48,backgroundColor:'#51a1e6',flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                      style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                       <Image
                          style={{width:13,height:20}}
                          source={require('../../images/ic_center_back.png')}
                       />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>修改头像</Text>
                    </View>
                    <View style={{width:48,height:48}}/>
                </View>
                <View style={{flexDirection:'row',height:100,justifyContent:'center'}}>
                       <Image  style={{width:70,height:70,marginLeft:10,marginTop:15}} source={{uri:this.state.icon}}/>
                </View>
                <View style={{backgroundColor:'white',marginTop:13}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入头像地址"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               this.state.iconTo = text;
                            }}
                      />
                    </View>
                    <ShortLineTwo/>
                </View>
                <TouchableOpacity onPress={() => {this.resetSuccesAction()}}
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <Image source={require('../../images/logre/ic_login_btn.png')}
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white',backgroundColor:'rgba(1,1,1,0)'}}>完成</Text>
                    </Image>
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    }
});
