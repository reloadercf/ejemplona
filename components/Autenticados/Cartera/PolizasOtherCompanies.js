import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import {connect} from 'react-redux'
import { Appbar,Button,TextInput, Avatar, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { actionGetPolizasUsuarioCartera } from '../../Store/acciones/AccionesCartera';

class PolizasOtherCompanies extends Component {


constructor(props){
    super(props)
    this.state = {

    }
}

componentDidMount(){
    //this.props.getDataCartera()
}

filterPolizas = async (value) => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.getPolizasCarteraFilter(userToken,value)
}

render() {
    const {navigation,cartera}=this.props
    return (
        <View >
            <Appbar style={styles.bottom}>
                <Button icon="arrow-back" mode="contained" color="#032247" onPress={() => { navigation.navigate('MiCartera') }}>
                    Polizas Inbursa
                </Button>
                <Button icon="business" mode="contained" color="#3e3e40" onPress={() => { navigation.navigate('OtherPolizas') }}>
                    Otras Compañias
            </Button>
            </Appbar>

            <View style={{ position: "absolute", marginTop: "20%", width: "100%" }}>
                <TextInput
                    style={{backgroundColor:"#fff"}}
                    label='Buscar numPoliza, cliente'
                    selectionColor="#48466d"
                    onChangeText={value => { this.filterPolizas(value) }}
                />
            </View>
            <ScrollView style={styles.content}>
                {cartera && cartera.length > 0
                    ? cartera.map((c, key) => (
                        <Card key={key}>
                            <Card.Content>
                                <Card.Title title={<Text style={{ fontSize: 16 }}>{c.numeroPoliza}</Text>} subtitle={c.aseguradora.nombreEmpresa} left={(props) => <Avatar.Icon {...props} icon="folder" style={{color: "#fff", backgroundColor: "#ffbb00" }} />} />
                                <View style={styles.contentPoliza}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="account-circle" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                Cliente
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.cliente.nombreCliente}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.contentPoliza]}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="date-range" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                Fecha de nacimiento
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.cliente.fechaNac}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="perm-phone-msg" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                Telefono
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.cliente.telefono}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.contentPoliza}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="label" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                Producto
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.tipoPoliza.nombreProducto}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.contentPoliza}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="date-range" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                fecha Renovacion
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.fechaRenovacion}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                        <Avatar.Icon size={30} icon="attach-money" style={{ marginRight: 10, color: "#fff", backgroundColor: "#3e3e40" }} />
                                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={styles.styleParrafos}>
                                                Prima Total
                                            </Text>
                                            <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                                {c.primaTotal}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                                <ScrollView style={{ width: "100%" }}>
                                    <Text style={{ textAlign: "center", color: "#000" }}>Notas</Text>
                                    <Text>
                                        {c.notas}
                                    </Text>
                                </ScrollView>

                            </Card.Content>
                        </Card>
                    ))
                    : null
                }
            </ScrollView>

        </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({

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
      },
      styleParrafos:{
        fontSize:12,
        letterSpacing:1.5,
        fontWeight:"500",
        color:"#222831",
    },
      contentPoliza:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
      }
});

const mapStateToProps = (state) => {
    return {
        cartera:state.reducerCarteraUsuario.cartera
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPolizasCarteraFilter:(token,string)=>{
            dispatch(actionGetPolizasUsuarioCartera(token,string))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps, )(PolizasOtherCompanies)