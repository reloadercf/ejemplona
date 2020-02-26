import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar,IconButton, Colors} from 'react-native-paper';
// create a component
class DataUser extends Component {
    render() {
        if (this.props.userProfile) {
            const {profile_usuario:{clave,foto,sucursal}, first_name, last_name}=this.props.userProfile

            console.log(this.props.userProfile)
            return (

                <View style={styles.container}>
                    {foto? <Avatar.Image size={70} source={{uri:foto}}  />:<Avatar.Icon size={70} icon="face" color="#fff"  style={{backgroundColor:"#0b2440"  }}  />}
                    <View style={styles.viewDataUser}>
                        <Text style={styles.TextDataUser}>
                            {first_name} {last_name}
                        </Text>
                    </View>
                </View>

            );
        }
        else {
            return null

        }
        
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'row-reverse',
        width:'100%',
        backgroundColor: '#001529',
        padding:15
    },
    viewDataUser:{
        display:'flex',
        flexDirection:'column',
        justifyContent: 'flex-end',
        padding:20,
    },
    TextDataUser:{
        fontFamily:"Helvetica",
        color:'#fff',
    }
});

//make this component available to the app
export default DataUser;
