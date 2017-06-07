import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView, Text,Platform, View,Image,ToastAndroid,TextInput,Picker,TouchableOpacity,InteractionManager } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Content from './content.js'
import myQuestion from './personal/myQuestion.js'
import config from '../config.js';

const URL = config.URL;

var flag=false;

export default class Anwser extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tag:'运动',
      content:'',
      userId:this.props.name,
      dataSource: ds
    };
  }
  toDetail(id){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: Content,
            name: 'Content',
            params:{
              _id:id,
              userId:this.props.name
            }
          });
        });
  }
  //加载数据
  componentDidMount(){
    this.fetchData();
    this.fetchData2();
  }
  componentWillReceiveProps(){
    this.fetchData()
    this.fetchData2();
  }
  fetchData(){
    fetch(URL+'get_info_byUser?authorId='+this.props.name, {
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
            dataSource:this.state.dataSource.cloneWithRows(listData)
        });
      }else{
        (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
      }
   })
  }
  fetchData2(){
    fetch(URL+'person_center?user='+this.props.name, {
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
  submitInfo(){
    if(flag){return}
    flag=true;
    fetch(URL+'add_info', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author:this.props.name,
          icon:this.state.icon,
          topic:this.state.content,
          authorId:this.props.name,
          tag:this.state.tag,
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      flag=false;
      if(responseJson.code==1){
         (Platform.OS === 'android') ? ToastAndroid.show('发布成功...',ToastAndroid.SHORT) : '';
         this.setState({tag: '运动',content:''})
      }else{
        (Platform.OS === 'android') ? ToastAndroid.show('发生错误',ToastAndroid.SHORT) : '';
      }
    })
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#f5f5f5'}}>
         <View style={{height:45,backgroundColor:'#51a1e6',flexDirection:'row'}}>
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>我的提问</Text>
             </View>
        </View>
        <ScrollableTabView>
          <View tabLabel='写问题'>
            <View style={{flexDirection: 'row',}}>
              <Text style={{flex:1,textAlignVertical:'center',textAlign:'center'}}>选择标签:</Text>
              <Picker
                  style={styles.picker}
                  selectedValue={this.state.tag}
                  onValueChange={(value) =>this.setState({tag: value})}>
                  <Picker.Item label="运动" value="运动" />
                  <Picker.Item label="养生" value="养生" />
                  <Picker.Item label="疾病" value="疾病" />
                  <Picker.Item label="妇科" value="妇科" />
              </Picker>
            </View>
            <TextInput
                 style={styles.question}
                 placeholder="留下你的问题吧，注意不要超过200字哦！"
                 placeholderTextColor="#aaaaaa"
                 ref={'question'}
                 multiline={true}
                 autoFocus={true}
                 maxLength ={200}
                 underlineColorAndroid={'transparent'}//输入框的线框为透明
                 onChangeText={(text) => {
                    this.setState({content:text});
                 }}
                 value={this.state.content}
            />
            <TouchableOpacity style={{height:45,backgroundColor:'#51a1e6',margin:10,justifyContent:'center',borderRadius:3}} onPress={()=>{this.submitInfo()}}>
                <Text style={{alignSelf:'center',color:'white'}}>提交</Text>
            </TouchableOpacity>
          </View>
          <View tabLabel='我的问题'>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.item}>
                  <View style={styles.authorItem}>
                        <Text style={styles.author}>提问时间:{rowData.time}</Text>
                  </View>
                  <TouchableOpacity onPress={() => {this.toDetail(rowData._id)}}>
                  <Text style={styles.topicItem}>{rowData.topic}</Text>
                  <View style={styles.likeItem}>
                      <Image style={styles.personIcon} source={require('../images/heat.png')}/>
                      <Text style={styles.like}>{rowData.likeNum}</Text>
                      <Image style={styles.personIcon} source={require('../images/mark.png')}/>
                      <Text style={styles.like}>{rowData.markNum}</Text>
                  </View>
                  </TouchableOpacity>
                </View>}
            />
          </View>
        </ScrollableTabView>
     </View>
    );
  }
}
const styles = StyleSheet.create({
    picker:{
       flex:4,
       backgroundColor:'white',
       height:30,
       margin:10,
       borderRadius:4
    },
    item:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        flexDirection: 'column',
        backgroundColor:'white'
    },
    authorItem:{
        padding:0,
        height: 30,
        flexDirection: 'row',
    },
    personIcon:{
        width:25,
        height:25,
        marginLeft:20,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    author:{
        fontSize:16,
        lineHeight:30,
        marginLeft:10
    },
    topicItem:{
        padding:10,
        fontSize:16
    },
    likeItem:{
        flexDirection: 'column',
        height: 40,
        flexDirection: 'row',
        marginRight:10
    },
    like:{
        marginLeft:5,
        lineHeight:20
    },
    question:{
        height:300,
        fontSize: 15,
        borderColor:'gray',
        textAlignVertical :'top',
        paddingTop:10,
        backgroundColor:'white',
        margin:5,
        borderWidth:1,
        borderRadius:2
    }
});
