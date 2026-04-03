
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
    },
    listContainer: {
        padding: 16,
    },
    notificationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    notificationContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    avatarConatiner: {
        position: "relative",
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: COLORS.surface,
    },
    iconBadge: {
        position: "absolute",
        bottom: -4,
        right: -4,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: COLORS.surface,
    },
    notificationInfo: {
        flex: 1,
    },
    userName: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 2,
    },
    action:{
        color:COLORS.grey,
        fontSize:14,
        marginBottom:2,
    },
    timeAgo:{
        color:COLORS.grey,
        fontSize:12,
    }
})