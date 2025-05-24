import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    carousel: {
      width: Dimensions.get('window').width * 0.95,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      elevation: 5,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 10,
    },
    screen: {
      paddingTop: 20,
    },
    header: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    headerImg: {
      borderRadius: 75,
      width: 100,
      height: 100,
    },
    socialImg: {
      width: 70,
      height: 70,
      paddingHorizontal: 10,
    },
    heading: {
      fontSize: 30,
      textAlign: "center",
      padding: 20,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      height: 60,
      borderRadius: 15,
      marginHorizontal: "5%",
      marginVertical: 10,
      borderColor: 'grey',
      borderWidth: 1,
    },
    inputIcon: {
      padding: 10,
      marginLeft: 10,
      marginRight: 5,
      height: 40,
      width: 40,
      resizeMode: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#e87404",
      padding: 10,
      borderRadius: 15,
      width: "90%",
      alignSelf: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      paddingVertical: 5,
      textAlign: "center",
    },
    toogleTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    toggleText: {
      color: "blue",
      textAlign: "center",
      marginTop: 20,
      fontWeight: "bold",
      fontSize: 17,
    },
    forgetContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingRight: "10%",
    },
    loginWith: {
      textAlign: "center",
      marginTop: 30,
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
    },
    iconContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    loggedInContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    welcomeText: {
      fontSize: 24,
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      marginHorizontal: 20,
    },
    
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc',
    },
    
    dividerText: {
      marginHorizontal: 10,
      color: '#999',
      fontSize: 14,
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 15,
      backgroundColor: "#F7F4F4",
    },
    socialIcon: {
      marginRight: 10,
    }
  });

export default styles;