import { FontAwesome } from "@expo/vector-icons";
import { Pressable, View,Text, GestureResponderEvent } from "react-native";

type cartPropType = {
    title:string,
    price:number,
    quantity:number,
    increaseQuantity: () => void,
    decreaseQuantity: () => void,
    removeCart: ()=> void
}

const CartItemCard: React.FC<cartPropType> = ({removeCart,decreaseQuantity,increaseQuantity,title,price,quantity}) => {

    return(
        <View className="flex flex-row justify-between mx-5 border-b-2 border-[#d9d9d9] pb-4">
            <View className="w-[75%]">
                <Text className="text-xl font-semibold truncate">{title}</Text>
                <Text className="text-red-500 text-lg font-bold">$ {price}</Text>
            </View>
            <View className="flex items-end gap-2 w-[20%]">
                <Pressable onPress={()=> removeCart()}>
                    <FontAwesome name="close" size={25} color={"red"}/>
                </Pressable>
                <View className="flex flex-row gap-3 items-center">
                    <Pressable onPress={() => decreaseQuantity()} className="bg-[#bdbaba] w-[25px] h-[25px] rounded-[50%]">
                        <Text className="text-lg text-white text-center">-</Text>
                    </Pressable>
                    <Text className="text-lg font-semibold">{quantity}</Text>
                    <Pressable onPress={() => increaseQuantity()} className="bg-[#bdbaba] w-[25px] h-[25px] rounded-[50%]">
                        <Text className="text-lg text-white text-center">+</Text>
                    </Pressable>
                </View>
            </View> 
        </View>
    )
}

export default CartItemCard