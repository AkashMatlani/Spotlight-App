import { COLORS } from '@/app/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

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
    storiesContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surface
    },
    post: {
        marginBottom: 16,
    },
    postHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    postUserName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white
    },
    postImage: {
        width: width,
        height: width
    },
    postAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,

    },
    postActionsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,

    },
    postInfo: {
        paddingHorizontal: 12,
    },
    likeText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 6,
    },
    captionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 6,
    },
    captionUsername: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white,
        marginRight: 6,
    },
    captionText: {
        fontSize: 14,
        color: COLORS.white,
        flex: 1,
    },
    commentsText: {
        fontSize: 14,
        color: COLORS.grey,
        marginBottom: 4,
    },
    timeAgo: {
        fontSize: 12,
        color: COLORS.grey,
        marginBottom: 8,
    }

})