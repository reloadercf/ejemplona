import * as React from 'react'
import {StyleSheet, TextInput} from 'react-native'

const BLUE="#428Af8"
const LIGHT_GRAY="#D3D3D3"



class DipraTextInput extends React.Component {
    constructor(props){
        super(props)
        {
            this.state={
                isFocused:false
            }
        }
    }

    handleFocus=event=>{
        this.setState({isFocused:true})
        if(this.props.onFocus){
            this.props.onFocus(event)
        }
    }

    handleBlur=event=>{
        this.setState({isFocused:false})
        if(this.props.onBlur){
            this.props.onBlur(event)
        }
    }
    render() {
        const {isFocused}=this.state   
        const{onFocus, onBlur, placeholder, value, onChangeText,autoCapitalize,secureTextEntry}=this.props     

    return (
     
        <TextInput
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            onChangeText={onChangeText}
            placeholder={placeholder}
            selectionColor={BLUE}
            underlineColorAndroid={
                isFocused ? BLUE : LIGHT_GRAY
            }
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.textInput}
            value={value}
        />

        );
    }
    
}
const styles = StyleSheet.create({
    textInput:{
        height:40,
        paddingLeft: 20,
    }
})


export default DipraTextInput;