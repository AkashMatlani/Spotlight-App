import { profileStyle } from '@/assets/style/profile.style';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Loader from '../components/Loader';
import { COLORS } from '../constants/theme';

export default function profile() {

  const { signOut, userId } = useAuth();

  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clearkId: userId } : "skip");

  if (!currentUser === undefined) return <Loader />
  return (
    <View style={profileStyle.container}>
      {/* Header */}

      <View style={profileStyle.header}>
        <View style={profileStyle.headerLeft}>
          <Text style={profileStyle.username}>{currentUser?.username}</Text>
        </View>
        <View style={profileStyle.headerRight}>
          <TouchableOpacity style={profileStyle.headerIcon} onPress={() => signOut()}>
            <Ionicons name='log-out-outline' size={24} color={COLORS.white}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}