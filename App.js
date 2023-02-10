// import { StatusBar } from 'expo-status-bar';
//상단의 시간이나 배터리를 나타내는 상태바 - 로그인화면에서는 이미지의 아름다움을 저해하니 주석처리하여 없앤다
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

//크리에이트 스택네비게이터는 스크린을받아와서 변수명 Stack.기능 이런식으로 동작할 수 있게한다
const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}}name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});