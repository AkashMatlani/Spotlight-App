import { nofificationStyle } from '@/assets/style/notifications.style'
import { Ionicons } from '@expo/vector-icons'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../constants/theme'

export default function Notifications({ notification }: any) {
  return (
    <View style={nofificationStyle.notificationItem}>
      <View style={nofificationStyle.notificationContent}>
        <Link href={'/notifications'} asChild>
          <TouchableOpacity style={nofificationStyle.avatarConatiner}>
            <Image source={notification.sender.image}
              style={nofificationStyle.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={nofificationStyle.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name='heart' size={14} color={COLORS.primary} />
              ) :
                notification.type === "follow" ? (<Ionicons name='person-add' size={14} color="#8B5CF6" />

                ) : (<Ionicons name='chatbubble' size={14} color="#3B82F6" />)}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={nofificationStyle.notificationInfo}>
          <Link href={"/notifications"} asChild>
            <TouchableOpacity>
              <Text style={nofificationStyle.userName}>{notification.sender.username}</Text>
            </TouchableOpacity>
          </Link>

          <Text style={nofificationStyle.action}>
            {notification.type === "follow" ?
              "started following you"
              :
              notification.type === "like"
                ? "liked your post"
                :
                `commented: "${notification.comment}"`}
          </Text>
          <Text style={nofificationStyle.timeAgo}>
            {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
          </Text>
        </View>
      </View>

      {notification.post && (
        <Image source={notification.post.imageUrl}
          style={nofificationStyle.postImage}
          contentFit='cover'
          transition={200} />
      )}

    </View>
  )
}