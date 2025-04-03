import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(height * 0.1))[0];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'orders':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            {/* Order items would go here */}
            <View style={styles.orderItem}>
              <Image 
                source={require('../../assets/Home.png')} 
                style={styles.orderImage}
              />
              <View style={styles.orderDetails}>
                <Text style={styles.orderTitle}>Premium Headphones</Text>
                <Text style={styles.orderDate}>Delivered on May 15, 2023</Text>
                <Text style={styles.orderPrice}>$199.99</Text>
              </View>
            </View>
          </View>
        );
      case 'wishlist':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Your Wishlist</Text>
            {/* Wishlist items would go here */}
          </View>
        );
      case 'settings':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            {/* Settings options would go here */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/YellowProfile.png')} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Text style={styles.editIconText}>✎</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Mudambi Himakiran</Text>
          <Text style={styles.userEmail}>himakiranmudambi@gmail.com</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Coupons</Text>
            </View>
          </View>
        </View>

        {/* Profile Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'orders' && styles.activeTab]}
            onPress={() => setActiveTab('orders')}
          >
            <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>
              Orders
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'wishlist' && styles.activeTab]}
            onPress={() => setActiveTab('wishlist')}
          >
            <Text style={[styles.tabText, activeTab === 'wishlist' && styles.activeTabText]}>
              Wishlist
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'settings' && styles.activeTab]}
            onPress={() => setActiveTab('settings')}
          >
            <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingBottom: height * 0.05,
  },
  profileHeader: {
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#fff',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: height * 0.02,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    borderWidth: 3,
    borderColor: '#6200ee',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6200ee',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  userName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.005,
  },
  userEmail: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.03,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: width * 0.1,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: width * 0.035,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    padding: width * 0.04,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    fontSize: width * 0.04,
    color: '#666',
  },
  activeTabText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: width * 0.05,
    backgroundColor: '#fff',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
  },
  orderItem: {
    flexDirection: 'row',
    padding: width * 0.03,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: width * 0.02,
    marginBottom: height * 0.015,
  },
  orderImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.02,
    marginRight: width * 0.03,
  },
  orderDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#333',
    marginBottom: height * 0.005,
  },
  orderDate: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: height * 0.01,
  },
  orderPrice: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  logoutButton: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutText: {
    color: '#ff4444',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;