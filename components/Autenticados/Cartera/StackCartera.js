
import {createStackNavigator} from 'react-navigation'
import Micartera from './Micartera';
import PolizasOtherCompanies from './PolizasOtherCompanies';
import DetailPoliza from './DetailPoliza';


const StackMiCartera=createStackNavigator({
    Mispolizas:{
        screen:Micartera,
        navigationOptions:{
            header:null
        }
    },
    DetailPoliza:{
        screen:DetailPoliza,
    } 
})

const StackCartera=createStackNavigator({
    MiCartera:{
        screen:StackMiCartera,
        navigationOptions:{
            header:null
        }
    },
    OtherPolizas:{
        screen:PolizasOtherCompanies,
        navigationOptions:{
            header:null
        }
    } 
})




export {StackCartera};