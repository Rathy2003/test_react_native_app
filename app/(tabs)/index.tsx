import { FontAwesome } from '@expo/vector-icons';
import {useContext, useEffect, useState } from 'react';
import { Image, StyleSheet,Text,View, Pressable, TextInput } from 'react-native';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import CartItemContext from '../helper/CartItemContext';
import { useRouter } from 'expo-router';
// import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {

  type product = {
    id:number,
    title:string,
    price: number,
    description:string
    category: string,
    image: string,
    rating: {
      rate:number,
      count: number
    }
  }
  const [data,SetData] = useState<product[] | []>([])
  const [searchQuery,setSearchQuery] = useState("")
  const [isSearch,setIsSearch] = useState(false)
  const [searchData,setSearchData] = useState<product[] | []>([])
  const {cartItem,setCartItem} = useContext(CartItemContext)

  const router = useRouter()

  useEffect(()=>{
    fetchData()
  },[])

  const toggleSearch = () =>{
    setIsSearch(!isSearch)
  }

  const searchItem = () =>{
    if(searchQuery.trim().length == 0)
    {
      setSearchData([])
      return toggleSearch()

    }
    let tempData = data.filter(item => item.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    setSearchData(tempData)
  }

  const fetchData = () =>{
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => SetData(data));
  }

  const addToCart = (index:number) => {
    let tempCart = cartItem.find(item => item.id == data[index].id)
    if(tempCart)
      tempCart.quantity++
    else{
      let tempData = {
        id:data[index].id,
        title:data[index].title,
        quantity:1,
        image:data[index].image,
        price:data[index].price
      }
      setCartItem([...cartItem,tempData])
    }
  }

  if(!isSearch){
    return (
        <SafeAreaProvider>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <Pressable style={{position:"relative"}} onPress={()=>{
                router.push("/(tabs)/cartitem")
              }}>
                <Text style={styles.cartItem}>{cartItem.length}</Text>
                <FontAwesome name='shopping-cart' size={25}/>
              </Pressable>
              <Pressable onPress={toggleSearch}>
                <FontAwesome name='search' size={25}/>
              </Pressable>
            </View>
            <Text>{searchQuery}</Text>
            <FlatGrid 
                  style={styles.gridView}
                  itemDimension={135}
                  data={data}
                  renderItem={({item,index}) => (
                    <View style={styles.itemContainer}>
                      <Image style={styles.itemImage} source={{uri:item["image"]}}/>
                      <Text style={styles.itemLabel}>{item["title"]}</Text>
                      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={styles.itemPrice}>$ {item["price"]}</Text>
                        <Pressable onPress={() => addToCart(index)} style={styles.addCartBtn}>
                          <Text style={{textAlign:"center",color:"white",fontSize:18}}>+</Text>
                        </Pressable>
                      </View>
                    </View>
              )}/>
          </SafeAreaView>
        </SafeAreaProvider>
    );
  }else{
    return(
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.searchWrapper}>
              <Pressable onPress={toggleSearch}>
                <FontAwesome name='angle-left' size={35}/>
              </Pressable>
              <TextInput enterKeyHint='search' onChangeText={setSearchQuery} value={searchQuery} onSubmitEditing={searchItem} style={styles.searchBar} placeholder='Search Product Here...'/>
          </View>
          <FlatGrid 
                style={styles.gridView}
                itemDimension={135}
                data={searchData}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{uri:item["image"]}}/>
                    <Text style={styles.itemLabel}>{item["title"]}</Text>
                    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                      <Text style={styles.itemPrice}>$ {item["price"]}</Text>
                      <Pressable style={styles.addCartBtn}>
                        <Text style={{textAlign:"center",color:"white",fontSize:18}}>+</Text>
                      </Pressable>
                    </View>
                  </View>
            )}/>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
  
}

const styles = StyleSheet.create({
  headerContainer:{
    padding:15,
    display:"flex",
    gap:18,
    justifyContent:"flex-end",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#f9f9f9"
  },
  cartItem:{
    position:"absolute",
    backgroundColor:"red",
    top:-8,
    color:"white",
    width:23,
    height:23,
    borderRadius:50,
    textAlign:"center",
    zIndex:4,
    right:-15,
    fontSize:15
  },
  itemLabel:{
    marginTop:8,
    fontSize:16
  },
  gridView:{
    marginTop: 10,
    // flex: 1
  },
  itemContainer:{
    backgroundColor:"#f9f9f9",
    minHeight:200,
    padding:15,
    borderRadius:8
  },
  itemImage:{
    height:100,
    width:"100%",
    objectFit:"contain"
  },
  itemPrice:{
    marginTop:5,
    color:"red",
    fontSize:20,
    fontWeight:"bold"
  },
  addCartBtn:{
    backgroundColor:"orange",
    width:30,
    paddingHorizontal:5,
    paddingVertical:3,
    borderRadius:5
  },
  searchBar:{
    borderWidth:1,
    borderColor:"dimgray",
    fontSize:18,
    borderRadius:5,
    paddingLeft:15,
    width: "85%"
  },
  searchWrapper:{
    display:"flex",
    flexDirection:"row",
    gap: 20,
    alignItems:"center",
    padding:15
  }
});
