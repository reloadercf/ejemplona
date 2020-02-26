import React from 'react';
import {Text,ActivityIndicator,View,StatusBar, StyleSheet} from 'react-native'
import {createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import AsyncStorage from '@react-native-community/async-storage';
import Micartera from './Cartera/Micartera'
import Clientes from './Clientes/Clientes'
import Prospectos from './Prospectos/Prospectos'
import Puntos from './Puntos/Puntos'
import { StackHome } from './StackHome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SignIn from '../NoAutenticados/SignIn'
import ProfileUser from './Profile/ProfileUser';
import { StackCartera } from './Cartera/StackCartera';
import { autenticacion } from '../Store/servicios/Firebase'

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      //this._bootstrapAsync();
    }
    componentDidMount() {
      autenticacion.onAuthStateChanged(user => {
        console.log(user)
        this.props.navigation.navigate(user ? 'App' : 'Auth')
      })
    }

    // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //   console.log(userToken)
    //   const userToken = await AsyncStorage.getItem('userToken');
    //   this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }


  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });



const AppStack=createMaterialBottomTabNavigator({
    Home:{
        screen:StackHome,
        navigationOptions: {
            title: "Home",
            tabBarLabel: <Text style={{ color: "white" }}>Inicio</Text>,
            barStyle: { backgroundColor: "#001529" },
            tabBarIcon: <Icon size={24} name="home" style={{ color: "white" }} />
        },
    },
    Micartera:{
        screen:StackCartera,
        navigationOptions: {
            title: "Cartera",
            tabBarLabel: <Text style={{ color: "white" }}>Mi cartera</Text>,
            barStyle: { backgroundColor: "#001529" },
            tabBarIcon: <Icon size={24} name="book-open" style={{ color: "white" }} />
        },
    },
    Clientes:{
        screen:Clientes,
        navigationOptions: {
            title: "Clientes",
            tabBarLabel: <Text style={{ color: "white" }}>Clientes</Text>,
            barStyle: { backgroundColor: "#001529" },
            tabBarIcon: <Icon size={24} name="address-book" style={{ color: "white" }} />
        },
    },
    // Prospectos:{
    //     screen:Prospectos,
    //     navigationOptions: {
    //         title: "Clientes",
    //         tabBarLabel: <Text style={{ color: "white" }}>Prospectos</Text>,
    //         barStyle: { backgroundColor: "#281b39" },
    //         tabBarIcon: <Icon size={24} name="child" style={{ color: "white" }} />
    //     },
    // },
    // Puntos:{
    //     screen:Puntos,
    //     navigationOptions: {
    //         title: "Clientes",
    //         tabBarLabel: <Text style={{ color: "white" }}>Puntos</Text>,
    //         barStyle: { backgroundColor: "#281b39" },
    //         tabBarIcon: <Icon size={24} name="chart-bar" style={{ color: "white" }} />
    //     },
    // },
    Profile:{
      screen:ProfileUser,
      navigationOptions: {
          title: "Profile",
          tabBarLabel: <Text style={{ color: "white" }}>Profile</Text>,
          barStyle: { backgroundColor: "#001529" },
          tabBarIcon: <Icon size={24} name="user" style={{ color: "white" }} />
      },
  },
    
},
{
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#252a34' },
})

const AuthStack = createStackNavigator({
        SignIn: {
            screen: SignIn,
        }
},
{
    headerMode:'none',
    navigationOptions:{
        title:'Titulo desde el StackNavigator'
    }

}
)

export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ))