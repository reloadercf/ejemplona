//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Linking } from 'react-native';
import {connect} from 'react-redux'
import { actionGetRecibosPoliza, actionGetpolizaDetail, actionGetArchivosPoliza,actionGetObjetoVehiculo } from '../../Store/acciones/AccionesCartera';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar,ActivityIndicator, Colors,Card, IconButton } from 'react-native-paper';
import { DataTable, List } from 'react-native-paper';

// create a component
class DetailPoliza extends Component {

    state = {
        expanded: false
      }
    
    
    componentDidMount(){
        this.props.GetPolizaDetail(this.props.navigation.state.params.idPoliza)
    }


   
    _handlePress = () =>{
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.GetRecibosPoliza(this.props.navigation.state.params.idPoliza, this.props.navigation.state.params.renovacion)
    }
    
     
    handleUrl = (url) => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log(`Don't know how to open URI: ${url}`);
          }
        });
      };

    render() {
        
        if(this.props.poliza){
            const {poliza, recibos,archivosPoliza,vehiculo}=this.props

            console.log(this.props)
            return (
                <ScrollView style={styles.poliza}>
                    <View style={[styles.generalPoliza, styles.encabezadoPoliza]}>
                            <Avatar.Icon size={40} icon="folder"  style={{marginRight:10, color:"#fff", backgroundColor:"#032247" }}/>
                            <Text style={styles.styleTitulos}>
                                {poliza.numeroPolizaFull}
                            </Text>
                    </View>
                    <View style={styles.generalPoliza}>
                        <View style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                            <Avatar.Icon size={30} icon="account-circle" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                            <Text style={styles.styleParrafos}>
                                Referencia :  {poliza.nombre_contratante}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.generalPoliza, {flexDirection:"row", justifyContent:"space-between"}]}>
                        <View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="date-range" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                        Inicio vigencia
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.fecha_inicio_vigencia}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="attach-money" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }}/>
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                        Prima Neta
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.primaNeta}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="toys" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                        Forma de pago
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.forma_de_pago.nombreForma}
                                    </Text>
                                </View>
                            </View>

                        
                        </View>
                        <View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="date-range" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                        Renovación
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.fecha_renovacion}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="credit-card" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                        Cuenta domiciliación
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.cuentaDomiciliacion}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                <Avatar.Icon size={30} icon="memory" style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Text style={styles.styleParrafos}>
                                       Conducto de cobro
                                    </Text>
                                    <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                        {poliza.conducto_cobro.nombreConducto}
                                    </Text>
                                </View>
                            </View>                
                        </View>   
                    </View>
                    <View style={styles.generalPoliza}>
                        <Text style={[styles.styleTitulos, { fontSize: 14, textAlign: "center" }]}>
                            Datos del cliente
                        </Text>
                      
                        <View style={{display:"flex", flexDirection:"row",alignItems:"center", marginVertical:5}}>
                            <Avatar.Icon size={30} icon="face"  style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }}/>
                            <Text style={styles.styleParrafos}>
                                Cliente :{poliza.cliente.nombre}
                            </Text>
                        </View>

                        <View style={{display:"flex", flexDirection:"row",alignItems:"center",marginVertical:5}}>
                            <Avatar.Icon size={30} icon="label"  style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                            <Text style={[styles.styleParrafos]}>
                                Rfc :{poliza.cliente.rfc}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.generalPoliza}>
                        <Text style={[styles.styleTitulos, { fontSize: 14, textAlign: "center" }]}>
                            Datos del producto
                        </Text>
                        <View style={[styles.generalPoliza, { flexDirection: "row", justifyContent: "space-around" }]}>
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                    <Avatar.Icon size={30} icon="assignment"  style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Producto
                                    </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {poliza.producto.nombreProducto}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginVertical: 10 }}>
                                    <Avatar.Icon size={30} icon="business"  style={{ marginRight: 10,color:"#fff", backgroundColor:"#122ca1" }} />
                                    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Text style={styles.styleParrafos}>
                                            Empresa
                                    </Text>
                                        <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
                                            {poliza.producto.empresa.nombreEmpresa}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
               {poliza.producto.objeto==='vehiculo'?poliza.colectivoFlotilla==false?
               <List.Accordion
               title="Datos del Vehiculo"
               left={props => <List.Icon {...props} icon="favorite" />}
             >
               {vehiculo && vehiculo.length > 0
                                ?vehiculo.length > 1?
                                <List.Item title="Error hay muchos vehiculos y no es flotilla" />
                                : vehiculo.map((c) => (
                                    <List.Item title={`${c.marca}`} 
                                    key={c.id}
                                    description={`${c.carroceria}`}
                                    />
                                ))
                                
                                : <List.Item title="Visita e-dipra.com y agrega un vehiculo" />
                            }
                {vehiculo && vehiculo.length > 0 && vehiculo.length < 2
                                ? vehiculo.map((c) => (
                                    <List.Item title={`CIS:${c.cis}`}
                                    key={c.cis}
                                    description={`ISIS:${c.isis}`}
                                    />
                                ))
                                
                                : null
                            }
                {vehiculo && vehiculo.length > 0 && vehiculo.length < 2
                                ? vehiculo.map((c) => (
                                    <List.Item title={`Modelo:${c.modelo}`}
                                    key={c.cis}
                                    description={`Placas:${c.placas}`}
                                    />
                                ))
                                
                                : null
                            }
                {vehiculo && vehiculo.length > 0 && vehiculo.length < 2
                                ? vehiculo.map((c) => (
                                    <List.Item title={`Nº Serie:`}
                                    key={c.cis}
                                    description={`${c.serie}`}
                                    />
                                ))
                                
                                : null
                            }



             </List.Accordion>:
             <Text style={[styles.styleParrafos, { color: "#3f72af" }]}>
             La poliza es de Flotilla
            </Text>
             :null}
                    <View style={styles.generalPoliza}>
                        <Text style={[styles.styleTitulos, { fontSize: 14, textAlign: "center" }]}>
                            Recibos
                        </Text>
                    </View>
                    <View style={styles.generalPoliza}>
                     
                            <List.Accordion
                                title="Recibos de poliza"
                                left={props => <List.Icon {...props} icon="folder" />}
                                expanded={this.state.expanded}
                                onPress={this._handlePress}
                            >
                            {recibos && recibos.length > 0
                                ? recibos.map((c, key) => (
                                    <List.Item
                                        key={key} 
                                        title={`Num. pago: ${c.numero_de_pago?c.numero_de_pago:"#"}`}
                                        description={`Num Recibo ${c.numero_de_recibo} Fecha de Inicio: ${c.fecha_inicio} Importe: ${c.importe}`}
                                        left={props =>  <Avatar.Icon size={40} icon="assignment"  style={{ color:"#fff", backgroundColor:"#122ca1" }} />}
                                        right={props => <View {...props}><Text style={{backgroundColor:`${c.status.color}`, padding:5, borderRadius:5, color:"#fff" }} >{c.status.nombreStatusRecibo}</Text></View>}
                                    >
                                      
                                    </List.Item>
                                ))
                                : <List.Item
                   
                                title="No hay recibos"
                                description="No existen recibos en esta poliza"
                                left={props => <List.Icon {...props} icon="folder"/>}
                                right={props => <View {...props}><Text>Status</Text></View>}
                            />
                            }
                            
                            
                            </List.Accordion>
                      

                        {/* <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Status</DataTable.Title>
                                <DataTable.Title >Fecha inicio</DataTable.Title>
                                <DataTable.Title >Importe</DataTable.Title>
                                <DataTable.Title >Nº de Recibo</DataTable.Title>
                               

                            </DataTable.Header>
                            {recibos && recibos.length > 0
                                ? recibos.map((c, key) => (
                                    <DataTable.Row key={key}>
                                        <DataTable.Cell ><Text style={{backgroundColor:`${c.status.color}`}} >{c.status.nombreStatusRecibo}</Text></DataTable.Cell>
                                        <DataTable.Cell >{c.fecha_inicio}</DataTable.Cell>
                                        <DataTable.Cell > $ {c.importe}</DataTable.Cell>
                                        <DataTable.Cell >{c.numero_de_pago}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                                : <Text>No hay recibos</Text>
                            }
                        </DataTable> */}
                    </View>
                    <View style={styles.generalPoliza}>
                        <Text style={[styles.styleTitulos, { fontSize: 14, textAlign: "center" }]}>
                           Archivos
                        </Text>
                        <View>
                            {archivosPoliza && archivosPoliza.length > 0
                                ? archivosPoliza.map((c, key) => (
                                    <Card.Title
                                        key={key}
                                        title={<Text style={{fontSize:12}}>{c.nombre_archivo}</Text>}
                                        right={(props) => <IconButton {...props} icon="attachment" onPress={() => { this.handleUrl(c.urlArchivo) }} />}
                                        
                                    />
                                ))
                                : null
                            }
                        </View>
                    </View>
                </ScrollView>
            );
        }
        else{
            return (
                <View style={styles.container}>
                   <ActivityIndicator animating={true} color={Colors.red800} />
                </View>
            );
        }
       
    }
}

// define your styles
const styles = StyleSheet.create({
    poliza:{
        display:"flex",
        flexDirection:"column",
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    styleTitulos:{
        fontSize:18,
        letterSpacing:1.5,
        fontWeight:"bold",
        color:"#222831"
    },
    styleParrafos:{
        fontSize:12,
        letterSpacing:1.5,
        fontWeight:"500",
        color:"#222831",
    },
    generalPoliza:{
        marginVertical:15,
        marginHorizontal:10,
        display:"flex"
    },
    encabezadoPoliza:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
});

const mapStateToProps = (state) => {
    return {
        poliza:state.reducerDentrodePoliza.detailPoliza,
        recibos:state.reducerDentrodePoliza.recibos,
        archivosPoliza:state.reducerDentrodePoliza.fileList,
        vehiculo: state.reducerDentrodePoliza.vehiculo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetPolizaDetail:(idPoliza)=>{
            dispatch(actionGetpolizaDetail(idPoliza))
            dispatch(actionGetArchivosPoliza(idPoliza))
            dispatch(actionGetObjetoVehiculo(idPoliza))
        },
        GetRecibosPoliza:(idPoliza, renovacion)=>{
            dispatch(actionGetRecibosPoliza(idPoliza, renovacion))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPoliza)
