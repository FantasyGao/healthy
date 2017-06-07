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
    TextInput,
    ToastAndroid,
    Platform,
} from 'react-native';

import ShortLineTwo from '../component/ShortLineTwo';
import config from '../config.js';

const URL = config.URL;

var password = '';
var newpassword = '';
var renewpassword = '';
var flag =false;

class Login extends Component {
  constructor(props) {
      super(props);
}
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  resetSuccesAction(){
       const {navigator} = this.props;
       //用户注册
       if(password === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('原密码不能为空...',ToastAndroid.SHORT) : '';
               return;
        }
       if(newpassword === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('新密码不能为空...',ToastAndroid.SHORT) : '';
               return;
        }
        if(newpassword != renewpassword){
                (Platform.OS === 'android') ? ToastAndroid.show('两次密码输入不一致...',ToastAndroid.SHORT) : '';
                return;
         }
        if(flag){return}
        flag=true;
        fetch(URL+'edit_password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user:this.props.userId,
              password:password,
              newpassword:newpassword
            })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        flag=false;
        if(responseJson.code==1){
          (Platform.OS === 'android') ? ToastAndroid.show('修改成功',ToastAndroid.SHORT) : '';
          InteractionManager.runAfterInteractions(() => {
            navigator.pop();
          });
        }else{
          (Platform.OS === 'android') ? ToastAndroid.show(responseJson.text,ToastAndroid.SHORT) : '';
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
                          source={require('../images/ic_center_back.png')}
                       />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>重置密码</Text>
                    </View>
                    <View style={{width:48,height:48}}/>
                </View>
                <View style={{backgroundColor:'white',marginTop:103}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入原密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               password = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState(0)}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入新密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'newpassword'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               newpassword = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState(1)}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="再次输入新密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'renewpassword'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               renewpassword = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState(1)}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                </View>
                <TouchableOpacity onPress={() => {this.resetSuccesAction()}}
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <Image source={require('../images/logre/ic_login_btn.png')}
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white',backgroundColor:'rgba(1,1,1,0)'}}>确认</Text>
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
export default Login;
