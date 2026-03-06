import { COLORS } from '@/app/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    logo: {
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        marginBottom: 20,
        marginTop: 100,
        alignSelf: "center"
    },

    logoText: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: COLORS.grey
    },
    subText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
        color: COLORS.grey
    },
    illustationContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    illustration: {
        width: width * 0.75,
        height: width * 0.75,
        maxHeight: 280,
    },

    loginSection: {
        width: "100%",
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: "center",
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:COLORS.white,
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 20,
        width: "100%",
        maxWidth: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    googleIconContainer: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    googleText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.surface,
    },
    termsText: {
        textAlign: "center",
        fontSize: 12,
        color: COLORS.grey,
        maxWidth: 280,
    }

});   