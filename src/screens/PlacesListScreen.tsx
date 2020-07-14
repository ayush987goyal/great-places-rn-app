import React, { useLayoutEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import { RootState } from '../store';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

interface PlacesListScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Places'>;
}

const PlacesListScreen: React.FC<PlacesListScreenProps> = ({ navigation }) => {
  const places = useSelector((state: RootState) => state.places.places);

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
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          place={itemData.item}
          onSelect={() => navigation.navigate('PlaceDetail', { place: itemData.item })}
        />
      )}
    />
  );
};

export default PlacesListScreen;
