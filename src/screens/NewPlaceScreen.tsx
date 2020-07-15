import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import { useMutation, queryCache } from 'react-query';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import { Coords } from '../models';
import { savePlaceToDb } from '../service/service';
import { FETCH_PLACES_KEY } from '../service/query-hooks';
import Colors from '../Constants/Colors';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';

interface PlaceFormValues {
  title: string;
  imageUri: string;
  location: Coords;
}

interface NewPlaceScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'NewPlace'>;
}

const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({ navigation }) => {
  const [mutate, { isLoading }] = useMutation(savePlaceToDb, {
    onSuccess: () => {
      queryCache.invalidateQueries(FETCH_PLACES_KEY);
      navigation.goBack();
    },
  });

  const { values, setFieldValue, handleSubmit } = useFormik<PlaceFormValues>({
    initialValues: {
      title: '',
      imageUri: '',
      location: { lat: 0, lng: 0 },
    },
    onSubmit: formValues => {
      mutate({
        title: formValues.title,
        imageUri: formValues.imageUri,
        lat: formValues.location.lat,
        lng: formValues.location.lng,
      });
    },
  });

  const locationPickedHandler = useCallback(
    (cords: Coords) => {
      setFieldValue('location', cords);
    },
    [setFieldValue]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={values.title}
          onChangeText={t => setFieldValue('title', t)}
        />

        <ImageSelector onImageTaken={uri => setFieldValue('imageUri', uri)} />

        <LocationSelector onLocationPicked={locationPickedHandler} />

        {isLoading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Button title="Save Place" color={Colors.primary} onPress={() => handleSubmit()} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
