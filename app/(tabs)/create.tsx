import { createStyles } from '@/assets/style/create.posr.style';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function CreateScreen() {

  const router = useRouter();
  const {user} =useUser();

  const [caption,setCaption] =useState("");
  const [seletedImage,setSelectedImage]= useState<string |null >(null);

  if(!seletedImage)
  {
    return(
      <View style={createStyles.container}>
        <View style={createStyles.header}>
          <TouchableOpacity onPress={()=> router.back()}>
            <Ionicons name='arrow-back' size={28} color={COLORS.primary}>
            </Ionicons>
          </TouchableOpacity>
          <Text style={createStyles.headerTitle}>New Post</Text>
          <View style={{width:28}}></View>
        </View>
      </View>
    )
  }

  return (
    <View>

    </View>
  )
}