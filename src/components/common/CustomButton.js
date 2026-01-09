import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../../config/theme';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}) => {
    const buttonStyles = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? '#fff' : theme.colors.primary}
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={textStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
    },

    secondary: {
        backgroundColor: theme.colors.secondary,
    },

    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },

    ghost: {
        backgroundColor: 'transparent',
    },

    success: {
        backgroundColor: theme.colors.success,
    },

    danger: {
        backgroundColor: theme.colors.error,
    },

    // Sizes
    small: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
    },

    medium: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
    },

    large: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
    },

    // Disabled
    disabled: {
        backgroundColor: theme.colors.disabled,
        opacity: 0.6,
    },

    // Text styles
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },

    primaryText: {
        color: '#fff',
    },

    secondaryText: {
        color: '#fff',
    },

    outlineText: {
        color: theme.colors.primary,
    },

    ghostText: {
        color: theme.colors.primary,
    },

    successText: {
        color: '#fff',
    },

    dangerText: {
        color: '#fff',
    },

    smallText: {
        fontSize: theme.fonts.sizes.sm,
    },

    mediumText: {
        fontSize: theme.fonts.sizes.md,
    },

    largeText: {
        fontSize: theme.fonts.sizes.lg,
    },
});

export default CustomButton;
