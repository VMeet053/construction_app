import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import theme from '../../config/theme';
import { formatDate } from '../../utils/dateHelpers';

const CustomDatePicker = ({
    label,
    value,
    onChange,
    error,
    touched,
    mode = 'date',
    placeholder = 'Select date',
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || new Date());

    const handleConfirm = (date) => {
        setSelectedDate(date);
        onChange(date);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.dateButton,
                    error && touched && styles.dateButtonError,
                ]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={[
                    styles.dateText,
                    !value && styles.placeholderText,
                ]}>
                    {value ? formatDate(value) : placeholder}
                </Text>
            </TouchableOpacity>

            {error && touched && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <DatePicker
                modal
                open={isOpen}
                date={selectedDate}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
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

    dateButton: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },

    dateButtonError: {
        borderColor: theme.colors.error,
    },

    dateText: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },

    placeholderText: {
        color: theme.colors.textSecondary,
    },

    errorText: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});

export default CustomDatePicker;
