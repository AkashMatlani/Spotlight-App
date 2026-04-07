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
    }
})

