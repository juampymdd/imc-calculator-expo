import { borderRadius, fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text as RNText, StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export function Card({ children, style }: CardProps) {
  const colors = useThemeColors();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <View style={styles.cardHeader}>
      {children}
    </View>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  const colors = useThemeColors();
  return (
    <RNText style={[styles.cardTitle, { color: colors.cardForeground }]}>
      {children}
    </RNText>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
}

export function CardDescription({ children }: CardDescriptionProps) {
  const colors = useThemeColors();
  return (
    <RNText style={[styles.cardDescription, { color: colors.mutedForeground }]}>
      {children}
    </RNText>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  style?: any;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View style={style}>
      {children}
    </View>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return (
    <View style={styles.cardFooter}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
