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
import { expenseSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomDatePicker from '../../components/common/CustomDatePicker';
import CustomDropdown from '../../components/common/CustomDropdown';
import CustomButton from '../../components/common/CustomButton';
import theme from '../../config/theme';

const expenseTypes = [
    { label: 'Diesel', value: 'diesel' },
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Tools', value: 'tools' },
    { label: 'Miscellaneous', value: 'misc' },
];

const DailyExpenseScreen = () => {
    const { selectedSite } = useSite();

    const handleSubmit = (values, { resetForm }) => {
        // TODO: Save to API
        Alert.alert('Success', 'Expense added successfully!', [
            { text: 'OK', onPress: () => resetForm() }
        ]);
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
                        expenseType: '',
                        amount: '',
                        date: new Date(),
                        remark: '',
                    }}
                    validationSchema={expenseSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                        <View style={styles.form}>
                            <CustomDatePicker
                                label="Date *"
                                value={values.date}
                                onChange={(date) => setFieldValue('date', date)}
                                error={errors.date}
                                touched={touched.date}
                            />

                            <CustomDropdown
                                label="Expense Type *"
                                value={values.expenseType}
                                onChange={(value) => setFieldValue('expenseType', value)}
                                options={expenseTypes}
                                error={errors.expenseType}
                                touched={touched.expenseType}
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
                                title="Add Expense"
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

export default DailyExpenseScreen;
