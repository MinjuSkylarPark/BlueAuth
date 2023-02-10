import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth,signOut } from 'firebase/auth'
import { firebaseConfig } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { initializeApp } from '@firebase/app'

const HomeScreen = () => {

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const navigation = useNavigation();

  const handleSignOut = ()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error=>alert.apply(error.message))
  }


  return (
    // <View>
    //   <Text>HomeScreen</Text>
    // </View>
    <View style={styles.container}>
      {/* current user? 치는 이유는 자바스크립트가 유저를 찾을 때 까지 이메일 뱅뱅돌리
      면서 유저 어딨어 ㅜㅜ 할테니 유저없어도 괜찮다 없는대로 본 이메일로 돌아와~ 하는 것 */}
      <Text>Email:{auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text styles={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  Text:{
    color:'skyblue',
    fontSize:23,
    fontWeight:800
  }


})