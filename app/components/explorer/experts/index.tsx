import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getExperts} from '../../../redux/actions/mainActions';
import {RootState} from '../../../redux/reducers';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewItem: {
    flexDirection: 'column',
    width: '45%',
    marginVertical: '2.5%',
  },
  cardItem: {
    backgroundColor: '#444',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    maxHeight: 150,
  },
  cardItemContainerStyle: {backgroundColor: '#ccc', marginBottom: 10},
  cardItemContainerTextStyle: {textAlign: 'center', color: '#ccc'},
});

const ExpertsScreen = () => {
  const dispatch = useDispatch();
  const {main} = useSelector((state: RootState) => state);
  const {expertsList} = main || {};

  useEffect(() => {
    dispatch(getExperts());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled>
      <View style={styles.viewContainer}>
        {(expertsList || []).map((expert: any, i) => (
          <View key={i} style={styles.viewItem}>
            <Card containerStyle={styles.cardItem}>
              <Avatar
                size="large"
                rounded
                title="MT"
                onPress={() => {}}
                activeOpacity={0.7}
                containerStyle={styles.cardItemContainerStyle}
              />
              <Text style={styles.cardItemContainerTextStyle}>
                {expert.name}
              </Text>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExpertsScreen;
