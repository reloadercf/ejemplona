//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable,TextInput,Appbar,Button,Card,Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import { actionGetClientesUsuarioCartera } from '../../Store/acciones/AccionesCartera';


// create a component
class Clientes extends Component {

    componentDidMount(){
        this.getClientesCartera()
    }

    getClientesCartera = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.getClientesCarteraUsuario(userToken)
    };


    filterClientes= async (value) => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.GetClientesCartera(userToken,value)
    }

    render() {
        const {navigation,clientes}=this.props
      
        return (
            <View style={styles.container}>
                <View style={{ position: "absolute", width: "90%", zIndex: 1, top:"10%" }}>
                        <TextInput
                            style={{backgroundColor:"#fff"}}
                            label='Buscar cliente'
                            selectionColor="#48466d"
                            onChangeText={value => { this.filterClientes(value) }}
                        />
                </View>
                <ScrollView style={{ width:"100%", marginTop:"30%", backgroundColor:"#fff"}}>
                 
                    {
                      clientes && clientes.length >0?
                      clientes.map((c, key) => (
                        <Card key={key}>
                        <Card.Content>
                            <Card.Title title={<Text style={{ fontSize: 16 }}>{c.nombreCliente}</Text>}  left={(props) => <Avatar.Icon {...props} icon="account-circle"  style={{ color: "#fff", backgroundColor: "#00a2ff" }}/>} />
                            <View style={styles.contentPoliza}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 5 }}>
                                    <Avatar.Icon size={30} icon="room" style={{ marginRight: 10, color: "#000", backgroundColor: "#fff" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Direccion 
                                        </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {c.direccion}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 5 }}>
                                    <Avatar.Icon size={30} icon="explore" style={{ marginRight: 10, color: "#000", backgroundColor: "#fff" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Fecha de nacimiento 
                                        </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {c.fechaNac}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 5 }}>
                                    <Avatar.Icon size={30} icon="call" style={{ marginRight: 10, color: "#000", backgroundColor: "#fff" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Telefono 
                                        </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {c.telefono}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 5 }}>
                                    <Avatar.Icon size={30} icon="layers" style={{ marginRight: 10, color: "#000", backgroundColor: "#fff" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Notas
                                        </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {c.nota}
                                        </Text>
                                    </View>
                                </View>
                                
                                
                            </View>
                        </Card.Content>
                    </Card>
                      ))
                      :null
                    }
                </ScrollView>
               
               
            </View>
        );
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#fff"
    },
    content:{
        marginTop:"40%"
    },
    styleParrafos:{
      fontSize:12,
      letterSpacing:1.5,
      fontWeight:"500",
      color:"#222831",
  },
    contentPoliza:{
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"flex-start",
          
    }
});

const mapStateToProps = (state) => {
    return {
        clientes:state.reducerCarteraUsuario.clientes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClientesCarteraUsuario:(token)=>{
            dispatch(actionGetClientesUsuarioCartera(token))
        },
        GetClientesCartera: (token,string) => {
            dispatch(actionGetClientesUsuarioCartera(token,string))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Clientes)
