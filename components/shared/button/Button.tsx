import React from 'react';

import {Pressable, PressableProps, Text, View, StyleSheet, Animated} from 'react-native';
import {BorderRadius, Colors, FontSize} from "@/components/shared/tokens";


const Button = ({text, ...props}: PressableProps & { text: string }) => {
    const animatedValue = new Animated.Value(100)
    const color = animatedValue.interpolate({
        inputRange:[0,100],
        outputRange:[Colors.softWhite,Colors.softPurple]
    })
    const fadeIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start()
    }
    const fadeOut = () => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 100,

            useNativeDriver: false
        }).start()
    }


    return (
        <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View
                style={{...styles.button, backgroundColor:color}}>
                <Text style={styles.text}>{text}</Text>
            </Animated.View>

        </Pressable>
    );
};
const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: BorderRadius.r10,
        height: 58,

    },
    text: {
        color: Colors.softWhite,
        fontSize: FontSize.fs18
    }
})
export default Button;
