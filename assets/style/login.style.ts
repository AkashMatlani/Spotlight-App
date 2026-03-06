import { COLORS } from '@/app/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
    container:{
        flex:1,
    },
    logo:{
        alignItems:"center",
        justifyContent:"center",
        height:100,
        width:100,
        marginBottom:20,
        marginTop:100,
        alignSelf:"center"
    },

    logoText:{
       alignItems:"center",
       justifyContent:"center",
    },
    text:{
        fontSize:26,
        fontWeight:"bold",
        marginBottom:10,
        textAlign:"center",
        color:COLORS.grey
    },
     subText:{
        fontSize:18,
        marginBottom:10,
        textAlign:"center",
        color:COLORS.grey
    },
  illustationContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },

   illustration: {
    width: width * 0.75,
    height: width * 0.75,
    maxHeight: 280,
  },

});   