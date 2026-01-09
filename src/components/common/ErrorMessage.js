import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../config/theme';

const ErrorMessage = ({ message, style }) => {
    if (!message) return null;

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.error + '20',
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.error,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
    },

    errorText: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.error,
    },
});

export default ErrorMessage;
