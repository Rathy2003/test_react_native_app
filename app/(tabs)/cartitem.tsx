import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import {Alert, Pressable, View, Text } from "react-native"
import CartItemCard from "@/components/CartItem"
import { useContext } from "react"
import CartItemContext from "../helper/CartItemContext"
import { FontAwesome } from "@expo/vector-icons"
import { useRouter } from "expo-router"
export default function CartItem() {
    const { cartItem, setCartItem } = useContext(CartItemContext)

    const router = useRouter()

    type cart = {
        id: number,
        title: string,
        price: number,
        image: string,
        quantity: number
    }
    const increaseQuantity = (id: number): void => {
        let tempArr: cart[] = cartItem.map(item => {
            if (item.id == id) {
                item.quantity++
                return item
            } else {
                return item
            }
        })
        setCartItem(tempArr)
    }

    const decreaseQuantity = (id:number) : void =>{
        const tempArr = cartItem.map(item =>{
            if(item.id == id){
                if(item.quantity > 1){
                    item.quantity--
                    
                }
                return item
            }else{
                return item
            }
        })

        setCartItem(tempArr)
    }

    const removeCart = (index:number) : void =>{
        Alert.alert(
            "Delete Confirm",
            "Are You Sure to remove this cart?",
            [
                {
                    text:"Cancel"
                },
                {
                    text:"Yes",
                    onPress:() =>{
                        const tempData:cart[] = JSON.parse(JSON.stringify(cartItem))
                        tempData.splice(index,1)
                        setCartItem(tempData)
                    }
                }
            ]
        )
    //    if(confirm("Are you sure to remove this cart?")){

    //    }
        
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View className="bg-[#f9f9f9] p-[15px]">
                    <Pressable onPress={() => {
                        router.back()
                    }}>
                        <FontAwesome name="angle-left" size={28} />
                    </Pressable>
                </View>
                {
                    cartItem.length > 0 ? (
                        <View className="mt-5">
                            {
                                cartItem.map((item, index) => <CartItemCard removeCart={()=> removeCart(index)} decreaseQuantity={() => decreaseQuantity(item.id)} increaseQuantity={() => increaseQuantity(item.id)} quantity={item.quantity} title={item.title} price={item.price} key={index} />)
                            }
                        </View>
                    ):(
                         <Text className="text-3xl font-bold text-center align-middle text-red-500 pb-[80px] h-[100vh]">No Cart Item</Text>
                    )
                }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
