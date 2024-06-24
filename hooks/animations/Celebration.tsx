import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
    Easing,
    runOnJS,
} from 'react-native-reanimated';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const CONFETTI_COUNT = 50;

const Confetti = ({ delay }:any) => {
    const translateY = useSharedValue(-20);
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { translateX: translateX.value },
                { rotate: `${rotate.value}deg` },
            ],
        };
    });

    useEffect(() => {
        translateY.value = withDelay(
            delay,
            withRepeat(
                withTiming(HEIGHT + 20, { duration: 3000, easing: Easing.linear }),
                -1,
                false
            )
        );
        translateX.value = withRepeat(
            withTiming(Math.random() * 50 - 25, { duration: 1500 }),
            -1,
            true
        );
        rotate.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    return (
        <Animated.View
            style={[
                styles.confetti,
                animatedStyle,
                {
                    left: Math.random() * WIDTH,
                    backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
                        Math.random() * 255
                    })`,
                },
            ]}
        />
    );
};

const Celebration = () => {
    return (
        <View style={styles.container}>
            {[...Array(CONFETTI_COUNT)].map((_, index) => (
                <Confetti key={index} delay={Math.random() * 3000} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        backgroundColor: 'transparent',
    },
    confetti: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default Celebration;