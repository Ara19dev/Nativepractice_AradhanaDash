import React, { useReducer, createContext, useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SectionList,ScrollView, Image, ImageBackground, Switch, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FavoriteContext = createContext();
const CartContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

const useFavorites = () => useContext(FavoriteContext);
const useCart = () => useContext(CartContext);

const FavoriteProvider = ({ children }) => {
  const [favorites, dispatchFavorites] = useReducer(favoriteReducer, []);
  const addToFavorites = (product) => dispatchFavorites({ type: 'ADD_FAVORITE', payload: product });
  const removeFromFavorites = (productId) => dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: productId });
  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const addToCart = (product) => dispatchCart({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (productId) => dispatchCart({ type: 'REMOVE_FROM_CART', payload: productId });
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


const image1 = { uri: 'https://i.pinimg.com/564x/d8/19/4a/d8194a5cd5e240159d38dc362550ff50.jpg' };
const image2 = { uri: 'https://i.pinimg.com/564x/9c/34/a7/9c34a79238295c1d6f367606fa2c88a7.jpg' };

const StartPage = ({ navigation }) => {
  return(
  <View style={styles.container}>
    <ImageBackground source={image1} resizeMode="contain" style={styles.image1}>
      <Text style={styles.title1}>The HERMES awaits you!</Text>
      <Text style={styles.title}>Click below to know more!</Text>
      <View style={styles.buttonContainer1}><Button title="Getting Started" color="#e28743" onPress={() => navigation.navigate('RegisterPage')} /></View>
    </ImageBackground>
  </View>
  );
};

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    if (username && password && email) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, password, email }));
        navigation.navigate('SignInPage');
      } catch (e) {
        Alert.alert('Error saving data');
      }
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
    <ImageBackground source={image2} resizeMode="contain" style={styles.image2}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Sign Up" color="green" onPress={handleSignUp} />
      </ImageBackground>
    </View>
  );
};

