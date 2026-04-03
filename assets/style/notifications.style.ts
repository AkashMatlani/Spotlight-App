
import { COLORS } from "@/app/constants/theme";
import { StyleSheet } from "react-native";
export const nofificationStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centerd: {
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: "jetbrains-mono-bold",
        color: COLORS.primary,
    }

})