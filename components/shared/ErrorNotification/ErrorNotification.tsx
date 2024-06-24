import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {ErrorNotificationProps} from "@/components/shared/ErrorNotification/ErrorNotification.props";


const ErrorNotification = ({error}: ErrorNotificationProps) => {
    const [isShown, setIsShown] = useState<boolean>(false)


    useEffect(() => {
        if (!error) {
            return;
        }
        setIsShown(true)
        const timerId = setTimeout(() => {
            setIsShown(false)
        }, 3000);
        return () => {
            clearTimeout(timerId)
        }

    }, [error]);

    if (!isShown) {
        return <></>
    }
    return (
        <View style={styles.error}>
            <Text style={styles.errorText}>
                {error}
            </Text>
        </View>

    );
};
const styles = StyleSheet.create({
    error: {
        position: "absolute",
        width: Dimensions.get('screen').width,
        backgroundColor: '#E83545',
        padding: 15
    },
    errorText: {
        fontSize: 16,
        color: "#EB2E0E"
    }
})

export default ErrorNotification;
