import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
//파이어베이스 임포트해서 암호기반 계정만들기 마무리패스는 늘 /auth로 해준다 
//규칙이랄게 파이어베이스 공식홈페이지에 들어가면 저렇게 하라고 양식이 나와있기때문에 시키는대로하면되는 것 
import {getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword} from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from '@firebase/app';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {

  const [email,setEmail] = useState('');
  const [password,Setpassword] = useState('')
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const navigation = useNavigation();


  useEffect (()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe
  },[])


const handleCreateAccount = (e)=>{
  //데이터 받아올때마다 페이지 새로고침되는거 방지
  e.preventDefault();
  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredentials)=>{
    console.log('Account created')
    const user = userCredentials.user;
    console.log(user)
  })
  .catch(error=>{
    console.log(error)
    Alert.alert(error.message)
  })
}

const handleSignIn = (e)=>{
  e.preventDefault();

  signInWithEmailAndPassword(auth,email,password)
  .then((userCredentials)=>{
    console.log('Signed in')
    const user = userCredentials.user;
    console.log(user)
  })
  .catch(error=>alert(error.message))
}

  return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding">
    //     <View>
    //      <Text>Login Screen</Text>
    //     </View>
    // </KeyboardAvoidingView>

    <SafeAreaView style={styles.container} behavior={"padding"}>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder='email'
        value={email}
        onChangeText={text=>setEmail(text)}
        style={styles.input}/>
        <TextInput
        placeholder='password'
        value={password}
        onChangeText={text=>Setpassword(text)}
        secureTextEntry
        style={styles.input}/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button,styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}

export default LoginScreen;

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 },
 container1:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  },
  //이메일 패스워드 치는공간 전체 아웃라인
  inputContainer:{
    width:'60%'
  },
  input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:10,
    paddingVertical:10,
    borderRadius:10,
    marginTop:5
  },
  buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
  },
  button:{
    backgroundColor:'skyblue',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center'
  },
  buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'skyblue',
    borderWidth:3
  },
  buttonText:{
    color:'white',
    fontWeight:'800',
    fontSize:15
  },
  buttonOutlineText:{
    color:'grey',
    fontWeight:'800',
    fontSize:16
  }
})