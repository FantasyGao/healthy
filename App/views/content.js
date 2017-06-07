import React, { Component } from 'react';
import { AppRegistry,StyleSheet, ListView, Text, View,ToastAndroid,Dimensions,Platform,TouchableOpacity,Image,InteractionManager,TextInput} from 'react-native';
import config from '../config.js';

const URL = config.URL;
var flag=false;
export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      id:this.props._id,
      Content:'',
      question:{
         'author':'',
         'content':''
      },
      dataSource: ds
    };
  }
  //加载数据
  componentDidMount(){
    this.fetchData()
  }
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
        if(listData[0].markList.length==0){
          this.setState({
              question:{
                'author':listData[0].author,
                'icon':listData[0].icon,
                 'content':listData[0].topic
               },
          });
        }else{
          this.setState({
              question:{
                'author':listData[0].author,
                'icon':listData[0].icon,
                'content':listData[0].topic
               },
              dataSource:this.state.dataSource.cloneWithRows(listData[0].markList)
          });
        }
      } else {
        (Platform.OS === 'android') ? ToastAndroid.show('网络错误，稍后再试...',ToastAndroid.SHORT) : '';
      }
    };

    request.open('GET', URL+'get_info_byId?id='+this.state.id);
    request.send();
  }
  buttonBackAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.pop();
    });
  }
  remark(){
      if(flag){return}
      flag=true;
      fetch(URL+'person_center?user='+this.props.userId, {
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
          let listData = responseJson.data;
          if(listData.length==0) return;
          this.setState({
              iconT:responseJson.data[0].icon
          });
          this.remarkFun();
        }else{
          (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
        }
     })
  }
  remarkFun(){
    fetch(URL+'add_remark', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:this.state.id,
          userName:this.props.userId,
          userId:this.props.userId,
          userIcon:this.state.iconT,
          markContent:this.state.Content,
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.code==1){
           this.refs.markContent.blur();
           this.fetchData();
           this.setState({value:''});
       }else{
           (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
       }
    })
  }
  chooseLike(markId){
    fetch(URL+'edit_like', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:this.state.id,
          markId : markId,
          userId : this.props.userId,
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.code==1){
         this.fetchData()
      }else{
        (Platform.OS === 'android') ? ToastAndroid.show("网络发生错误",ToastAndroid.SHORT) : '';
      }
   })
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#F5F5D5'}}>
      <View style={{height:48,backgroundColor:'#51a1e6',flexDirection:'row'}}>
            <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                              style={{width:48,height:48,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'white'}}>返回</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>问题详情</Text>
            </View>
            <View style={{width:48,height:48}}/>
      </View>
        <View style={styles.item}>
          <View style={styles.authorItem}>
                <Image style={styles.personIcon} source={{uri:this.state.question.icon}}/>
                <Text style={styles.author}>{this.state.question.author}</Text>
          </View>
          <Text style={styles.topicItem}>{this.state.question.content}</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          style={{marginBottom:60}}
          renderRow={(rowData) =>
            <View style={styles.items}>
              <View style={{height:40}}>
                  <Text style={styles.answer}>回答信息</Text>
              </View>
              <View style={styles.authorItem}>
                    <Image style={styles.personIcon} source={{uri:rowData.userIcon}}/>
                    <Text style={styles.author}>{rowData.userName}</Text>
              </View>
              <Text style={styles.topicItem}>{rowData.markContent}</Text>
              <View style={styles.likeItem}>
                  <TouchableOpacity onPress={()=>{this.chooseLike(rowData._id)}}>
                     <Image style={styles.personIcon} source={require('../images/heat.png')}/>
                  </TouchableOpacity>
                  <Text style={styles.like}>{rowData.like}</Text>
              </View>
            </View>}
        />
        <View style={styles.markInput}>
            <TextInput
               style={{height:40,fontSize: 15,borderWidth:1,backgroundColor:'white',borderColor:'gray',borderRadius:2,margin:10,textAlign: 'left',textAlignVertical:'center',flex:1}}
               placeholder="我要回答这个问题"
               placeholderTextColor="#aaaaaa"
               underlineColorAndroid="transparent"
               numberOfLines={1}
               ref={'markContent'}
               value={this.state.value}
               multiline={true}
               onChangeText={(text) => {
                  this.state.Content = text;
               }}
            />
            <TouchableOpacity style={styles.markSub} onPress={() => {this.remark()}}><Text style={{fontSize: 15,color:'white',margin:10,textAlign: 'center',textAlignVertical:'center',}}>提交</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        flexDirection: 'column',
        backgroundColor:'white'
    },
    items:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        flexDirection: 'column',
        backgroundColor:'#F8F8F8',
    },
    authorItem:{
        padding:10,
        height: 50,
        flexDirection: 'row',
    },
    personIcon:{
        width:25,
        height:25,
        borderWidth: 1,
        marginLeft:20,
        borderColor: '#F5F5F5',
    },
    author:{
        fontSize:18,
        marginLeft:10,
        lineHeight:30
    },
    answer:{
      fontSize:14,
      marginLeft:10,
      lineHeight:30,
      textAlign:'center'
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
        marginLeft:10,
        lineHeight:20
    },
    markInput:{
       flex:1,
       position:'absolute',
       bottom:0,
       width:width,
       flexDirection: 'row',
       backgroundColor:'white'
    },
    markSub:{
       width:width*0.15,
       height:40,
       marginTop:10,
       marginRight:10,
       borderRadius:2,
       backgroundColor:'#51a1e6'
    },
});
