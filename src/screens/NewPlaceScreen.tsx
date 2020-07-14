import React from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import { addPlace } from '../store/placesSlice';
import Colors from '../Constants/Colors';

interface PlaceFormValues {
  title: string;
}

interface NewPlaceScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'NewPlace'>;
}

const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { values, setFieldValue, handleSubmit } = useFormik<PlaceFormValues>({
    initialValues: { title: '' },
    onSubmit: formValues => {
      dispatch(addPlace({ title: formValues.title }));
      navigation.goBack();
    },
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={values.title}
          onChangeText={t => setFieldValue('title', t)}
        />

        <Button title="Save Place" color={Colors.primary} onPress={() => handleSubmit()} />
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
