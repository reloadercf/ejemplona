//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
// import { Button } from 'react-native-paper';

// create a component
class Home extends Component {
    render() {
        const {navigation}=this.props
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Button title="Login" onPress={()=>{navigation.navigate('SignIn')}}/>
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
        backgroundColor: '#ffff',
    },
});

//make this component available to the app
export default Home;
