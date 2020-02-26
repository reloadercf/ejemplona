//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import { autenticacion } from '../../Store/servicios/Firebase'
import AsyncStorage from '@react-native-community/async-storage';
import { Button,Avatar,IconButton, Colors } from 'react-native-paper';


// create a component
class ProfileUser extends Component {

    _signOutAsync = async () => {
        autenticacion.signOut()
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };


    render() {
        const {profile_usuario:{clave,foto,sucursal}, first_name, last_name, email,username}=this.props.userProfile
        console.log(this.props.userProfile)
        return (
            <View style={styles.container}>
                <View >
                 
                    {foto? <Avatar.Image size={100} source={{uri:foto}}  />:<Avatar.Icon size={100} icon="face" color="#fff"  style={{backgroundColor:"#0b2440"  }}  />}
                </View>
                <View  style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                    <View style={[styles.generalPoliza, styles.encabezadoPoliza]}>
                            <Avatar.Icon size={40} icon="flag"  style={{marginRight:10, backgroundColor:"#0b2440"  }}/>
                            <Text style={styles.styleTitulos}>
                                {username}
                            </Text>
                    </View>
                    <View style={[styles.generalPoliza, styles.encabezadoPoliza]}>
                            <Avatar.Icon size={40} icon="face"  style={{marginRight:10,backgroundColor:"#0b2440"  }}/>
                            <Text style={styles.styleTitulos}>
                                {first_name} {last_name} 
                            </Text>
                    </View>
                    <View style={[styles.generalPoliza, styles.encabezadoPoliza]}>
                            <Avatar.Icon size={40} icon="whatshot"  style={{marginRight:10,backgroundColor:"#0b2440"  }}/>
                            <Text style={styles.styleTitulos}>
                            {clave} 
                            </Text>
                    </View>
                    <View style={[styles.generalPoliza, styles.encabezadoPoliza]}>
                            <Avatar.Icon size={40} icon="markunread"  style={{marginRight:10,backgroundColor:"#0b2440"  }}/>
                            <Text style={styles.styleTitulos}>
                            {email}
                            </Text>
                    </View>

                </View>
                <Button icon="lock" color='#0d0f75' mode="contained" onPress={() => this._signOutAsync()}>
                    Cerrar Sesion
                </Button>
               
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"column",
        alignItems: 'center',
        justifyContent:"space-around",
        backgroundColor: '#fff',
        height:"100%"
    },
    generalPoliza:{
        marginVertical:15,
        marginHorizontal:10,
        display:"flex"
    },
    styleTitulos:{
        fontSize:16,
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
    encabezadoPoliza:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
});


const mapStateToProps = state => ({
    usuario: state.reducerSesion,
    userProfile: state.reducerUsuario.profile
});
export default connect(mapStateToProps)(ProfileUser);
