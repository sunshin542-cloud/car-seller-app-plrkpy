
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '../styles/commonStyles';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');
  
  const filters = ['Tous', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Tesla'];
  
  const filteredCars = selectedFilter === 'Tous' 
    ? cars 
    : cars.filter(car => car.brand === selectedFilter);

  console.log('Home screen rendered with', filteredCars.length, 'cars');

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Mes Voitures</Text>
        <Text style={commonStyles.textSecondary}>
          {cars.length} véhicule{cars.length > 1 ? 's' : ''} disponible{cars.length > 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => {
              console.log('Filter selected:', filter);
              setSelectedFilter(filter);
            }}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={commonStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        
        {filteredCars.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="car-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Aucune voiture trouvée</Text>
            <Text style={styles.emptyText}>
              Aucun véhicule ne correspond à votre filtre
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  filterContainer: {
    maxHeight: 60,
    marginBottom: 8,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterTextActive: {
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
