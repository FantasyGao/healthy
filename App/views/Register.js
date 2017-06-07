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
    Platform,
    ToastAndroid,
} from 'react-native';

import ShortLineTwo from '../component/ShortLineTwo';

import Login from './login.js';
import config from '../config.js';

const URL = config.URL;
var flag = false;

import FetchHttpClient, { form,header } from 'fetch-http-client';
import {NativeModules} from 'react-native';
var EncryptionModule = NativeModules.EncryptionModule;


var username = '';
var password = '';
var passwordto = '';
var verifyCode = '';
export default class Register extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.buttonChangeState=this.buttonChangeState.bind(this);
      this.registerAction=this.registerAction.bind(this);
}
  //返回
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  buttonChangeState(){

  }
  registerAction(){
       const {navigator} = this.props;
       //用户注册
       if(username === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('用户名不能为空...',ToastAndroid.SHORT) : '';
               return;
        }
       if(password === ''){
               (Platform.OS === 'android') ? ToastAndroid.show('密码不能为空...',ToastAndroid.SHORT) : '';
               return;
        }
        if(password != passwordto){
                (Platform.OS === 'android') ? ToastAndroid.show('两次密码输入不一致...',ToastAndroid.SHORT) : '';
                return;
         }
        if(flag){return}
        flag=true;
        fetch(URL+'add_user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user:username,
              password:password,
            })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        flag=false;
        if(responseJson.code==1){
          (Platform.OS === 'android') ? ToastAndroid.show('注册成功...',ToastAndroid.SHORT) : '';
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: Login,
                name: 'Login',
                params:{
                  name:username,
                  pas:password
                }
             });
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
                       <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>注册</Text>
                    </View>
                    <View style={{width:48,height:48}}/>
                </View>
                <View style={{backgroundColor:'white',marginTop:103}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入账号"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               username = text;
                            }}
                      />
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入密码(6位以上字符)"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               password = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState()}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="再次输入密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'passwordto'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               passwordto = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState()}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../images/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                </View>
                <Text style={{marginTop:13,marginLeft:13,fontSize:12,color:'#777'}}></Text>
                <TouchableOpacity onPress={() => {this.registerAction()}}
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <Image source={require('../images/logre/ic_login_btn.png')}
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white'}}>注册</Text>
                    </Image>
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    }
});
