import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import { useSite } from '../../context/SiteContext';
import { invoiceEntrySchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatCurrency } from '../../utils/calculations';
import { apiService } from '../../services/api';

const InvoiceEntryScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const payload = {
                siteId: selectedSite.id,
                invoiceNumber: values.invoiceNumber,
                date: values.date,
                amount: parseFloat(values.amount) || 0,
                description: values.description,
            };
            await apiService.billing.createInvoice(payload);
            Alert.alert('Success', 'Invoice saved');
            resetForm();
        } catch (error) {
            Alert.alert('Error', 'Failed to save invoice');
        }
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
                        invoiceNumber: '',
                        date: new Date(),
                        amount: '',
                        description: '',
                    }}
                    validationSchema={invoiceEntrySchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                        <View style={styles.form}>
                            <CustomInput
                                label="Invoice Number *"
                                value={values.invoiceNumber}
                                onChangeText={handleChange('invoiceNumber')}
                                onBlur={handleBlur('invoiceNumber')}
                                error={errors.invoiceNumber}
                                touched={touched.invoiceNumber}
                                placeholder="Enter invoice number"
                            />

                            <CustomDatePicker
                                label="Invoice Date *"
                                value={values.date}
                                onChange={(date) => setFieldValue('date', date)}
                            />

                            <CustomInput
                                label="Amount (₹) *"
                                value={values.amount}
                                onChangeText={handleChange('amount')}
                                onBlur={handleBlur('amount')}
                                error={errors.amount}
                                touched={touched.amount}
                                placeholder="Enter amount"
                                keyboardType="numeric"
                            />

                            {values.amount ? (
                                <View style={styles.totalCard}>
                                    <Text style={styles.totalLabel}>Amount:</Text>
                                    <Text style={styles.totalValue}>{formatCurrency(values.amount)}</Text>
                                </View>
                            ) : null}

                            <CustomInput
                                label="Description"
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                error={errors.description}
                                touched={touched.description}
                                placeholder="Optional description"
                                multiline
                            />

                            <CustomButton title="Save Invoice" onPress={handleSubmit} loading={isSubmitting} />
                        </View>
                    )}
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
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        ...theme.shadows.small,
    },
    totalCard: {
        backgroundColor: theme.colors.primary + '20',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    totalLabel: {
        fontSize: theme.fonts.sizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },
    totalValue: {
        fontSize: theme.fonts.sizes.lg,
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

export default InvoiceEntryScreen;
