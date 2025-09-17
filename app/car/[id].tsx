
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Linking,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { cars } from '../../data/cars';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';

const { width } = Dimensions.get('window');

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactSheetVisible, setIsContactSheetVisible] = useState(false);
  
  const car = cars.find(c => c.id === id);

  if (!car) {
    console.log('Car not found with id:', id);
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.header}>
          <TouchableOpacity 
            style={commonStyles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>Véhicule introuvable</Text>
        </View>
        <View style={[commonStyles.content, commonStyles.center]}>
          <Text style={commonStyles.text}>Ce véhicule n'existe pas.</Text>
        </View>
      </SafeAreaView>
    );
  }

  console.log('Displaying car details for:', car.brand, car.model);

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

  const handleCall = () => {
    console.log('Calling:', car.contactPhone);
    Linking.openURL(`tel:${car.contactPhone}`);
  };

  const handleEmail = () => {
    console.log('Emailing:', car.contactEmail);
    const subject = `Intéressé par ${car.brand} ${car.model} ${car.year}`;
    const body = `Bonjour,\n\nJe suis intéressé par votre ${car.brand} ${car.model} de ${car.year} au prix de ${formatPrice(car.price)}.\n\nPouvez-vous me donner plus d'informations ?\n\nCordialement`;
    Linking.openURL(`mailto:${car.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleWhatsApp = () => {
    console.log('WhatsApp to:', car.contactPhone);
    const message = `Bonjour, je suis intéressé par votre ${car.brand} ${car.model} de ${car.year}.`;
    const phoneNumber = car.contactPhone.replace(/\s/g, '').replace('+33', '33');
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity 
          style={commonStyles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>
          {car.brand} {car.model}
        </Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {car.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.carImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {car.images.length > 1 && (
            <View style={styles.imageIndicators}>
              {car.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentImageIndex === index && styles.activeIndicator
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Title and Price */}
          <View style={styles.titleSection}>
            <Text style={styles.carTitle}>
              {car.brand} {car.model} {car.year}
            </Text>
            <Text style={styles.price}>{formatPrice(car.price)}</Text>
          </View>

          {/* Key Details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Icon name="speedometer-outline" size={20} color={colors.primary} />
              <Text style={styles.detailLabel}>Kilométrage</Text>
              <Text style={styles.detailValue}>{formatMileage(car.mileage)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="car-outline" size={20} color={colors.primary} />
              <Text style={styles.detailLabel}>Carburant</Text>
              <Text style={styles.detailValue}>{car.fuel}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="settings-outline" size={20} color={colors.primary} />
              <Text style={styles.detailLabel}>Transmission</Text>
              <Text style={styles.detailValue}>{car.transmission}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="color-palette-outline" size={20} color={colors.primary} />
              <Text style={styles.detailLabel}>Couleur</Text>
              <Text style={styles.detailValue}>{car.color}</Text>
            </View>
          </View>

          {/* Condition */}
          <View style={styles.conditionSection}>
            <Text style={styles.sectionTitle}>État du véhicule</Text>
            <View style={[styles.conditionBadge, { backgroundColor: getConditionColor(car.condition) }]}>
              <Text style={styles.conditionText}>{car.condition}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{car.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements</Text>
            <View style={styles.featuresGrid}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Localisation</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={20} color={colors.primary} />
              <Text style={styles.locationText}>{car.location}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Contact Button */}
      <View style={styles.contactButtonContainer}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => setIsContactSheetVisible(true)}
        >
          <Icon name="call" size={20} color="white" />
          <Text style={styles.contactButtonText}>Contacter le vendeur</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isContactSheetVisible}
        onClose={() => setIsContactSheetVisible(false)}
      >
        <View style={styles.contactSheet}>
          <Text style={styles.contactTitle}>Contacter le vendeur</Text>
          
          <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
            <Icon name="call" size={24} color={colors.primary} />
            <View style={styles.contactOptionText}>
              <Text style={styles.contactOptionTitle}>Appeler</Text>
              <Text style={styles.contactOptionSubtitle}>{car.contactPhone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
            <Icon name="mail" size={24} color={colors.primary} />
            <View style={styles.contactOptionText}>
              <Text style={styles.contactOptionTitle}>Email</Text>
              <Text style={styles.contactOptionSubtitle}>{car.contactEmail}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption} onPress={handleWhatsApp}>
            <Icon name="logo-whatsapp" size={24} color={colors.success} />
            <View style={styles.contactOptionText}>
              <Text style={styles.contactOptionTitle}>WhatsApp</Text>
              <Text style={styles.contactOptionSubtitle}>Envoyer un message</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
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
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  carImage: {
    width: width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  detailItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  conditionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  conditionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  contactButtonContainer: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contactButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  contactSheet: {
    padding: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactOptionText: {
    marginLeft: 16,
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  contactOptionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
