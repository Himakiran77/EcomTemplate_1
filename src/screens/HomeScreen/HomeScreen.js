import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import Images from '../../assets/Images';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) => 
        item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const formatCategoryName = (category) => {
    if (category === "men's clothing") return "Men";
    if (category === "women's clothing") return "Women";
    if (category === "jewelery") return "Jewelry";
    return category;
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
      {/* <Image 
            source={Images.KalaiLogo} 
            style={styles.KalaiLogo}
          /> */}
        <View style={styles.searchInputWrapper}>
          <TouchableOpacity onPress={handleNavigateToProfile}>
        <Image 
            source={Images.KalaiLogo} 
            style={styles.KalaiLogo}
          />
          </TouchableOpacity>
          <Image 
            source={Images.Search} 
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              isSmallDevice && styles.searchInputSmall
            ]}
            placeholder="Search Products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryFilterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScrollContent}
        >
          {['All', 'Electronics','jewelery', "men's clothing", "women's clothing"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
                isSmallDevice && styles.categoryButtonSmall
              ]}
              onPress={() => filterByCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
                isSmallDevice && styles.categoryTextSmall
              ]}>
                {formatCategoryName(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Loading and Error States */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchProducts}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noResultsText}>No products found</Text>
        </View>
      ) : (
        <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}  // This ensures a 2-column grid layout
        style={styles.FlatList}
        renderItem={({ item }) => (
            <ProductCard 
            product={item} 
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
            />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#f5f5f5',
//     paddingTop: Platform.OS === 'ios' ? 16 : 8,
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//     marginLeft: 40,
//     paddingBottom: 8,
//   },
//   KalaiLogo: {
//     width: 50,
//     height: 50,
//     right: 65
//   },
//   searchInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingLeft: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#999',
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//     color: '#333',
//   },
//   searchInputSmall: {
//     height: 40,
//     fontSize: 14,
//   },
//   categoryFilterContainer: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   categoryScrollContent: {
//     paddingHorizontal: 12,
//     alignItems: 'center',
//   },
//   categoryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#C8C8C8',
//     marginHorizontal: 4,
//     height: 36,
//     justifyContent: 'center',
//   },
//   categoryButtonSmall: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     height: 32,
//   },
//   selectedCategory: {
//     backgroundColor: '#6200ee',
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#555',
//   },
//   categoryTextSmall: {
//     fontSize: 12,
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   listContent: {
//     paddingHorizontal: 8,
//     paddingTop: 8,
//   },
//   productCardWrapper: {
//     flex: 1,
//     maxWidth: '50%', // 2 columns by default
//     padding: 8,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',
//     paddingHorizontal: 8,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: '#d32f2f',
//     fontSize: 16,
//     marginBottom: 16,
//     textAlign: 'center',
//     paddingHorizontal: 24,
//   },
//   noResultsText: {
//     color: '#757575',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   FlatList: {
//     marginHorizontal: 10,
//     marginTop: 10
//   },
//   retryButton: {
//     backgroundColor: '#6200ee',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 24,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   footer: {
//     height: 80,
//   },
// });

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa',
  },
  // searchContainer: {
  //   paddingHorizontal: '4%',
  //   paddingVertical: '2%',
  //   backgroundColor: '#fff',
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#e9ecef',
  // },
  // KalaiLogo: {
  //   width: 40,
  //   height: 40,
  //   position: 'absolute',
  //   left: -60,
  //   top: '50%',
  //   transform: [{ translateY: -20 }],
  // },
  // searchInputWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#f1f3f5',
  //   borderRadius: 12,
  //   paddingHorizontal: 12,
  //   marginHorizontal: '2%',
  //   borderWidth: 1,
  //   borderColor: '#dee2e6',
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#000',
  //       shadowOffset: { width: 0, height: 2 },
  //       shadowOpacity: 0.08,
  //       shadowRadius: 8,
  //     },
  //     android: {
  //       elevation: 3,
  //     },
  //   }),
  // },
  searchContainer: {
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#e9ecef',
  },
  
  KalaiLogo: {
    width: 50,
    height: 50,
    marginRight: 10,  // Adds spacing between logo and search wrapper
    resizeMode: 'contain',  // Ensures logo scales properly
  },

  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '100%',
    marginHorizontal: '0%',
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#6c757d',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: Dimensions.get('window').width < 375 ? 40 : 48,
    fontSize: Dimensions.get('window').width < 375 ? 14 : 16,
    color: '#212529',
    paddingVertical: 0,
  },
  categoryFilterContainer: {
    paddingVertical: '2%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoryScrollContent: {
    paddingHorizontal: '3%',
    paddingVertical: 5,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: Dimensions.get('window').width < 375 ? 12 : 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
    minHeight: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: Dimensions.get('window').width < 375 ? 13 : 14,
    fontWeight: '600',
    color: '#495057',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  FlatList: {
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  errorText: {
    color: '#dc3545',
    fontSize: Dimensions.get('window').width < 375 ? 14 : 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  noResultsText: {
    color: '#6c757d',
    fontSize: Dimensions.get('window').width < 375 ? 15 : 17,
    textAlign: 'center',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;