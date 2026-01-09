import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../config/theme';

const MetricCard = ({ title, value, icon, color = theme.colors.primary, onPress }) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            style={[styles.card, { borderLeftColor: color }]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={[styles.value, { color }]}>{value}</Text>
                </View>

                {icon && (
                    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                        {icon}
                    </View>
                )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderLeftWidth: 4,
        ...theme.shadows.small,
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
    },

    title: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },

    value: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: 'bold',
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: theme.borderRadius.round,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.md,
    },
});

export default MetricCard;
