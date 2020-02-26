import {createStackNavigator,createAppContainer} from 'react-navigation'
import SignIn from './SignIn';


const RutasNoAutenticadas = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                header: null,
                title: 'SignIn desde la screen'
            }
        }

    },
{
    headerMode:'none',
    navigationOptions:{
        title:'Titulo desde el StackNavigator'

    }

}

)
export default createAppContainer(RutasNoAutenticadas);