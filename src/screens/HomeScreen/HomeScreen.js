// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   StyleSheet, 
//   TextInput, 
//   ActivityIndicator, 
//   RefreshControl, 
//   TouchableOpacity, 
//   ScrollView,
//   Dimensions,
//   Platform,
//   Image
// } from 'react-native';
// import axios from 'axios';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import Images from '../../assets/Images';

// const HomeScreen = ({ navigation }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   // Get screen dimensions
//   const { width, height } = Dimensions.get('window');
//   const isSmallDevice = width < 375;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     setLoading(true);
//     axios.get('https://fakestoreapi.com/products')
//       .then(response => {
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Failed to load products. Please try again later.');
//         setLoading(false);
//       });
//   };

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     if (text) {
//       const filtered = products.filter((item) =>
//         item.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchProducts();
//     setRefreshing(false);
//   };

//   const filterByCategory = (category) => {
//     setSelectedCategory(category);
//     if (category === 'All') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter((item) => 
//         item.category.toLowerCase() === category.toLowerCase()
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const formatCategoryName = (category) => {
//     if (category === "men's clothing") return "Men";
//     if (category === "women's clothing") return "Women";
//     if (category === "jewelery") return "Jewelry";
//     return category;
//   };

//   const handleNavigateToProfile = () => {
//     navigation.navigate('Profile');
//   }

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//       {/* <Image 
//             source={Images.KalaiLogo} 
//             style={styles.KalaiLogo}
//           /> */}
//         <View style={styles.searchInputWrapper}>
//           <TouchableOpacity onPress={handleNavigateToProfile}>
//         <Image 
//             source={Images.KalaiLogo} 
//             style={styles.KalaiLogo}
//           />
//           </TouchableOpacity>
//           <Image 
//             source={Images.Search} 
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={[
//               styles.searchInput,
//               isSmallDevice && styles.searchInputSmall
//             ]}
//             placeholder="Search Products..."
//             placeholderTextColor="#999"
//             value={searchQuery}
//             onChangeText={handleSearch}
//             clearButtonMode="while-editing"
//           />
//         </View>
//       </View>

//       {/* Category Filter */}
//       <View style={styles.categoryFilterContainer}>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false} 
//           contentContainerStyle={styles.categoryScrollContent}
//         >
//           {['All', 'Electronics','jewelery', "men's clothing", "women's clothing"].map((category) => (
//             <TouchableOpacity
//               key={category}
//               style={[
//                 styles.categoryButton,
//                 selectedCategory === category && styles.selectedCategory,
//                 isSmallDevice && styles.categoryButtonSmall
//               ]}
//               onPress={() => filterByCategory(category)}
//             >
//               <Text style={[
//                 styles.categoryText,
//                 selectedCategory === category && styles.selectedCategoryText,
//                 isSmallDevice && styles.categoryTextSmall
//               ]}>
//                 {formatCategoryName(category)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Loading and Error States */}
//       {loading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#6200ee" />
//         </View>
//       ) : error ? (
//         <View style={styles.centered}>
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity 
//             style={styles.retryButton} 
//             onPress={fetchProducts}
//           >
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : filteredProducts.length === 0 ? (
//         <View style={styles.centered}>
//           <Text style={styles.noResultsText}>No products found</Text>
//         </View>
//       ) : (
//         <FlatList
//         data={filteredProducts}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}  // This ensures a 2-column grid layout
//         style={styles.FlatList}
//         renderItem={({ item }) => (
//             <ProductCard 
//             product={item} 
//             onPress={() => navigation.navigate('ProductDetails', { product: item })}
//             />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//       />
//       )}
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: { 
// //     flex: 1, 
// //     backgroundColor: '#f5f5f5',
// //     paddingTop: Platform.OS === 'ios' ? 16 : 8,
// //   },
// //   searchContainer: {
// //     paddingHorizontal: 16,
// //     marginLeft: 40,
// //     paddingBottom: 8,
// //   },
// //   KalaiLogo: {
// //     width: 50,
// //     height: 50,
// //     right: 65
// //   },
// //   searchInputWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 24,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     paddingLeft: 15,
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.1,
// //         shadowRadius: 4,
// //       },
// //       android: {
// //         elevation: 2,
// //       },
// //     }),
// //   },
// //   searchIcon: {
// //     width: 20,
// //     height: 20,
// //     tintColor: '#999',
// //     marginRight: 10,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     height: 48,
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   searchInputSmall: {
// //     height: 40,
// //     fontSize: 14,
// //   },
// //   categoryFilterContainer: {
// //     paddingVertical: 8,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#eee',
// //   },
// //   categoryScrollContent: {
// //     paddingHorizontal: 12,
// //     alignItems: 'center',
// //   },
// //   categoryButton: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     backgroundColor: '#C8C8C8',
// //     marginHorizontal: 4,
// //     height: 36,
// //     justifyContent: 'center',
// //   },
// //   categoryButtonSmall: {
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     height: 32,
// //   },
// //   selectedCategory: {
// //     backgroundColor: '#6200ee',
// //   },
// //   categoryText: {
// //     fontSize: 14,
// //     fontWeight: '500',
// //     color: '#555',
// //   },
// //   categoryTextSmall: {
// //     fontSize: 12,
// //   },
// //   selectedCategoryText: {
// //     color: '#fff',
// //   },
// //   listContent: {
// //     paddingHorizontal: 8,
// //     paddingTop: 8,
// //   },
// //   productCardWrapper: {
// //     flex: 1,
// //     maxWidth: '50%', // 2 columns by default
// //     padding: 8,
// //   },
// //   columnWrapper: {
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 8,
// //   },
// //   centered: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   errorText: {
// //     color: '#d32f2f',
// //     fontSize: 16,
// //     marginBottom: 16,
// //     textAlign: 'center',
// //     paddingHorizontal: 24,
// //   },
// //   noResultsText: {
// //     color: '#757575',
// //     fontSize: 16,
// //     textAlign: 'center',
// //   },
// //   FlatList: {
// //     marginHorizontal: 10,
// //     marginTop: 10
// //   },
// //   retryButton: {
// //     backgroundColor: '#6200ee',
// //     paddingHorizontal: 24,
// //     paddingVertical: 12,
// //     borderRadius: 24,
// //   },
// //   retryButtonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// //   footer: {
// //     height: 80,
// //   },
// // });

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#f8f9fa',
//   },
//   searchContainer: {
//     paddingHorizontal: '4%',
//     paddingVertical: '2%',
//   },
  
//   KalaiLogo: {
//     width: 50,
//     height: 50,
//     marginRight: 10, 
//     resizeMode: 'contain', 
//   },

//   searchInputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f1f3f5',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     width: '100%',
//     marginHorizontal: '0%',
//     ...Platform.select({
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#6c757d',
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: Dimensions.get('window').width < 375 ? 40 : 48,
//     fontSize: Dimensions.get('window').width < 375 ? 14 : 16,
//     color: '#212529',
//     paddingVertical: 0,
//   },
//   categoryFilterContainer: {
//     paddingVertical: '2%',
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   categoryScrollContent: {
//     paddingHorizontal: '3%',
//     paddingVertical: 5,
//     gap: 8,
//   },
//   categoryButton: {
//     paddingHorizontal: Dimensions.get('window').width < 375 ? 12 : 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     backgroundColor: '#e9ecef',
//     minHeight: 34,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedCategory: {
//     backgroundColor: '#007bff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   categoryText: {
//     fontSize: Dimensions.get('window').width < 375 ? 13 : 14,
//     fontWeight: '600',
//     color: '#495057',
//   },
//   selectedCategoryText: {
//     color: '#fff',
//   },
//   FlatList: {
//     paddingHorizontal: '2%',
//     paddingTop: '2%',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: '5%',
//   },
//   errorText: {
//     color: '#dc3545',
//     fontSize: Dimensions.get('window').width < 375 ? 14 : 16,
//     marginBottom: 20,
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   noResultsText: {
//     color: '#6c757d',
//     fontSize: Dimensions.get('window').width < 375 ? 15 : 17,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   retryButton: {
//     backgroundColor: '#007bff',
//     paddingHorizontal: 28,
//     paddingVertical: 12,
//     borderRadius: 12,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default HomeScreen;


import React, { useState, useEffect, useRef } from 'react';
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
import Carousel from 'react-native-snap-carousel';
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
  const carouselRef = useRef(null);

  // Get screen dimensions
  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  // Carousel data
  const carouselItems = [
    {
      id: 1,
      title: 'Summer Collection',
      image: Images.Carousel1, 
    },
    {
      id: 2,
      title: 'Winter Special',
      image: Images.Carousel2,
    },
    {
      id: 3,
      title: 'New Arrivals',
      image: Images.Carousel3,
    },
  ];

  // Brands data
  const brands = [
    { id: 1, name: 'Nike', logo: Images.Nike },
    { id: 2, name: 'Adidas', logo: Images.adidas },
    { id: 3, name: 'Puma', logo: Images.puma },
    { id: 4, name: 'Reebok', logo: Images.Reebok },
  ];

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

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <View style={styles.carouselTextContainer}>
          <Text style={styles.carouselText}>{item.title}</Text>
        </View>
      </View>
    );
  };

  const renderBrandCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.brandCard} activeOpacity={0.7}>
        <Image source={item.logo} style={styles.brandLogo} resizeMode="contain" />
      </TouchableOpacity>
    );
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
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <Image 
              source={Images.KalaiLogo} 
              style={styles.kalaiLogo}
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

      {/* Main Content ScrollView */}
      <ScrollView 
        style={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
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
        ) : (
          <>
            {/* Carousel */}
            <View style={styles.carouselContainer}>
              <Carousel
                ref={carouselRef}
                data={carouselItems}
                renderItem={renderCarouselItem}
                sliderWidth={width}
                itemWidth={width * 0.85}
                layout={'default'}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={0.7}
              />
            </View>

            {/* Brands Horizontal Scroll */}
            <View style={styles.brandsContainer}>
              <Text style={styles.sectionTitle}>Popular Brands</Text>
              <FlatList
                data={brands}
                renderItem={renderBrandCard}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.brandsList}
              />
            </View>

            {/* Products Section */}
            <View style={styles.productsContainer}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              {filteredProducts.length === 0 ? (
                <View style={styles.centered}>
                  <Text style={styles.noResultsText}>No products found</Text>
                </View>
              ) : (
                <FlatList
                  data={filteredProducts}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  scrollEnabled={false} // Disable scrolling since it's inside ScrollView
                  renderItem={({ item }) => (
                    <ProductCard 
                      product={item} 
                      onPress={() => navigation.navigate('ProductDetails', { product: item })}
                    />
                  )}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    zIndex: 1,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  kalaiLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#6c757d',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#212529',
    paddingVertical: 0,
  },
  searchInputSmall: {
    height: 40,
    fontSize: 14,
  },
  // Carousel styles
  carouselContainer: {
    marginTop: 10,
    marginBottom: 15,
    height: 180,
  },
  carouselItem: {
    borderRadius: 10,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  carouselText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Brands styles
  brandsContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    paddingHorizontal: 8,
  },
  brandsList: {
    paddingRight: 16,
  },
  brandCard: {
    width: 80,
    height: 60,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  brandLogo: {
    width: '70%',
    height: '70%',
  },
  categoryFilterContainer: {
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
    minHeight: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonSmall: {
    paddingHorizontal: 12,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  categoryTextSmall: {
    fontSize: 13,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productsContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 200,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  noResultsText: {
    color: '#6c757d',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 20,
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