const SignInPage = ({ navigation }) => {
  const [signinUsername, setSigninUsername] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user && signinUsername === user.username && signinPassword === user.password) {
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Error! Please check your credentials again');
      }
    } catch (e) {
      Alert.alert('Error retrieving data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={signinUsername}
        onChangeText={setSigninUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={signinPassword}
        secureTextEntry
        onChangeText={setSigninPassword}
      />
      <Button title="Login" color="green" onPress={handleSignIn} />
    </View>
  );
};

const HomePage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);

  return (
    <View style={[styles.container, isEnabled ? styles.lightBackground : styles.darkBackground]}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <View style={styles.switchContainer}>
        <Text>Change?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
const SectionData = [
  {
    title: 'NEW ARRIVALS',
    data: ['Resilience', 'Birkin'],
  },
  {
    title: 'Exclusive',
    data: ['Spring Summer 2024', 'Deli Bags','Teen Quirk'],
  },
  {
    title: 'Collections',
    data: ['Midnight Black', 'Youth Plush','Brosque Leather'],
  },
]

const productData = [
  {
    id: 1,
    title: "Hermès Birkin 30",
    description: "The iconic Hermès Birkin 30 in Togo leather. A timeless piece for any wardrobe.",
    price: 12000,
    rating: 4.8,
    category: "Handbags",
    image: "https://saclab.com/wp-content/uploads/2021/02/577_Hermes_Birkin_30_Fauve_Barenia_1-edited-1.jpg",
  },
  {
    id: 2,
    title: "Hermès Kelly 28",
    description: "Elegant and structured, the Hermès Kelly 28 in Epsom leather is a classic choice.",
    price: 10500,
    rating: 4.7,
    category: "Handbags",
    image: "https://i.pinimg.com/originals/f1/93/c1/f193c1848a1ed5b85ad87b7a108215f9.jpg",
  },
  {
    id: 3,
    title: "Hermès Constance 24",
    description: "Chic and versatile, the Hermès Constance 24 is perfect for day or night.",
    price: 9000,
    rating: 4.6,
    category: "Handbags",
    image: "https://www.simplehandbaga.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/img_3066.jpg",
  },
  {
    id: 4,
    title: "Hermès Evelyne III",
    description: "The Hermès Evelyne III in clemence leather, known for its casual yet stylish design.",
    price: 4000,
    rating: 4.5,
    category: "Crossbody Bags",
    image: "https://sites.create-cdn.net/siteimages/24/5/0/245036/18/0/3/18030840/1000x827.jpg?1581521320",
  },
  {
    id: 5,
    title: "Hermès Garden Party",
    description: "Spacious and stylish, the Hermès Garden Party is ideal for everyday use.",
    price: 3000,
    rating: 4.4,
    category: "Tote Bags",
    image: "https://cdn1.jolicloset.com/img4/full/2017/07/42983-1.jpg",
  },
  {
    id: 6,
    title: "Hermès Mini Kelly",
    description: "A mini version of the classic, the Hermès Mini Kelly is perfect for special occasions.",
    price: 8000,
    rating: 4.9,
    category: "Evening Bags",
    image: "https://celebsbound.net/uploads/180327/_16112IA.jpg",
  },
  {
    id: 7,
    title: "Hermès Picotin Lock 18",
    description: "A stylish bucket bag, the Hermès Picotin Lock 18 offers practicality with elegance.",
    price: 4500,
    rating: 4.5,
    category: "Bucket Bags",
    image: "https://cdn1.jolicloset.com/img4/full/2017/06/41155-3.jpg",
  },
  {
    id: 8,
    title: "Hermès Kelly Danse",
    description: "Modern and sleek, the Hermès Kelly Danse is a versatile bag for any outfit.",
    price: 6500,
    rating: 4.8,
    category: "Crossbody Bags",
    image: "https://a.1stdibscdn.com/hermes-kelly-danse-bag-beige-de-weimar-swift-gold-hardware-new-w-box-for-sale-picture-10/v_588/1584993920658/hermes_kelly_danse_beige_de_weimar_for_sale_on_mightychic_master.jpg?width=768",
  },
  {
    id: 9,
    title: "Hermès Toolbox 26",
    description: "Sophisticated and spacious, the Hermès Toolbox 26 is perfect for work and play.",
    price: 7000,
    rating: 4.6,
    category: "Work Bags",
    image: "https://prod-images.fashionphile.com/main/1a6cdebeae03d079dca0c817b15c88e6/2e64944138f2384c51448e0742314c8c.jpg",
  },

  ]
const ProductCard = ({ product, isFavorite,isInCart, onFavoritePress, onAddToCartPress }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <Text style={styles.cardTitle}>{product.title}</Text>
    <Text style={styles.cardDescription}>{product.description}</Text>
    <Text style={styles.cardPrice}>${product.price}</Text>
    <Text style={styles.cardRating}>Rating:{product.rating}</Text>

    <Button
      title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      onPress={onFavoritePress}
      color="#e28743"
    />
     <View style={styles.buttonWrapper}>
    <Button title={isInCart ? 'Remove from Cart' : 'Add to Cart'} onPress={onAddToCartPress} />
</View>
    </View>
  
);

const ProductPage = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cart, addToCart, removeFromCart } = useCart();

  const toggleFavorite = (product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  const toggleCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Product Page</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {productData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((fav) => fav.id === product.id)}
              onFavoritePress={() => toggleFavorite(product)}
              isInCart={cart.some((item) => item.id === product.id)}
              onAddToCartPress={() => toggleCart(product)}
               />
          ))}
        </View>
      </ScrollView>
      </View>
  );
}

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.alertText}>No favorites yet</Text>
      ) : (
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              isInCart={false}
              onFavoritePress={() => removeFromFavorites(product.id)}
              onAddToCartPress={() => {}}
            />
          ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.alertText}>No items in the cart</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          
          {cart.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={false}
              isInCart={true}
              onFavoritePress={() => {}}
              onAddToCartPress={() => removeFromCart(product.id)}
            />
          ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const SectionPage = () => (
  
  <View style={styles.container}>
  <View style={styles.section}>
    <SectionList
      sections={SectionData}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      keyExtractor={(item, index) => item + index}
    />
    </View>
  </View>
);


const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#694fad' }}
  >
    <Tab.Screen
      name="ProductPage"
      component={ProductPage}
      options={{
        tabBarLabel: 'Products',
        tabBarIcon: ({ color }) => <Ionicons name="bag" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="FavoritesPage"
      component={FavoritesPage}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="CartPage"
      component={CartPage}
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomePage} />
    <Drawer.Screen name ="Categories" component={SectionPage} />
    <Drawer.Screen name="Shop" component={TabNavigator} />
    <Drawer.Screen name ="LogOut" component={StartPage} options={{ headerShown: false }} />
  </Drawer.Navigator>
);

const App = () => (
  <FavoriteProvider>
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="HomePage" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  </FavoriteProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width:'100%',
    height:'100%',
  },
  title: {
    fontSize: 38,
    color: '#abdbe3',
    fontWeight: 'bold',
    fontStyle:'italic',
    paddingTop: 170,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
  alignSelf:'center',
  width: 300,
  height: 50,
  borderColor: '#abdbe3',
  borderWidth: 3,
  marginBottom: 20,
  paddingHorizontal: 20,
  color: '#abdbe3',
  fontSize: 16,
  justifyContent:'center',
  alignItems:'center',
},
welcomeText: {
  fontSize: 38,
  color: '#abdbe3',
  fontWeight: 'bold',
  marginBottom: 20,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60%',
},
buttonWrapper: {
  marginHorizontal: 5,
},
usernameText: {
  fontSize: 18,
  color: '#abdbe3',
  marginBottom: 20,
},
scrollContainer: {
  padding: 20,
  alignItems: 'center',
},
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf:'centre',
    alignItems:'center',
    paddingTop:50,
  },
  gridContainer1: {
    flexDirection: 'coloumn',
    justifyContent: 'center',
    alignSelf:'centre',
    alignItems:'center',
    paddingTop:50,
    marginHorizontal:40,
  },
  card: {
    width: '45%',
    //height:'20%',
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
},
cardDescription: {
  fontSize: 14,
  color: '#555',
  textAlign: 'center',
},
cardPrice: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#e28743',
},
cardRating: {
  fontSize: 14,
  color: '#777',
},
item: {
  backgroundColor: '#abdbe3',
  padding: 10,
  marginVertical:8,
  borderRadius:10,
},
header: {
  fontSize: 28,
  fontStyle: 'italic',
  backgroundColor: 'white',
},
section: {
  width: 400,
  padding: 5,
  paddingTop:10,
  marginVertical: 5,
  backgroundColor: '#fff',
  borderRadius: 10,
  borderWidth: 20,
  borderColor: '#fff',


  height: 700,
  marginHorizontal:100,
},
sectionTitle: {
  fontSize: 20,
  color: 'black',
  fontWeight: 'italic',
  marginBottom: 10,

},
shopText: {
  fontSize: 38,
  color: '#223344',
  fontWeight: 'bold',
  fontStyle: 'italic',
  marginBottom: 10,
},
buttonContainer1: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  paddingLeft: 80,
  //marginLeft:60,
},
image1:{
  flex: 1,
  justifyContent: 'center',
  width:'100%',
  height:'100%',
  alignSelf:'center',
},
title1:{
  fontSize: 38,
  color: '#abdbe3',
  fontWeight: 'bold',
  fontStyle:'italic',
  paddingTop: 70,  
  marginBottom: 20,
  textAlign: 'center',
},
image2:{
  flex: 1,
  justifyContent: 'center',
  width:'100%',
  height:'100%',
  alignSelf:'center',
  flexWrap:'wrap',
},
lightBackground: {
  backgroundColor: 'white',
  width:'100%'
},
darkBackground: {
  backgroundColor: 'black',
},
switchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
},
alertText: {
  fontSize: 18,
  color: '#ff9999',
  textAlign: 'center',
  marginTop: 20,
  paddingBottom:17,
},

});
export default App;
