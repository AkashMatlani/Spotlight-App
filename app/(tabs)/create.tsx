import { createStyles } from '@/assets/style/create.post.style';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
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
            onPress={handleShare}>
            {
              isSharing ? (<ActivityIndicator size={'small'} color={COLORS.primary}></ActivityIndicator>) : (
                <Text style={createStyles.shareText}>Share</Text>

              )
            }
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView >
  )
}