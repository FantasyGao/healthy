import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView,Platform,ToastAndroid, Text, View,Image,TextInput,Picker,TouchableOpacity,InteractionManager } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Content from '../content.js'
import config from '../../config.js';

const URL = config.URL;

export default class Anwser extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userId:this.props.userId,
      dataSource: ds
    };
  }
  //加载数据
  componentDidMount(){
    this.fetchData();
  }
  componentWillReceiveProps(){
    this.fetchData()
  }
  fetchData(){
    fetch(URL+'get_info_byUser?authorId='+this.state.userId, {
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
    buttonBackAction(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.pop();
      });
    }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#f5f5f5'}}>
        <View style={{height:48,backgroundColor:'#51a1e6',flexDirection:'row'}}>
              <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white'}}>返回</Text>
              </TouchableOpacity>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>我的提问</Text>
              </View>
              <View style={{width:48,height:48}}/>
        </View>
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
                      <Image style={styles.personIcon} source={require('../../images/heat.png')}/>
                      <Text style={styles.like}>{rowData.likeNum}</Text>
                      <Image style={styles.personIcon} source={require('../../images/mark.png')}/>
                      <Text style={styles.like}>{rowData.markNum}</Text>
                  </View>
                  </TouchableOpacity>
                </View>}
            />
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
