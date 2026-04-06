import { Button, Image, StyleSheet, Text, View ,Linking } from 'react-native';
import  {getUser} from "./axios_service";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState ,useCallback } from 'react';
import { User } from './user_type';




function App() {
  

  return (
    <SafeAreaView style = {[styles.container ,{padding: 20}]}>
      <AppContent />
    </SafeAreaView>
  );
}


function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getUser(1); // Fetch user with ID 1
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {user && (
        <View style={{ alignItems: 'center'  ,gap: 10}} >
         
      <Image
        source={{ uri: user.avatar_url }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
            <Text>name: {user.name}</Text>
            <Text>company: {user.company}</Text>
            <Text>type: {user.type}</Text>
            <Text>location: {user.location}</Text>
             <Button title="open git hub profile" onPress={() => {
              Linking.openURL(user.html_url);
             }} />
            

        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
