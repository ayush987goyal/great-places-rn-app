import React from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import Colors from '../Constants/Colors';

interface PlaceFormValues {
  title: string;
}

const NewPlaceScreen = () => {
  const { values, setFieldValue, handleSubmit } = useFormik<PlaceFormValues>({
    initialValues: { title: '' },
    onSubmit: () => {},
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
