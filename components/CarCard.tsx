
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Car } from '../types/Car';
import { colors, commonStyles } from '../styles/commonStyles';
import { router } from 'expo-router';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const handlePress = () => {
    console.log('Navigating to car details:', car.id);
    router.push(`/car/${car.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
  };

  return (
    <TouchableOpacity style={commonStyles.carCard} onPress={handlePress}>
      <Image
        source={{ uri: car.images[0] }}
        style={styles.carImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.carTitle}>
            {car.brand} {car.model}
          </Text>
          <Text style={styles.year}>{car.year}</Text>
        </View>
        
        <Text style={styles.price}>{formatPrice(car.price)}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Kilométrage</Text>
            <Text style={styles.detailValue}>{formatMileage(car.mileage)}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Carburant</Text>
            <Text style={styles.detailValue}>{car.fuel}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Boîte</Text>
            <Text style={styles.detailValue}>{car.transmission}</Text>
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <Text style={styles.location}>{car.location}</Text>
          <View style={[styles.conditionBadge, { backgroundColor: getConditionColor(car.condition) }]}>
            <Text style={styles.conditionText}>{car.condition}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Excellent':
      return colors.success;
    case 'Très bon':
      return colors.primary;
    case 'Bon':
      return colors.warning;
    default:
      return colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  carImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  year: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
});
