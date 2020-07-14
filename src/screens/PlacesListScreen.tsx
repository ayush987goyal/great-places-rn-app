import React, { useLayoutEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import CustomHeaderButton from '../components/CustomHeaderButton';

interface PlacesListScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Places'>;
}

const PlacesListScreen: React.FC<PlacesListScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

export default PlacesListScreen;
