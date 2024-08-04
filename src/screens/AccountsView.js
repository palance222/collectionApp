import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';

/**
 * Functional component variables
 */
const Accounts = ({route}) => {
  const columns = {
    scheduledPaymentInterest: {
      text: 'Scheduled Payment Interest',
    },
    totalScheduledPayment: {
      text: 'Total Scheduled Payment',
    },
    balancePrincipal: {
      text: 'Balance Principal',
    },
    balanceInterest: {
      text: 'Balance Interest',
    },
    status: {
      text: 'Status',
    },
 };
  
  const columnLists = Object.keys(columns);
  const details = route.params.details;
  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentInsetAdjustmentBehavior={'automatic'}
        style={styles.scrollView}>
        <View style={GenericStyles.container}>
          <View>
            {
              columnLists.length ? (
              <View style={styles.viewWrapper} elevation={1}>
                {columnLists.map((item, index) => {
                  const keyItem = columns[item];
                  return (
                    <View key={index} style={styles.rowWrapper}>
                      <View style={styles.headingView}>
                        <Text style={styles.textView}>{keyItem.text}</Text>
                      </View>
                      <View style={styles.detailsView}><Text>{details[item]}</Text></View>
                    </View>
                  );
                })
                }
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

/**
 * Fuctional component styles
 */
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  headingView: {
    flex: 1,
    padding: 1, 
  },
  textView: {
    fontWeight: 'bold',
    fontSize: 14
  },
  detailsView: {
    flex: 1,
    padding: 1, 
    alignItems: 'flex-end'
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
  viewWrapper: {
    marginTop: 20,
    padding: 10,
    borderRadius: 1,
    shadowColor: '#000000',
    backgroundColor: '#fefefe',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  
});
