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
    },
    statsContiner: {
        justifyContent: "space-around",
        flexDirection: "row",
        flex: 1,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.white,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: COLORS.grey,
    },
    name: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.white,
        marginBottom: 4,
    },
    bio: {
        fontSize: 14,
        color: COLORS.white,
        lineHeight: 20,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    },
    editButton: {
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    editButtonText: {
        color: COLORS.white,
        fontWeight: "600",
        fontSize: 14,
    },
    shareButton: {
        backgroundColor: COLORS.surface,
        padding: 8,
        borderRadius: 8,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    gridItem: {
        flex: 1,
        aspectRatio: 1,
        padding: 1,
    },
    gridImage: {
        flex: 1,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
    },
    postDetailContainer: {
        backgroundColor: COLORS.background,
        maxHeight: height * 0.9,
    },
    postDetailHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    postDetailImage: {
        width: width,
        height: width,
    }

})