import React, { useLayoutEffect } from 'react';
import { FlatList, View, ActivityIndicator, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import { usePlaces } from '../service/query-hooks';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import Colors from '../Constants/Colors';

interface PlacesListScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Places'>;
}

const PlacesListScreen: React.FC<PlacesListScreenProps> = ({ navigation }) => {
  const { isLoading, data: places } = usePlaces();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => navigation.navigate('NewPlace', {})}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id.toString()}
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
