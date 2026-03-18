import { COLORS } from '@/app/constants/theme';
import { StyleSheet } from 'react-native';

export const feedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 24,
        color: COLORS.primary,
    },
    storyWrapper: {
        alignItems: 'center',
        marginHorizontal: 8,
        width: 72,
    },
    storyRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        padding: 2,
        backgroundColor: COLORS.background,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginBottom: 4,
    },
    noStory: {
        borderColor: COLORS.grey,
    },
    storyAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    storyUsername: {
        fontSize: 11,
        color: COLORS.white,
        textAlign: 'center',
    },
    storiesContainer:{
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:COLORS.surface
    }
})