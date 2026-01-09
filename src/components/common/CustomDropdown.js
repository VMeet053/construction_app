import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import theme from '../../config/theme';

const CustomDropdown = ({
    label,
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    error,
    touched,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.dropdown,
                    error && touched && styles.dropdownError,
                ]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={[
                    styles.dropdownText,
                    !value && styles.placeholderText,
                ]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {error && touched && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === value && styles.selectedOption,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        item.value === value && styles.selectedOptionText,
                                    ]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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

    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },

    dropdownError: {
        borderColor: theme.colors.error,
    },

    dropdownText: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        flex: 1,
    },

    placeholderText: {
        color: theme.colors.textSecondary,
    },

    arrow: {
        fontSize: theme.fonts.sizes.xs,
        color: theme.colors.textSecondary,
    },

    errorText: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        width: '80%',
        maxHeight: '60%',
        ...theme.shadows.large,
    },

    option: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    selectedOption: {
        backgroundColor: theme.colors.primary + '20',
    },

    optionText: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
    },

    selectedOptionText: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
});

export default CustomDropdown;
