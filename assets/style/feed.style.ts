import { COLORS } from '@/app/constants/theme';
import { StyleSheet } from 'react-native';

export const feedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:COLORS.surface,
    },
    headerTitle:{
        fontSize:24,
        color:COLORS.primary,
    }
})