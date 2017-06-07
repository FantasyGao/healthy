import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView,Platform, Text, View,Image,TouchableOpacity,ToastAndroid,InteractionManager} from 'react-native';

import Content from './content.js'
import config from '../config.js';

const URL = config.URL;

export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }
  componentDidMount(){
    this.fetchData()
  }
  componentWillReceiveProps(){
    this.fetchData()
  }
  componentDidUpdate(){

  }
  fetchData(){
    fetch(URL+'get_all_info_time', {
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
        (Platform.OS === 'android') ? ToastAndroid.show("发生错误",ToastAndroid.SHORT) : '';
      }
    })
  }
  componentWillUnmount() {

  };
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
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#F5F5D5'}}>
         <View style={{height:45,backgroundColor:'#51a1e6',flexDirection:'row'}}>
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>动态</Text>
             </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.item}>
              <View style={styles.authorItem}>
                    <Image style={styles.personIcon} source={{uri:rowData.icon}}/>
                    <Text style={styles.author}>{rowData.author}</Text>
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
    );
  }
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        flexDirection: 'column',
        backgroundColor:'white'
    },
    authorItem:{
        padding:10,
        height: 50,
        flexDirection: 'row',
    },
    personIcon:{
        width:28,
        height:28,
        borderWidth: 1,
        marginLeft:20,
        marginTop:5,
        borderColor: '#F5F5F5',
    },
    author:{
        fontSize:18,
        marginLeft:10,
        lineHeight:30
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
        lineHeight:30
    }
});
