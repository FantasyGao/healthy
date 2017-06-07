'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    Dimensions,
    StyleSheet,
    ToastAndroid,
    Platform,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import CenterItem from '../component/CenterItem';
import ImageButton from '../component/ImageButton';


import About from './personal/About.js'
import integral from './personal/integral.js'
import myMark from './personal/myLike.js'
import myQuestion from './personal/myQuestion.js'
import editIcon from './personal/editImage.js'

import login from './login.js'
import ResetPwd from './ResetPwd.js';

import config from '../config.js';

const URL = config.URL;
var {height,width} =  Dimensions.get('window');

export default class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user:this.props.name,
          jifen:'',
        };
    }
    加载数据
    componentDidMount(){
      this.fetchData();
    }
    componentWillReceiveProps(){
      this.fetchData()
    }
    fetchData(){
      fetch(URL+'person_center?user='+this.state.user, {
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
              jifen:responseJson.likeSum,
              icon:responseJson.data[0].icon
          });
        }else{
          (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
        }
     })
    }
    loginButtonActiom(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: editIcon,
          name: 'editIcon',
          params:{
            userId:this.props.name
          }
        });
      });
    }
    //判断当前点击了那个按钮
    itemActionIndex(position){
        const {navigator} = this.props;
        if(position === 1){
          //我的提问
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: myQuestion,
              name: 'myQuestion',
              params:{
                userId:this.props.name
              }
            });
          });
        }else if(position === 2){
           //我评论过的
            InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: myMark,
                name: 'myMark',
                params:{
                  userId:this.props.name
                }
              });
            });
        }else if(position === 4){
          //积分
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: integral,
              name: 'integral'
            });
          });
        }else if(position === 5){
          //关于
          const {navigator} = this.props;
          InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: About,
                name: 'About'
              });
          });
      }
    }
    exit(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: login,
          name: 'login'
        });
      });
    }
    findPwdAction(){
       const {navigator} = this.props;
       InteractionManager.runAfterInteractions(() => {
                 navigator.push({
                     component: ResetPwd,
                     name: 'ResetPwd',
                     params:{
                       userId:this.props.name
                     }
                  });
              });
    }
    render() {
        return (
             <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <View style={{height:45,backgroundColor:'#51a1e6',flexDirection:'row'}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>我的</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>

                    </View>
                </View>

                <View style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row',height:100}}>
                       <TouchableOpacity onPress={() => {this.loginButtonActiom()}} >
                           <Image  style={{width:70,height:70,marginLeft:10,marginTop:15}} source={{uri:this.state.icon}}/>
                       </TouchableOpacity>
                       <View style={{flexDirection:'column',justifyContent:'center',marginLeft:10}}>
                          <Text>{this.state.user}</Text>
                          <View style={{flexDirection:'row'}}>
                             <Text style={{color:'#ddd'}}>积分:</Text>
                             <Text style={{color:'#ddd'}}>{this.state.jifen}</Text>
                          </View>
                       </View>
                       <View style={styles.modify_item}>

                       </View>
                    </View>
                </View>


                <View style={[styles.top_line,{marginTop:10}]}></View>
                <CenterItem
                   title='我的提问'
                   icon={require('../images/c_ans.png')}
                   onPress={()=>this.itemActionIndex(1)}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <CenterItem
                   title='我评论过的'
                   icon={require('../images/c_good.png')}
                   onPress={()=>this.itemActionIndex(2)}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <CenterItem
                   title='积分兑换'
                   icon={require('../images/c_num.png')}
                   onPress={()=>this.itemActionIndex(4)}/>
                <View style={[styles.top_line,styles.center_line]}></View>

                <View style={[styles.top_line,{marginTop:10}]}></View>
                <CenterItem
                   title='密码修改'
                   icon={require('../images/c_ans.png')}
                   onPress={()=>this.findPwdAction()}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <CenterItem
                   title='关于'
                   icon={require('../images/c_about.png')}
                   onPress={()=>this.itemActionIndex(5)}/>
                <View style={styles.top_line}></View>
                <TouchableOpacity style={{height:45,width:width,backgroundColor:'white',marginTop:10,justifyContent:'center',}}>
                    <Text style={{alignSelf:'center'}}>客服QQ:123456789</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{height:45,backgroundColor:'#51a1e6',margin:10,justifyContent:'center',borderRadius:3}}
                    onPress={()=>this.exit()}>
                    <Text style={{alignSelf:'center',color:'white'}}>退出登录</Text>
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    top_line:{
        height:1,
        backgroundColor:'#ccc'
    },
    center_line:{
        marginLeft:8,
        marginRight:8,
    },
    modify_item:{
        alignItems:'flex-end',
        flex:1,
        marginRight:10,
        marginTop:15
    }
});
