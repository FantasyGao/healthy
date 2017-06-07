import React, { Component } from 'react';
import { AppRegistry, ListView,Platform, ToastAndroid,Text, View,StyleSheet,TextInput,InteractionManager,TouchableOpacity} from 'react-native';


import tagDetail from './tagDetail.js';
import config from '../config.js';

const URL = config.URL;

export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const dsleft  = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dsright = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataLeftSource: dsleft,
      dataRightSource: dsright
    };
  }
  componentDidMount(){this.fetchData();}
  componentWillReceiveProps(){
    this.fetchData()
  }
  fetchData(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let listData = JSON.parse(request.responseText);
        if(listData.length==0) return;
        console.log(listData)
        var dataArray = [];
        for(let i=0;i<listData.length;i++){
          dataArray[i] = listData[i];
        }
        let index = Math.ceil(listData.length/2);
        let listLeftData = listData.splice(0,index);
        let listRightData = dataArray.splice(index);
        if(listLeftData.length!=0){
          this.setState({
              dataLeftSource:this.state.dataLeftSource.cloneWithRows(listLeftData)
          });
        }
        if(listRightData.length!=0){
          this.setState({
              dataRightSource:this.state.dataRightSource.cloneWithRows(listRightData)
          });
        }
      } else {
        (Platform.OS === 'android') ? ToastAndroid.show("发生错误",ToastAndroid.SHORT) : '';
      }
    };

    request.open('GET', URL+'get_tags');
    request.send();
  }
  toTagDetail(tag){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: tagDetail,
        name: 'tagDetail',
        params:{
           tag:tag
        }
      });
    });
  }
  render() {
    return (
      <View style={{ backgroundColor:'#f5f5f5'}}>
         <View style={{height:45,backgroundColor:'#51a1e6',flexDirection:'row'}}>
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>标签管理</Text>
             </View>
        </View>

        <View style={{height:45,flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center'}}>
               <Text style={{fontSize:18,color:'#aaaaaa',marginLeft:10}}>标签</Text>
            </View>
       </View>
        <View style={styles.content}>
          <ListView
            style={styles.LeftContent}
            dataSource={this.state.dataLeftSource}
            renderRow={(rowData) =>
              <View>
                 <TouchableOpacity onPress={()=>{this.toTagDetail(rowData)}}>
                  <View style={styles.itemList}>
                      <Text style={styles.item}>{rowData}</Text>
                  </View>
                </TouchableOpacity>
              </View>}
          />
          <ListView
            style={styles.RightContent}
            dataSource={this.state.dataRightSource}
            renderRow={(rowData) =>
              <View>
                 <TouchableOpacity onPress={()=>{this.toTagDetail(rowData)}}>
                  <View style={styles.itemList}>
                      <Text style={styles.item} numberOfLines={1}>{rowData}</Text>
                  </View>
                </TouchableOpacity>
              </View>}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
   content:{
       flexDirection: 'row',
       backgroundColor:'white'
   },
   LeftContent:{
       flex:0.5,
       flexDirection: 'column',
       backgroundColor:'white'
   },
   RightContent:{
       flex:0.5,
       flexDirection: 'column',
       backgroundColor:'white'
   },
   itemList:{
       height:40,
       paddingLeft:10,
       paddingTop:5,
       flexDirection: 'column',
   },
   item:{
       height:30,
       textAlign:'center',
       lineHeight:24,
       borderWidth: 1,
       borderColor: '#F5F5F5',
       borderColor: 'black',
       flexDirection: 'column',
       borderRadius:3,
   },
})
