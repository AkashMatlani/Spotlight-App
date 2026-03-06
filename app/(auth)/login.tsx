import { loginStyles } from '@/assets/style/login.style';
import { useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Login() {

  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('OAuth Login failed:', error);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Image source={require('@/assets/images/adaptive-icon.png')}
        style={loginStyles.logo}
      />
      <View style={loginStyles.logoText}>
        <Text style={loginStyles.text}>Spotlight</Text>
        <Text style={loginStyles.subText}>don't miss the anything</Text>
      </View>

      {/* IllustationContainer*/}
      <View style={loginStyles.illustationContainer}>
        <Image
          source={require('@/assets/images/auth-bg-2.png')}
          resizeMode="cover"
          style={loginStyles.illustration}
        />

      </View>

      {/* Google Login */}
      <View style={loginStyles.loginSection}>
        <TouchableOpacity style={loginStyles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}>

          <View style={loginStyles.googleIconContainer}>
            <Ionicons name='logo-google' size={20} color={COLORS.surface}/>
          </View>
          <Text style={loginStyles.googleText}>Continue with google</Text>
        </TouchableOpacity>

        <Text style={loginStyles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}