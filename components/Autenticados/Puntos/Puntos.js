//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class Puntos extends Component {

    render() {
        const {navigation}=this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Text>Puntos</Text>
                {/* <Button title="Autor" onPress={()=>{navigation.navigate('Autor')}}/>
                <Button title="Comentarios" onPress={()=>{navigation.navigate('Comentarios')}}/> */}
            </View>
        );
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Puntos;
