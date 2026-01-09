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
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../utils/validators';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import theme from '../../config/theme';

const LoginScreen = ({ navigation }) => {
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async (values, { setSubmitting }) => {
        setError('');

        const result = await login(values.email, values.password);

        if (result.success) {
            // Navigation will be handled automatically by AppNavigator
        } else {
            setError(result.error || 'Login failed. Please try again.');
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
                    <Text style={styles.title}>🏗️ Construction Manager</Text>
                    <Text style={styles.subtitle}>Welcome Back!</Text>
                </View>

                <ErrorMessage message={error} />

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
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

                            <CustomButton
                                title="Login"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                style={styles.loginButton}
                            />

                            <CustomButton
                                title="Don't have an account? Register"
                                onPress={() => navigation.navigate('Register')}
                                variant="ghost"
                                style={styles.registerButton}
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

    loginButton: {
        marginTop: theme.spacing.md,
    },

    registerButton: {
        marginTop: theme.spacing.sm,
    },
});

export default LoginScreen;
