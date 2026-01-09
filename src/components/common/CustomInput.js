import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../config/theme';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    touched,
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 1,
    editable = true,
    icon,
    style,
    inputStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputContainer}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}

                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        error && touched && styles.inputError,
                        !editable && styles.inputDisabled,
                        icon && styles.inputWithIcon,
                        inputStyle,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    {...props}
                />
            </View>

            {error && touched && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },

    label: {
        fontSize: theme.fonts.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },

    inputWithIcon: {
        paddingLeft: theme.spacing.xl + theme.spacing.md,
    },

    multilineInput: {
        paddingTop: theme.spacing.sm,
        textAlignVertical: 'top',
    },

    inputError: {
        borderColor: theme.colors.error,
    },

    inputDisabled: {
        backgroundColor: theme.colors.background,
        color: theme.colors.disabled,
    },

    iconContainer: {
        position: 'absolute',
        left: theme.spacing.md,
        zIndex: 1,
    },

    errorText: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});

export default CustomInput;
