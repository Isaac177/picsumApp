import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const mockData = [
  { title: 'Exploring AI', subtitle: 'The future of technology', date: '2024-09-21', imageUrl: 'https://picsum.photos/200/200' },
  { title: 'Space Tourism', subtitle: 'Vacation beyond Earth', date: '2024-09-22', imageUrl: 'https://picsum.photos/300/200' },
  { title: 'Sustainable Living', subtitle: 'Eco-friendly lifestyle choices', date: '2024-09-23', imageUrl: 'https://picsum.photos/400/200' },
  { title: 'Quantum Computing', subtitle: 'The next computing revolution', date: '2024-09-24', imageUrl: 'https://picsum.photos/500/200' },
  { title: 'Augmented Reality', subtitle: 'Enhancing our world view', date: '2024-09-25', imageUrl: 'https://picsum.photos/600/200' },
  { title: 'Renewable Energy', subtitle: 'Powering the future', date: '2024-09-26', imageUrl: 'https://picsum.photos/700/200' },
  { title: 'Bioengineering', subtitle: 'Redesigning life', date: '2024-09-27', imageUrl: 'https://picsum.photos/800/200' },
  { title: 'Neurotechnology', subtitle: 'Interfacing with the brain', date: '2024-09-28', imageUrl: 'https://picsum.photos/100/200' },
  { title: 'Ocean Exploration', subtitle: 'Discovering the deep', date: '2024-09-29', imageUrl: 'https://picsum.photos/200/300' },
  { title: 'Nanotechnology', subtitle: 'Manipulating the microscopic', date: '2024-09-30', imageUrl: 'https://picsum.photos/300/400' },
];

const fallbackImageUrl = 'https://via.placeholder.com/200x200.png?text=Image+Not+Available';

const ListItem = ({ title, subtitle, date, imageUrl, onPress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const handleImageError = () => {
    console.warn(`Image load error for ${currentImageUrl}`);
    setIsLoading(false);
    if (currentImageUrl !== fallbackImageUrl) {
      setCurrentImageUrl(fallbackImageUrl);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.imageContainer}>
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        <Image
          style={styles.image}
          source={{ uri: currentImageUrl }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={handleImageError}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <ListItem {...item} onPress={() => handleItemPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetBackground}
        enablePanDownToClose={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
      >
        <View style={styles.bottomSheetContent}>
          {selectedItem && (
            <>
              <Text style={styles.bottomSheetTitle}>{selectedItem.title}</Text>
              <Text style={styles.bottomSheetSubtitle}>{selectedItem.subtitle}</Text>
              <Text style={styles.bottomSheetDate}>{selectedItem.date}</Text>
            </>
          )}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f5f5f5',
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  errorText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    backdropFilter: 'blur(10px)',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bottomSheetSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  bottomSheetDate: {
    fontSize: 14,
    color: '#999',
  },
});

export default HomeScreen;