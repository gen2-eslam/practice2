import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import  {getUser} from "./axios_service";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';




function App() {
  

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}


function AppContent() {
  const [user, setUser] = useState<null | typeof getUser>(null);
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
        <View>
          <Text>{JSON.stringify(user)}</Text>
    
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
