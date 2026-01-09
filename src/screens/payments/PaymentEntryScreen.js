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
import { paymentSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';
import { formatCurrency } from '../../utils/calculations';

const paymentModes = [
    { label: 'Cash', value: 'cash' },
    { label: 'Cheque', value: 'cheque' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'UPI', value: 'upi' },
];

const PaymentEntryScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        Alert.alert(
            'Success',
            `Payment of ${formatCurrency(parseFloat(values.amount))} recorded successfully!`,
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
                        amount: '',
                        paymentMode: '',
                        date: new Date(),
                        remark: '',
                    }}
                    validationSchema={paymentSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                        <View style={styles.form}>
                            <CustomDatePicker
                                label="Payment Date *"
                                value={values.date}
                                onChange={(date) => setFieldValue('date', date)}
                                error={errors.date}
                                touched={touched.date}
                            />

                            <CustomInput
                                label="Amount (₹) *"
                                value={values.amount}
                                onChangeText={handleChange('amount')}
                                onBlur={handleBlur('amount')}
                                error={errors.amount}
                                touched={touched.amount}
                                placeholder="Enter payment amount"
                                keyboardType="numeric"
                            />

                            <CustomDropdown
                                label="Payment Mode *"
                                value={values.paymentMode}
                                onChange={(value) => setFieldValue('paymentMode', value)}
                                options={paymentModes}
                                error={errors.paymentMode}
                                touched={touched.paymentMode}
                            />

                            <CustomInput
                                label="Remark"
                                value={values.remark}
                                onChangeText={handleChange('remark')}
                                onBlur={handleBlur('remark')}
                                error={errors.remark}
                                touched={touched.remark}
                                placeholder="Enter remark (optional)"
                                multiline
                                numberOfLines={3}
                            />

                            <CustomButton
                                title="Record Payment"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                            />
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
        width: '100%',
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

export default PaymentEntryScreen;
