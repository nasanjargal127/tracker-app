/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {gql} from 'graphql-tag';
import {useSWR} from '@xyypmusic/swr';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {SWRConfig, createFetcher} from '@xyypmusic/swr';

import TextComponents from './components/TextComponents';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const VehiclesListQuery = gql`
  query vehicles {
    vehicles {
      id
      identification
      last_location {
        angle
        location
      }
    }
  }
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {data} = useSWR(VehiclesListQuery);
  console.log('okok', data?.vehicles?.id);
  return (
    <SWRConfig
      value={{
        fetcher: createFetcher('https://gps.aravt.tech/graphql/'),
        revalidateOnFocus: false,
      }}>
      <SafeAreaView style={backgroundStyle}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <TextComponents />
            <Text>{data?.vehicles?.id}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SWRConfig>
  );
};

export default App;
