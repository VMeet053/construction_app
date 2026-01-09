import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { Formik } from 'formik';
import { useSite } from '../../context/SiteContext';
import { materialSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { calculateAmount, formatCurrency } from '../../utils/calculations';

const MaterialPurchaseScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        const total = calculateAmount(values.quantity, values.rate);
        Alert.alert(
            'Success',
            `Material added successfully!\nTotal: ${formatCurrency(total)}`,
            [{ text: 'OK', onPress: () => resetForm() }]
        );
    };

    if (!selectedSite) {
        return (
            <View style={styles.noSiteContainer}>
                <Text style={styles.noSiteIcon}>🏗️</Text>
                <Text style={styles.noSiteText}>Please select a site first</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.siteText}>{selectedSite.name}</Text>
                </View>

                <Formik
                    initialValues={{
                        materialName: '',
                        quantity: '',
                        rate: '',
                        supplier: '',
                        billNumber: '',
                    }}
                    validationSchema={materialSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                        const total = calculateAmount(values.quantity, values.rate);

                        return (
                            <View style={styles.form}>
                                <CustomInput
                                    label="Material Name *"
                                    value={values.materialName}
                                    onChangeText={handleChange('materialName')}
                                    onBlur={handleBlur('materialName')}
                                    error={errors.materialName}
                                    touched={touched.materialName}
                                    placeholder="Enter material name"
                                />

                                <CustomInput
                                    label="Quantity *"
                                    value={values.quantity}
                                    onChangeText={handleChange('quantity')}
                                    onBlur={handleBlur('quantity')}
                                    error={errors.quantity}
                                    touched={touched.quantity}
                                    placeholder="Enter quantity"
                                    keyboardType="numeric"
                                />

                                <CustomInput
                                    label="Rate (₹) *"
                                    value={values.rate}
                                    onChangeText={handleChange('rate')}
                                    onBlur={handleBlur('rate')}
                                    error={errors.rate}
                                    touched={touched.rate}
                                    placeholder="Enter rate per unit"
                                    keyboardType="numeric"
                                />

                                {values.quantity && values.rate && (
                                    <View style={styles.totalCard}>
                                        <Text style={styles.totalLabel}>Total Amount:</Text>
                                        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                                    </View>
                                )}

                                <CustomInput
                                    label="Supplier *"
                                    value={values.supplier}
                                    onChangeText={handleChange('supplier')}
                                    onBlur={handleBlur('supplier')}
                                    error={errors.supplier}
                                    touched={touched.supplier}
                                    placeholder="Enter supplier name"
                                />

                                <CustomInput
                                    label="Bill Number"
                                    value={values.billNumber}
                                    onChangeText={handleChange('billNumber')}
                                    onBlur={handleBlur('billNumber')}
                                    error={errors.billNumber}
                                    touched={touched.billNumber}
                                    placeholder="Enter bill number (optional)"
                                />

                                <CustomButton
                                    title="Add Material"
                                    onPress={handleSubmit}
                                    loading={isSubmitting}
                                />
                            </View>
                        );
                    }}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    scrollContent: {
        padding: theme.spacing.md,
    },

    header: {
        marginBottom: theme.spacing.md,
    },

    siteText: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    form: {
        width: '100%',
    },

    totalCard: {
        backgroundColor: theme.colors.primary + '20',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    totalLabel: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },

    totalValue: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },

    noSiteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },

    noSiteIcon: {
        fontSize: 80,
        marginBottom: theme.spacing.md,
    },

    noSiteText: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
    },
});

export default MaterialPurchaseScreen;
