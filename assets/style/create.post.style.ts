import { COLORS } from '@/app/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

export const createStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.white
    },
    emptyImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    emptyImageText: {
        fontSize: 16,
        color: COLORS.grey,
    },
    contentContainer: {
        flex: 1,
    },
    shareButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    shareButtonDisabled: {
        opacity: 0.5,
    },
    shareText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    shareTextDisabled: {
        color: COLORS.grey,
    },
});