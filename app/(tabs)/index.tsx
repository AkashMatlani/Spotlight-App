import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
export default function Index() {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
