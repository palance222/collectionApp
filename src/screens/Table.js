import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

/**
 * Fuctional component variables
 */
export default function Table({
  navigation = null,
  headerView = null,
  data = [],
  dataKeys = [],
  type = '',
  type1 = '',
  loading,
  viewId = null,
  profileHeaderTitle = null,
}) {
  const [rowsData, setRowData] = useState(data);

  useEffect(() => setRowData(data), [data]);

  const tableHeader = () => (
    <>
      <View style={styles.tableHeader}>
        {dataKeys.map((key, index) => {
          const keyItem = Object.keys(key)[0];
          let keyValue = key[keyItem];
          return (
            <TouchableOpacity key={index} style={styles.columnHeader}>
              <Text style={styles.columnHeaderTxt}>{keyValue.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  let flatListProps = {
    data: rowsData,
    style: {width: '100%'},
    nestedScrollEnabled: true,
    scrollEnabled: false,
    keyExtractor: (item, index) => index + '',
    stickyHeaderIndices: [0],
  };

  if (headerView) {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={[
            {...styles.tableRow},
            {backgroundColor: (index + 1) % 2 === 0 ? '#e9ecef' : null},
          ]}>
          {dataKeys.map((key, index) => {
            const keyItem = Object.keys(key)[0];
            let keyValue = key[keyItem];
            return (
              <Text key={index} style={[styles.columnRowTxt, keyValue.style]}>
                {keyValue.formatter
                  ? keyValue.formatter(item[keyItem])
                  : item[keyItem]}
              </Text>
            );
          })}
        </View>
      );
    };
    flatListProps = {
      ...flatListProps,
      ListHeaderComponent: tableHeader,
      renderItem: renderItem,
    };
  } else {
    const renderItem = ({item}) => {
      return (
          <View style={styles.rowWrapper}>
            {dataKeys.map((key, index) => {
              const keyItem = Object.keys(key)[0];
              let keyValue = key[keyItem];
              const keyText = keyValue.text ? keyValue.text + ': ' : '';
              return (
                <View key={index} style={key.parentStyle}>
                  <Text style={key.style}>
                    {keyText}
                    {key.formatter
                    ? key.formatter(item[keyItem])
                    : item[keyItem]}
                  </Text>
                </View>
              );
            })}
          </View>
      );
    };
    flatListProps = {...flatListProps, renderItem: renderItem};
  }
  return (
    <View style={styles.container}>
      {rowsData.length ? (
        <FlatList {...flatListProps} />
      ) : loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Text style={styles.noRecords}>No records</Text>
      )}
    </View>
  );
}

/**
 * Fuctional component styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  noRecords: {
    padding: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    backgroundColor: '#01403c',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40,
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  columnHeader: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: '#000',
    fontWeight: 'bold',
    color: '#fff',
  },
  columnRowTxt: {
    width: '30%',
    color: '#000',
    textAlign: 'center',
  },
  rowWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
