import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import Images from '../../assets/Images';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  // **Validations**
  const validateName = (name) => name.trim().length >= 3;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (confirmPassword) => confirmPassword === password;

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field) => {
    let error = '';
    switch (field) {
      case 'name':
        if (!name) error = 'Name is required';
        else if (!validateName(name)) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!email) error = 'Email is required';
        else if (!validateEmail(email)) error = 'Please enter a valid email';
        break;
      case 'password':
        if (!password) error = 'Password is required';
        else if (!validatePassword(password)) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!confirmPassword) error = 'Please confirm password';
        else if (!validateConfirmPassword(confirmPassword)) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!name || !validateName(name)) {
      newErrors.name = !name ? 'Name is required' : 'Name must be at least 3 characters';
      isValid = false;
    }
    if (!email || !validateEmail(email)) {
      newErrors.email = !email ? 'Email is required' : 'Invalid email format';
      isValid = false;
    }
    if (!password || !validatePassword(password)) {
      newErrors.password = !password ? 'Password is required' : 'Password must be at least 6 characters';
      isValid = false;
    }
    if (!confirmPassword || !validateConfirmPassword(confirmPassword)) {
      newErrors.confirmPassword = !confirmPassword ? 'Confirm password' : 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    return isValid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    }
  };

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo & Header */}
          <View style={styles.logoContainer}>
            <Image
              source={Images.KalaiLogo}
              style={[styles.logo, isSmallDevice && styles.logoSmall]}
              resizeMode="contain"
            />
            <Text style={[styles.welcomeText, isSmallDevice && styles.welcomeTextSmall]}>
              Create An Account
            </Text>
            <Text style={styles.subText}>Join us today!</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  isSmallDevice && styles.inputSmall,
                  touched.name && errors.name && styles.inputError,
                ]}
                placeholder="Enter Your Name..."
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (touched.name) validateField('name');
                }}
                onBlur={() => handleBlur('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  isSmallDevice && styles.inputSmall,
                  touched.email && errors.email && styles.inputError,
                ]}
                placeholder="Enter Your Email..."
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (touched.email) validateField('email');
                }}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    isSmallDevice && styles.inputSmall,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (touched.password) validateField('password');
                  }}
                  onBlur={() => handleBlur('password')}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={toggleSecureEntry}
                >
                  <Text style={styles.eyeIconText}>
                    {secureTextEntry ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  isSmallDevice && styles.inputSmall,
                  touched.confirmPassword && errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Re-enter password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (touched.confirmPassword) validateField('confirmPassword');
                }}
                onBlur={() => handleBlur('confirmPassword')}
                secureTextEntry={secureTextEntry}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <View style={styles.loginPrompt}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  logoSmall: {
    width: 90,
    height: 90,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  welcomeTextSmall: {
    fontSize: 22,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputSmall: {
    height: 45,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  eyeIconText: {
    fontSize: 20,
  },
  signUpButton: {
    backgroundColor: '#6200ee',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;