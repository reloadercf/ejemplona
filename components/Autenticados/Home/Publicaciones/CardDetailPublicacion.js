//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,Image,ActivityIndicator,Linking } from 'react-native';
import { Button } from 'react-native-paper';
import {connect} from 'react-redux'
import { actionGetArticuloDetail } from '../../../Store/acciones/AccionesRevista';
import { actionGetRecibosPoliza } from '../../../Store/acciones/AccionesCartera';

 // create a component
class CardDetailPublicacion extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    
    componentDidMount(){
        this.props.getArticuloDetail(this.props.navigation.state.params.slug);
    }

    handleUrl = (url) => {
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log(`Don't know how to open URI: ${url}`);
          }
        });
      };
      

    render() {
        const {articulo}=this.props
        
        if(articulo){
            return (
                <ScrollView style={styles.container}>
                    
                    <View style={styles.viewImage}>
                        <Image
                            source={{ uri: articulo.imagen_destacada_uno }}
                            style={{
                                width: 400, height: 300, resizeMode: 'contain',
                            }}

                        />
                    </View>
                    <View>
                        <Text style={styles.titleText}>{articulo.titulo}</Text>
                        <Text> Redactado por <Text style={styles.tagtext}>@{articulo.redactado_por}  <Text style={styles.tagfecha}> el  {articulo.fecha_publicacion}</Text></Text></Text>
                    </View>
                    <View>
                        <Text style={styles.textarticle}>{articulo.cuerpo_uno}</Text>
                    </View>
                    <Image
                            source={{ uri: articulo.imagen_destacada_dos }}
                            style={{
                                width: "100%", height: 300, resizeMode: 'contain',
                            }}

                        />
                    <View>
                        <Text style={styles.textarticle}>{articulo.cuerpo_dos}</Text>
                    </View>
                    {articulo.url_llamada_uno?
                    <Button mode="contained" icon="exit-to-app" color='#021257' onPress={() => { this.handleUrl(articulo.url_llamada_uno) }}>
                        {articulo.llamada_per_uno?articulo.llamada_per_uno:continuar}
                    </Button>:null}

                    {articulo.urlvideo?
                    <Button mode="contained" icon='airplay' color='#c4302b' onPress={() => { this.handleUrl(articulo.urlvideo) }} style={{marginBottom: 10,marginTop:10}}>
                        Ver Video
                    </Button>:null}

                    
                </ScrollView>
                
            );

        }
        else{
            return (
                <View style={[styles.containerpreview, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        
    }
}

// define your styles airplay
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffff',
        marginBottom: 10,
    },
    viewImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing:1.5,
        lineHeight:25,
        padding:10,
        color:'#000000'
      },
    containerpreview: {
        flex: 1,
        justifyContent: 'center'
      },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
      textarticle: {
        color:'#000000',
        textAlign:'justify',
        padding: 10,
        letterSpacing:1.5,
        lineHeight:20

      },
      tagtext:{
          color:'#005eff',
          textAlign:'right',
      },
      tagfecha:{
        color:'#02156A',
        textAlign:'right',
    }
});


const mapStateToProps = (state) => {
    return {
        articulo: state.reducerRevista.articulo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getArticuloDetail: (slug) => {
            dispatch(actionGetArticuloDetail(slug));
            dispatch(actionGetRecibosPoliza())
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailPublicacion)

