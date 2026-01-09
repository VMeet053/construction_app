import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { registerSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import theme from '../../config/theme';

const RegisterScreen = ({ navigation }) => {
    const { register } = useAuth();
    const [error, setError] = useState('');

    const handleRegister = async (values, { setSubmitting }) => {
        setError('');

        const result = await register({
            name: values.name,
            email: values.email,
            password: values.password,
        });

        if (result.success) {
            // Navigation will be handled automatically by AppNavigator
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }

        setSubmitting(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join Construction Manager</Text>
                </View>

                <ErrorMessage message={error} />

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <View style={styles.form}>
                            <CustomInput
                                label="Full Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={errors.name}
                                touched={touched.name}
                                placeholder="Enter your full name"
                            />

                            <CustomInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={errors.email}
                                touched={touched.email}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <CustomInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={errors.password}
                                touched={touched.password}
                                placeholder="Enter your password"
                                secureTextEntry
                            />

                            <CustomInput
                                label="Confirm Password"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm your password"
                                secureTextEntry
                            />

                            <CustomButton
                                title="Register"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                style={styles.registerButton}
                            />

                            <CustomButton
                                title="Already have an account? Login"
                                onPress={() => navigation.navigate('Login')}
                                variant="ghost"
                                style={styles.loginButton}
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
        flexGrow: 1,
        padding: theme.spacing.lg,
        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },

    title: {
        fontSize: theme.fonts.sizes.xxxl,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },

    subtitle: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
    },

    form: {
        width: '100%',
    },

    registerButton: {
        marginTop: theme.spacing.md,
    },

    loginButton: {
        marginTop: theme.spacing.sm,
    },
});

export default RegisterScreen;
