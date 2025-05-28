import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from '../components/Checkbox';
import { CheckoutContext } from '../context/CheckoutContext';

const CheckoutAddressScreen = ({navigation}) => {
  const { addresses, setAddresses } = useContext(CheckoutContext);

  const handleSelect = (id) => { 
    const updated = addresses.map((item) => ({...item, isDefault: item.id === id, }));
    setAddresses(updated);
  };

  const handleEdit = (item) => navigation.navigate('CheckoutAddressEditScreen', { 
    id: item, name: item.name, phone: item.phone, address: item.address, isDefault: item.isDefault,
  })

  const goBack = () => navigation.goBack();
  const handleAddAddress = () => navigation.navigate('CheckoutAddressAddScreen');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.row} onPress={() => handleEdit(item)}>
        <View style={{ marginRight: 10, justifyContent: 'center' }}>
          <Checkbox value={item.isDefault} onValueChange={() => handleSelect(item.id)}/>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        {item.isDefault ? (
          <View style={styles.defaultLabel}>
            <Text style={styles.defaultText}>Mặc định</Text>
          </View>
        ) : (
          <TouchableOpacity>
            <Text style={styles.editText}>Sửa</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
          <View style={styles.backIconWrapper}>
            <Icon name="chevron-back" size={22} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ĐỊA CHỈ</Text>
        <View style={{ width: 24 }} />
      </View>


      <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{backgroundColor: '#f7f7f7'}}
        ListFooterComponent={
          <TouchableOpacity style={styles.addBox} onPress={handleAddAddress}>
            <Icon name="add" size={30} color="#000" />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default CheckoutAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 50,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 25, 
    fontFamily: 'Inter', 
    fontWeight: "bold", 
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    marginVertical: 2,
  },
  address: {
    color: '#444',
  },
  defaultLabel: {
    backgroundColor: '#E0ECFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  editText: {
    color: '#999',
    fontSize: 14,
  },
  addBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  backIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});
