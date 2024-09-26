// App.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const mockData = [
  { id: '1', title: 'Exploring AI', subtitle: 'The future of technology', date: '2024-09-21', imageId: '1001' },
  { id: '2', title: 'Space Tourism', subtitle: 'Vacation beyond Earth', date: '2024-09-22', imageId: '1002' },
  { id: '3', title: 'Sustainable Living', subtitle: 'Eco-friendly lifestyle choices', date: '2024-09-23', imageId: '1003' },
  { id: '4', title: 'Quantum Computing', subtitle: 'The next computing revolution', date: '2024-09-24', imageId: '1004' },
  { id: '5', title: 'Augmented Reality', subtitle: 'Enhancing our world view', date: '2024-09-25', imageId: '1005' },
  { id: '6', title: 'Renewable Energy', subtitle: 'Powering the future', date: '2024-09-26', imageId: '1006' },
  { id: '7', title: 'Bioengineering', subtitle: 'Redesigning life', date: '2024-09-27', imageId: '1007' },
  { id: '8', title: 'Neurotechnology', subtitle: 'Interfacing with the brain', date: '2024-09-28', imageId: '1008' },
  { id: '9', title: 'Ocean Exploration', subtitle: 'Discovering the deep', date: '2024-09-29', imageId: '1009' },
  { id: '10', title: 'Nanotechnology', subtitle: 'Manipulating the microscopic', date: '2024-09-30', imageId: '1010' },
];

const ListItem = ({ title, subtitle, date, imageId }) => (
    <View style={styles.item}>
      <Image
          style={styles.image}
          source={{ uri: `https://picsum.photos/id/${imageId}/200/200` }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
);

const App = () => {
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={mockData}
            renderItem={({ item }) => <ListItem {...item} />}
            keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default App;