import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import Table from './Table';
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

/**
 * Functional component variables
 */
const Accounts = ({navigation, route}) => {
  const auth = context();
  const [collectionAgent, setAgentCollection] = useState({
    agentCollection: [],
    loading: false,
  });

  const [query, setQuery] = useState('');
  
  const dateFormatter = () => {
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'numeric'});
    const day = date.toLocaleString('default', {day: 'numeric'});
    const year = date.toLocaleString('default', {year: 'numeric'});
    return year + '-' + (month > 9 ? month : ('0' + month)) + '-' + (day > 9 ? day : ('0' + day));
  };

  let agentDate = (route.params && route.params.dateValue) || dateFormatter()
  
  const columns = [
    {
      scheduledPaymentPrincipal: {text: 'Principal'}, 
      parentStyle: {flex: 1, padding: 1},
      style: {fontSize: 16, fontWeight: 'bold'}
    },
    {
      scheduleDate: {text: ''}, 
      parentStyle: {flex: 1, padding: 1, alignItems: 'flex-end'}, 
      style: {fontSize: 14},
      formatter: dateFormatter
    },
    {
      term: {text: 'Term'}, 
      parentStyle: {flex: 1, flexBasis: '100%'},
      style: {fontSize: 14}
    }
  ];
  useEffect(() => {
    setAgentCollection(prevState => ({
      ...prevState,
      loading: true,
      agentCollection: []
    }));
    auth.agentCollectionRecord(auth.state.clientId, agentDate).then(data => {
      if (data.status === 'success') {
        setAgentCollection(prevState => ({
          ...prevState,
          agentCollection: data.code ? [] : data.data,
          loading: false
        }));
      }
    });
  }, [route]);

  const handleDate = () => {
    navigation.navigate('DatePicker', {'dateValue': agentDate});
  };


  const name = (auth.state.firstName || '') + ' ' + (auth.state.lastName || '')
  
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <View style={styles.accountProfile}>
          <View style={styles.accountContainer} elevation={2}>
            <View style={styles.logo}>
              <Image
                style={styles.logoImage}
                source={require('../../assets/user.png')}
              />
            </View>
            <View>
              <Text style={styles.accountTitle}>Welcome to Collection Bank</Text>
              <Text style={styles.accountDesc}>
                <Text style={styles.fontBold}>Agent Name:</Text>
                <Text style={styles.textUpper}>
                  {name}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <>
            <TouchableOpacity onPress={handleDate} style={styles.dateTouchable} elevation={2} activeOpacity={0.5}>
              <View style={styles.dateContainer}>
                <View style={styles.dateLogo}>
                  <Image
                    style={styles.logoImage}
                    source={require('../../assets/calendar.jpg')}
                  />
                </View>
                <View style={styles.calenderText}><Text style={styles.agentDate}>{agentDate}</Text></View>
              </View>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Agent Collection List</Text>
            <View style={styles.wrapper} elevation={1}>
              <Table
                navigation={navigation}
                style={styles.tableData}
                loading={collectionAgent.loading}
                headerView={false}
                data={collectionAgent.agentCollection}
                dataKeys={columns}
                type="loan"
                type1="payments"
                viewId={'id'}
                profileHeaderTitle={'Loan Details'}
              />
            </View>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default Accounts;

/**
 * Functional component Styles
 */
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    left: 5,
  },
  dateTouchable: {
    marginTop: 15
  },
  calenderText: {
    marginTop: 5,
    marginLeft: 10,
  },
  agentDate: {
    color: '#000',
    fontSize: 16
  },
  accountProfile: {
    paddingTop: 10,
  },
  wrapper: {
    borderRadius: 5,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    padding: 10,
    backgroundColor: '#fefefe',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 5,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9ecef',
  },
  accountContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    borderColor: '#e6e6e6',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  accountTitle: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  accountDesc: {
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 2,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  textUpper: {
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 2,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    padding: 10,
    paddingLeft: 15,
    marginTop: 20,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#01403c',
    backgroundColor: '#01403c',
  },
  logo: {
    justifyContent: 'center',
  },
  dateLogo: {
    justifyContent: 'center',
    marginLeft: 6
  },
  logoImage: {
    height: 30,
    width: 30
  }
});
