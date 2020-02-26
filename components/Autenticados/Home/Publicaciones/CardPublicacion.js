import React from 'react';
import {Card, Title, Paragraph,TouchableRipple } from 'react-native-paper';
import {StyleSheet, View } from 'react-native';
const CardPublicacion = ({
    slug, titulo, categoria, imagen_destacada_uno, url,cuerpo_uno,redactado_por,fecha_publicacion,
    navigation
}) => (
        <Card>
            <Card.Content>
                <Title style={styles.text}>{titulo}</Title>
                <View>
                  <Paragraph>{fecha_publicacion} {redactado_por}</Paragraph>
                </View>
            </Card.Content>

            <TouchableRipple
                onPress={() => { navigation.navigate('Detail', { slug: slug }) }}
                rippleColor="rgba(0, 0, 0, .9)"
            >
                <Card.Cover source={{ uri: imagen_destacada_uno }} />
            </TouchableRipple>
          
        </Card>


 
);

// define your styles
const styles = StyleSheet.create({
    text: {
        fontFamily:"Helvetica",
        fontSize:14,
        letterSpacing:1,
        fontWeight:"600"
    },
    parrafo:{

    }
});
export default CardPublicacion;
