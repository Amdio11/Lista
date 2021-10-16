import React, { useContext } from 'react'
import {View, Alert, FlatList} from 'react-native'
import { Avatar, ListItem, Button, Image } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

  const { state, dispatch } = useContext(UsersContext)
  
 

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }
    
    const getUserItem = ({ item: user }) => (
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <Avatar source={{ uri: user.avatarUrl }}/>
                
      <ListItem.Content>
        
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
      
      </ListItem.Content>  
          
      <ListItem.Chevron
          name="edit"
          size={25}
          color="orange"
          onPress={() => props.navigation.navigate('UserForm', user)}
      />

      <ListItem.Chevron
          name="delete"
          size={25}
          color="red"
          onPress={() => confirmUserDeletion(user)}
      />

      </ListItem>
    );
     
    return (
      <View>
        <FlatList
          keyExtractor={(user) => user.id.toString()}
          data={state.users}
          renderItem={getUserItem}
        />
      </View>
    );
    }  