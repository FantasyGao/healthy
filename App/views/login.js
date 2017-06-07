'use strict';
import React, {Component,PropTypes} from 'react';
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
//(Platform.OS === 'ios') ? '' : '';
import ShortLineTwo from '../component/ShortLineTwo';
import FetchHttpClient, { form,header } from 'fetch-http-client';
import {NativeModules} from 'react-native';
var EncryptionModule = NativeModules.EncryptionModule;

import Register from './Register.js';
import ResetPwd from './ResetPwd.js';
import Index from './Index.js';

import config from '../config.js';

const URL = config.URL;

var username = '';
var password = '';
var flag = false;

export default class Login extends Component {
  constructor(props) {
      super(props);
   }
  //用户登录/注册
  buttonRegisterOrLoginAction(position){
      var that = this;
      that.refs.password.blur();
      const {navigator,dispatch} = this.props;
      if(position === 0){
            //用户登录
           if(username === ''){
               alert('用户名不能为空...');
               return;
           }
           if(password === ''){
               alert('密码不能为空...');
               return;
           }
           if(flag){return}
           flag=true;
         fetch(URL+'user_login?user='+username+'&password='+password, {
             method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
         })
         .then((response) => response.json())
         .then((responseJson) => {
            flag=false;
           if(responseJson.code==1){
             (Platform.OS === 'android') ? ToastAndroid.show('登录成功...',ToastAndroid.SHORT) : '';
             InteractionManager.runAfterInteractions(() => {
               navigator.push({
                   component: Index,
                   name: 'Index',
                   params:{
                     name:username
                   }
                });
             });
           }else{
             (Platform.OS === 'android') ? ToastAndroid.show(responseJson.text,ToastAndroid.SHORT) : '';
           }
       })
      }else if(position === 1){
           //用户注册
           InteractionManager.runAfterInteractions(() => {
               navigator.push({
                   component: Register,
                   name: 'Register'
                });
            });
        }
  }
  buttonChangeState(){

  }
  findPwdAction(){
     const {navigator} = this.props;
     InteractionManager.runAfterInteractions(() => {
               navigator.push({
                   component: ResetPwd,
                   name: 'ResetPwd'
                });
            });
  }
  thirdPartLoginAction(position){

  }

  render() {
      const {login} = this.props;
      return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <View style={styles.topbar_bg}>
                    <View style={styles.topbar_center_bg}>
                       <Text style={styles.topbar_center_tv}>登录</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.buttonRegisterOrLoginAction(1)}}
                                      style={styles.topbar_right_item}>
                       <Text style={styles.topbar_right_tv}>注册</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'white',marginTop:103}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Image source={require('../images/logre/ic_us_icon.png')}
                                 style={{width:17,height:14,marginLeft:13}}/>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="账户/邮箱"
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
                          <Image source={require('../images/logre/ic_pwd_icon.png')}
                                 style={{width:17,height:14,marginLeft:13}}/>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="密码"
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
                </View>
                <TouchableOpacity onPress={() => {this.buttonRegisterOrLoginAction(0)}}
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <Image source={require('../images/logre/ic_login_btn.png')}
                           style={{width:300,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#51a1e6'}}>
                          <Text style={{color:'white'}}>确认</Text>
                    </Image>
                </TouchableOpacity>
                <View style={{alignItems:'flex-end',marginTop:13}}>
                    <TouchableOpacity onPress={()=>{this.findPwdAction()}} style={{marginRight:10}}>
                        <Text style={{fontSize:13,color:'#777'}}></Text>
                    </TouchableOpacity>
                </View>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    },
    topbar_bg:{
        height:48,
        backgroundColor:'#51a1e6',
        flexDirection:'row'
    },
    topbar_left_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_bg:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_tv:{
        fontSize:18,
        color:'white',
        alignSelf:'center'
    },
    topbar_right_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_right_tv:{
        fontSize:15,
        color:'white',
        alignSelf:'center'
    }
});
