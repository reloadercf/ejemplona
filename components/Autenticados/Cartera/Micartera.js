//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux'
import { actionGetpolizasUsuario, 
    actionGetPolizasUsuarioCartera, 
    actionGetClientesUsuarioCartera, 
    actionGetProspectosUsuarioCartera } from '../../Store/acciones/AccionesCartera';
import { DataTable,TextInput,Appbar,Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase";
import moment from "moment";
// create a component
class Micartera extends Component {
    constructor(props){
        super(props)
        this.state={
            notificationTime:moment(),
            enableNotification:true
        }
    }
    
    
    componentDidMount(){
        this.props.getDataCartera()
        this.getDataCartera()
        //this.setReminder()
        //this.getClientesCartera()   
    }
    setReminder = async () => {
        const { notificationTime, enableNotification } = this.state;
        
        if (enableNotification) {
          // schedule notification       
          firebase.notifications().scheduleNotification(this.buildNotification(), {
            fireDate: notificationTime.valueOf(),
            repeatInterval: 'day',
            exact: true,
          });
        } else {
          return false;
        }
      };

      buildNotification = () => {
        const title = Platform.OS === "android" ? "Daily Reminder" : "";
        const notification = new firebase.notifications.Notification()
          .setNotificationId("1") // Any random ID
          .setTitle(title) // Title of the notification
          .setBody("This is a notification") // body of notification
          .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
          .android.setChannelId("reminder") // should be the same when creating channel for Android
          .android.setAutoCancel(true); // To remove notification when tapped on it
          return notification;
      };

    getDataCartera = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.getPolizasCarteraUsuario(userToken)
    };

    getClientesCartera = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.getClientesCarteraUsuario(userToken)
    };

    filterPolizas=(value)=>{
        this.props.getPolizasFilter(value)
    }
    
    render() {
        const {navigation,polizas}=this.props
        return (
            <View style={styles.container}>
                <Appbar style={styles.bottom}>
                    <Button icon="work" color="#032247" mode="contained" onPress={() => { navigation.navigate('MiCartera')}}>
                       Polizas Inbursa
                    </Button>
                    <Button icon="business" color="#3e3e40"  mode="contained" onPress={() => { navigation.navigate('OtherPolizas') }}>
                       Otras Compañias
                    </Button>
                </Appbar>
         
                <View style={{ position: "absolute", marginTop: "20%", width:"100%" }}>
                    <TextInput
                        style={{backgroundColor:"#fff"}}
                        label='Buscar numPoliza, cliente'
                        selectionColor="#48466d"
                        onChangeText={value => {this.filterPolizas(value)}}
                    />
                </View>
              

                <ScrollView style={styles.content}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Num. poliza</DataTable.Title>
                            <DataTable.Title >Cliente</DataTable.Title>
                            <DataTable.Title >Vigencia</DataTable.Title>
        
                        </DataTable.Header>
                        {polizas && polizas.length > 0
                            ? polizas.map((c, key) => (
                                <DataTable.Row key={key} onPress={()=>{ navigation.navigate('DetailPoliza',{ idPoliza: c.id, renovacion:c.numero_renovacion}) }}>
                                    <DataTable.Cell>{c.numeroPolizaFull}</DataTable.Cell>
                                    <DataTable.Cell >{c.cliente.nombre}</DataTable.Cell>
                                    <DataTable.Cell >{c.fecha_inicio_vigencia}</DataTable.Cell>
                                </DataTable.Row>
                            ))
                            : null
                         }

                
                    </DataTable>

                    
                </ScrollView>

            </View>
        );
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff"
    },
    bottom: {
        display:"flex",
        justifyContent:"space-around",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor:"#fff"
      },
      content:{
          marginTop:"40%"
      }
});

const mapStateToProps = (state) => {
    return {
        polizas: state.reducerCarteraUsuario.polizas,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDataCartera: () => {
            dispatch(actionGetpolizasUsuario()) 
            dispatch(actionGetProspectosUsuarioCartera())
        },
        getPolizasCarteraUsuario:(token)=>{
            dispatch(actionGetPolizasUsuarioCartera(token))
        },
        getClientesCarteraUsuario:(token)=>{
            dispatch(actionGetClientesUsuarioCartera(token))
        },
        getPolizasFilter:(string)=>{
            dispatch(actionGetpolizasUsuario(string))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Micartera)