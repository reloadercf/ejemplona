import React from 'react';
import {createStackNavigator} from 'react-navigation'
import {connect} from 'react-redux'
import Home from './Home/Home';
import DataUser from './Home/DataUser';
import CardDetailPublicacion from './Home/Publicaciones/CardDetailPublicacion';


let DataUserContainer = connect(state => ({userProfile:state.reducerUsuario.profile }))(DataUser);


const StackHome=createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions:{
            header:<DataUserContainer/>
        }
    },
    Detail:{
        screen:CardDetailPublicacion,
    },
   
})


export {StackHome};