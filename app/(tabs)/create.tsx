import { createStyles } from '@/assets/style/create.post.style';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';


export default function CreateScreen() {

  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [seletedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl)

  const createPost = useMutation(api.posts.createPost)

  const handleShare = async () => {
    console.log("Calling generateUploadUrl...");
    const uploadURL = await generateUploadUrl();
    console.log("Upload URL:", uploadURL);
    if (!seletedImage) return;
    try {
      setIsSharing(true);
      const uploadURL = await generateUploadUrl();

      // convert image URI to blob
      const response = await fetch(seletedImage);
      const blob = await response.blob();
      const uploadResult = await fetch(uploadURL, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: blob,
      });

      if (!uploadResult.ok) throw Error("Upload Failed");

      const { storageId } = await uploadResult.json();
      await createPost({ storageId, caption });
      router.push("/(tabs)")
    } catch (error) {
      console.log("Error in Sharing Post")
    }
    finally {
      setIsSharing(false)
    }
  }
  if (!seletedImage) {
    return (
      <View style={createStyles.container}>
        <View style={createStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={28} color={COLORS.primary}>
            </Ionicons>
          </TouchableOpacity>
          <Text style={createStyles.headerTitle}>New Post</Text>
          <View style={{ width: 28 }}></View>
        </View>

        <TouchableOpacity style={createStyles.emptyImageContainer} onPress={pickImage}>
          <Ionicons name='image-outline' size={48} color={COLORS.grey}></Ionicons>
          <Text style={createStyles.emptyImageText}>Tap on select an image</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={createStyles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}>

      <View style={createStyles.contentContainer}>
        {/* Header */}
        <View style={createStyles.header}>
          <TouchableOpacity onPress={() => {
            setSelectedImage(null);
            setCaption("");
          }}
            disabled={isSharing}
          >
            <Ionicons
              name='close-outline'
              size={28}
              color={isSharing ? COLORS.grey : COLORS.white}>
            </Ionicons>
          </TouchableOpacity>
          <Text style={createStyles.headerTitle}>New Post</Text>

          <TouchableOpacity style={[createStyles.shareButton, isSharing && createStyles.shareButtonDisabled]}
            disabled={isSharing || !setSelectedImage}
            onPress={handleShare}
          >
            {
              isSharing ? (<ActivityIndicator size={'small'} color={COLORS.primary}></ActivityIndicator>) : (
                <Text style={createStyles.shareText}>Share</Text>
              )
            }
          </TouchableOpacity>

        </View>
        <ScrollView
          contentContainerStyle={createStyles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps={"handled"}
          contentOffset={{ x: 0, y: 100 }}>

          <View style={[createStyles.content, isSharing && createStyles.contentDisabled]}>
            <View style={createStyles.imageSection}>
              <Image source={seletedImage}
                style={createStyles.previewImage}
                contentFit='cover'
                transition={200}>
              </Image>
              <TouchableOpacity style={createStyles.changeImageButton}
                onPress={pickImage}
                disabled={isSharing}>
                <Ionicons name='image-outline' size={20} color={COLORS.white}></Ionicons>
                <Text style={createStyles.changeImageText}>Change</Text>
              </TouchableOpacity>
            </View>
            {/* Input Section */}
            <View style={createStyles.inputSection}>

              <View style={createStyles.captionContainer}>
                <Image source={user?.imageUrl}
                  style={createStyles.userAvatar}
                  contentFit='cover'
                  transition={200}>
                </Image>
                <TextInput style={createStyles.captionInput}
                  placeholder='Write a caption...'
                  placeholderTextColor={COLORS.grey}
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}>
                </TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  )
}