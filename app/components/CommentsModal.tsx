import { feedStyles } from '@/assets/style/feed.style'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'
import Comment from './Comment'
import Loader from './Loader'


type commentsModal = {
    postId: Id<"posts">
    visible: boolean,
    onClose: () => void;
    onCommentsAdded: () => void;
}
export default function CommentsModal({ onClose, onCommentsAdded, postId, visible }: commentsModal) {
    const [newComments, setNewComments] = useState("");
    const comments = useQuery(api.comments.getComment, { postId });
    const addComments = useMutation(api.comments.addComment);
    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={feedStyles.modalConatiner}>
                <View style={feedStyles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name='close' size={24} color={COLORS.white}></Ionicons>
                    </TouchableOpacity>
                    <Text style={feedStyles.modalTitle}>Comments</Text>
                    <View style={{ width: 24 }}></View>
                </View>

                {comments === undefined ? (
                    <Loader />
                )
                    :
                    (
                        <FlatList data={comments}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={feedStyles.contentsList}
                            renderItem={({ item }) => <Comment comment={item} />}
                        />
                    )
                }
                <View style={feedStyles.commentInput}>
                    <TextInput
                        style={feedStyles.input}
                        placeholder='Add a comment'
                        placeholderTextColor={COLORS.grey}
                        value={newComments}
                        onChangeText={setNewComments}
                        multiline
                    ></TextInput>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}