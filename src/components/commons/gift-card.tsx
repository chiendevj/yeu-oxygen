import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GiftCardProps {
  id: string;
  name: string;
  points: number;
  image?: string | null;
  onPress?: () => void;
  variant?: 'horizontal' | 'vertical';
}

const GiftCard: React.FC<GiftCardProps> = ({
  name,
  points,
  image,
  onPress,
  variant = 'vertical',
}) => {
  const isHorizontal = variant === 'horizontal';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isHorizontal ? styles.horizontalCard : styles.verticalCard,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          isHorizontal ? styles.horizontalImage : styles.verticalImage,
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={40} color="#d1d5db" />
          </View>
        )}
      </View>
      <View style={isHorizontal ? styles.horizontalContent : styles.verticalContent}>
        <Text
          style={styles.name}
          numberOfLines={isHorizontal ? 2 : 2}
        >
          {name}
        </Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{points}</Text>
          <Ionicons name="leaf" size={16} color="#16a34a" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  horizontalCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  verticalCard: {
    padding: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  horizontalImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  verticalImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  verticalContent: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },
});

export default GiftCard;
