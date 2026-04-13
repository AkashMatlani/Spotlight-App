import { profileStyle } from '@/assets/style/profile.style';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import Loader from '../components/Loader';
import { COLORS } from '../constants/theme';

export default function profile() {

  const [isEditModelVisibale, setIsEditModelVisible] = useState(false);
  const [selectedPost, setSeletedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.posts.getPostByUser, {});
  const { signOut, userId } = useAuth();

  const currentUser = useQuery(api.users.getUserByClerkId, userId ? { clearkId: userId } : "skip");

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || "",
  });

  const handleSaveProfile = async() =>{}

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
            <Ionicons name='log-out-outline' size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        style={profileStyle.profileInfo}>
        {/* Avatar and Stats */}
        <View style={profileStyle.avatarAndStats}>
          <View style={profileStyle.avatarConatiner}>
            <Image source={currentUser?.image}
              style={profileStyle.avatar}
              contentFit='cover'
              transition={200} />
          </View>

          <View style={profileStyle.statsContiner}>
            <View style={profileStyle.statItem}>
              <Text style={profileStyle.statNumber}>{currentUser?.posts}</Text>
              <Text style={profileStyle.statLabel}>post</Text>
            </View>
            <View style={profileStyle.statItem}>
              <Text style={profileStyle.statNumber}>{currentUser?.followers}</Text>
              <Text style={profileStyle.statLabel}>Followers</Text>
            </View>
            <View style={profileStyle.statItem}>
              <Text style={profileStyle.statNumber}>{currentUser?.following}</Text>
              <Text style={profileStyle.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        <Text style={profileStyle.name}>{currentUser?.fullname}</Text>
        {currentUser?.bio && <Text style={profileStyle.bio}>{currentUser?.bio}</Text>}

        <View style={profileStyle.actionButtons}>
          <TouchableOpacity style={profileStyle.editButton} onPress={() => setIsEditModelVisible(true)}>
            <Text style={profileStyle.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={profileStyle.shareButton}>
            <Ionicons name='share-outline' size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {posts?.length === 0 && <NoPostFound />}

        <FlatList data={posts}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={profileStyle.gridItem}
              onPress={() => setSeletedPost(item)}
            >
              <Image source={item.imageUrl}
                style={profileStyle.gridImage}
                contentFit='cover'
                transition={200}>
              </Image>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModelVisibale}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setIsEditModelVisible(false)}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={profileStyle.modalContainer}
          >
            <View style={profileStyle.modalContent}>
              <View style={profileStyle.modalHeader}>
                <Text style={profileStyle.modalTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setIsEditModelVisible(false)}>
                  <Ionicons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={profileStyle.inputContainer}>
                <Text style={profileStyle.inputLabel}>Name</Text>
                <TextInput
                  style={profileStyle.input}
                  value={editedProfile.fullname}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, fullname: text }))}
                  placeholderTextColor={COLORS.grey}
                ></TextInput>
              </View>

              <View style={profileStyle.inputContainer}>
                <Text style={profileStyle.inputLabel}>Bio</Text>
                <TextInput
                  style={[profileStyle.input, profileStyle.bioInput]}
                  value={editedProfile.bio}
                  onChangeText={(text) => setEditedProfile((prev) => ({ ...prev, bio: text }))}
                  placeholderTextColor={COLORS.grey}
                ></TextInput>
              </View>
              <TouchableOpacity onPress={handleSaveProfile} style={profileStyle.saveButton}>
                <Text style={profileStyle.saveButtonText}> Save Changes</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

      </Modal>

      {/* Selected Image Modal */}
      <Modal visible={!!selectedPost}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setSeletedPost(null)}
      >
        <View style={profileStyle.modalBackdrop}>
          {selectedPost && (
            <View style={profileStyle.postDetailContainer}>
              <View style={profileStyle.postDetailHeader}>
                <TouchableOpacity onPress={() => setSeletedPost(null)}>
                  <Ionicons name='close' size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <Image source={selectedPost.imageUrl}
                cachePolicy={'memory-disk'}
                style={profileStyle.postDetailImage}></Image>
            </View>
          )}
        </View>
      </Modal>
    </View>
  )
}


function NoPostFound() {
  return (
    <View style={{
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background
    }}
    >
      <Ionicons name="image-outline" size={48} color={COLORS.primary} />
      <Text style={{ fontSize: 20, color: COLORS.white }}>No posts yet</Text>
    </View>
  )
}