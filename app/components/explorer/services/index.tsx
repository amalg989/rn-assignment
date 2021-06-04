import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getServices} from '../../../redux/actions/mainActions';
import {RootState} from '../../../redux/reducers';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  viewContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewItem: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  cardItem: {
    width: '85%',
    backgroundColor: '#444',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  cardItemContainerStyle: {backgroundColor: '#ccc', marginBottom: 10},
  cardItemContainerTextTitleStyle: {
    textAlign: 'left',
    color: '#ccc',
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardItemContainerTextStyle: {
    textAlign: 'left',
    color: '#ccc',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const ServicesScreen = () => {
  const dispatch = useDispatch();
  const {main} = useSelector((state: RootState) => state);
  const {servicesList} = main || {};

  useEffect(() => {
    dispatch(getServices({}));
  }, [dispatch]);
  const imageWidth = Dimensions.get('window').width * 0.85;
  const imageHeight = Dimensions.get('window').width * 0.5;
  return (
    <FlatList
      contentContainerStyle={styles.container}
      centerContent
      nestedScrollEnabled
      data={servicesList || []}
      onEndReached={() => dispatch(getServices({nextStep: true}))}
      renderItem={(itemData: any) => (
        <View key={itemData.item.serviceId} style={styles.viewItem}>
          <Card containerStyle={styles.cardItem}>
            <View>
              <Image
                resizeMode="cover"
                source={{uri: 'https://via.placeholder.com/1024x768.png'}}
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  marginBottom: 20,
                }}
              />
            </View>
            <Text style={styles.cardItemContainerTextTitleStyle}>
              {itemData.item.title}
            </Text>
            <Text style={styles.cardItemContainerTextStyle}>
              {itemData.item.details}
            </Text>
          </Card>
        </View>
      )}
    />
  );
};

export default ServicesScreen;
