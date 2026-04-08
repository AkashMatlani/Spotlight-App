import { COLORS } from "@/app/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    username: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.white,
    },
    headerRight: {
        flexDirection: "row",
        gap: 16,
    },
    headerIcon: {
        padding: 4,
    },
    profileInfo: {
        padding: 16,
    },
    avatarAndStats: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    avatarConatiner: {
        marginRight: 32,
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 2,
        borderColor: COLORS.surface,
    }
})

