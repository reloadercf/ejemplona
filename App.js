import React from 'react';
import { StyleSheet, View,Alert } from 'react-native';
import { Provider } from 'react-redux';
import Store from './components/Store/Store';
import Principal from './components/Principal';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';


console.disableYellowBox = ['Remote debugger'];
export default class App extends React.Component {

  componentDidMount(){
    this.checkPermission()
    this.createNotificationListeners()
    this.createNotificationChannel()
  }

  componentWillUnmount(){
    this.notificationListener()
    this.notificationOpenedListener()
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
        this.notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
        });
        
    } else {
        this.requestPermission();
       
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken)
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
      
        if (fcmToken) {
            // user has a device token
            console.log(fcmToken)
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
  
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        //this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }



  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new firebase.notifications.Android.Channel(
      "reminder", // channelId
      "Reminders Channel", // channel name
      firebase.notifications.Android.Importance.High // channel importance
    ).setDescription("Used for getting reminder notification"); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={Store}>
          <Principal />
        </Provider>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily:"Helvetica",
    fontSize:20,
    letterSpacing:3,
    backgroundColor: '#fff',
  },
});
