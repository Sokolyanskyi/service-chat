import React, {useState} from 'react';
import {Pressable, StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {BorderRadius, Colors, FontSize} from "@/components/shared/tokens";
import {FontAwesome5} from "@expo/vector-icons";

const Input = ({isPassword, ...props}: TextInputProps & { isPassword?: boolean }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    return (<View>
            <TextInput {...props} style={styles.input} placeholderTextColor={Colors.placeholder}
                       secureTextEntry={isPassword && !isPasswordVisible}
            />
            {isPassword && <Pressable style={styles.eyeIcon} onPress={() => setIsPasswordVisible(state => !state)}>
                {isPasswordVisible ? <FontAwesome5 name="eye" size={24} color={Colors.placeholder}/> :
                    <FontAwesome5 name="eye-slash" size={24} color={Colors.placeholder}/>}
            </Pressable>}
        </View>

    );
};
const styles = StyleSheet.create({
    input: {
        height: 58,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.r10,
        backgroundColor: Colors.softWhite,
        fontSize: FontSize.fs16

    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 18
    }
})
export default Input;
