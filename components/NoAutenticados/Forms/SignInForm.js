import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'
import {Field, reduxForm} from 'redux-form'
import DipraTextInput from '../../assets/DipraTextInput';
import { HelperText, TextInput } from 'react-native-paper';


const fieldString =(props)=>{
    return(
        <View>
            <View >
                <TextInput
                    mode={'outlined'}
                    placeholder={props.ph}
                    onChangeText={props.input.onChange}
                    value={props.input.value}
                    autoCapitalize='none'
                    secureTextEntry={(props.input.name==='password')?true:false}
                    onBlur={props.input.onBlur}
                    selectionColor={'#293462'}
                 
                
                />
                 {props.meta.touched && props.meta.error && 
                 <HelperText
                    type="error"
                >
                  {props.meta.error}
                </HelperText>}
                
            </View>
        </View> 
    )
}


const required = value => (value || typeof value === 'number' ? undefined : 'Campo requerido')

const maxLength = max => value =>
  value && value.length > max ? `El campo deve ser menor a ${max} caracteres` : undefined
const maxLength15 = maxLength(12)
const maxLength6 = maxLength(6)

export const minLength = min => value =>
  value && value.length < min ? `El campo debe ser mayor a ${min} caracteres` : undefined
export const minLength2 = minLength(5)
const number = value =>
  value && isNaN(Number(value)) ? 'El campo debe ser un numero' : undefined
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Direccion de correo invalida'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Numero invalido de telefono debe ser de 10 digitos'
    : undefined



const SignInForm = (props) => {
    return (
        <View>
            <Field name="username" component={fieldString} ph="usuario" validate={[required]}  />
            <Field name="password" component={fieldString} ph="contraseña"  validate={[required]}  />
            <View style={styles.buttonView}>
            <View style={styles.boton}><Button
                    style={{borderRadius: 7, padding: 10}}
                    title="ENTRAR"
                    color="#000068"
                    onPress={props.handleSubmit(props.login)}
                    
                    />
                    </View>
            </View>
            
        </View>
    );
};


export default reduxForm({
    form: 'SignInForm'
})(SignInForm)


const styles = StyleSheet.create({
    textInput: {
        marginBottom: 10
    },
    errors:{
        color: '#FF0000'
    },
    buttonView:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        marginVertical: 6,
    },
    boton:{
        paddingTop:20,
        color: '#001529',
        width:"100%",
    },

})
