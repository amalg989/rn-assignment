import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {validateEmailAddress} from '../../utilities/helper';
import {NAVIGATION} from '../../utilities/constants';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/actions/mainActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  loginContainer: {
    flex: 0,
    width: '90%',
    padding: 20,
    backgroundColor: '#efefef',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#efefef',
  },
  textInputField: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  fieldRow: {
    flex: 0,
    flexDirection: 'column',
    marginBottom: 10,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});

const LoginPage = (props: {navigation: any}) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const mainState = useSelector((state: any) => state.main || {});
  const [emailAddress, setEmailAddress] = useState<any | undefined>(undefined);
  const [password, setPassword] = useState<any | undefined>(undefined);
  const [toggleCheckBox, setToggleCheckBox] =
    useState<boolean | undefined>(false);

  const _onPressLogin = () => {
    dispatch(
      login({emailAddress, password}, () =>
        navigation.navigate(NAVIGATION.HOME.MAIN),
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.fieldRow}>
          <Text style={styles.title}>React Native Assignment</Text>
        </View>
        <View style={styles.fieldRow}>
          <TextInput
            value={emailAddress}
            onChange={event => setEmailAddress(event.nativeEvent.text)}
            placeholder="Email Address"
            placeholderTextColor="#ddd"
            keyboardType="email-address"
            style={styles.textInputField}
          />
        </View>
        <View style={styles.fieldRow}>
          <TextInput
            secureTextEntry
            value={password}
            onChange={event => setPassword(event.nativeEvent.text)}
            placeholder="Password"
            placeholderTextColor="#ddd"
            style={styles.textInputField}
          />
        </View>
        <View style={styles.fieldRow}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text>I agree to Terms &amp; Conditions</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Button
            disabled={
              mainState.loader ||
              emailAddress === '' ||
              !validateEmailAddress(emailAddress) ||
              password === '' ||
              !toggleCheckBox
            }
            title="Login"
            onPress={_onPressLogin}
          />
        </View>
        <View style={styles.fieldRow}>
          <ActivityIndicator
            animating={mainState.loader}
            size="large"
            color="#444"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
