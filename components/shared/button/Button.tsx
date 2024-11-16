import {
  Animated,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';
import { BorderRadius, Colors, FontSize } from '@/components/shared/tokens';

import React from 'react';

const Button = ({ text, ...props }: PressableProps & { text: string }) => {
  const animatedValue = new Animated.Value(100);
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.softWhite, Colors.accentColor],
  });
  const fadeIn = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,

      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View style={{ ...styles.button, backgroundColor: color }}>
        <Text className="text-2xl text-white">{text}</Text>
      </Animated.View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.r10,
    height: 58,
    backgroundColor: Colors.accentColor,
    marginTop: 20,
  },
  text: {
    color: Colors.pureWhite,
    fontSize: FontSize.fs18,
  },
});
export default Button;
