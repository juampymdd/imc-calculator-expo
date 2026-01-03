import { StyleSheet } from 'react-native';

export const lightColors = {
  // Primary
  primary: '#10B981',
  primaryForeground: '#FFFFFF',
  
  // Secondary
  secondary: '#F3F4F6',
  secondaryForeground: '#1F2937',
  
  // Background
  background: '#FFFFFF',
  foreground: '#1F2937',
  
  // Muted
  muted: '#F3F4F6',
  mutedForeground: '#6B7280',
  
  // Card
  card: '#FFFFFF',
  cardForeground: '#1F2937',
  
  // Border
  border: '#E5E7EB',
  input: '#E5E7EB',
  
  // Destructive
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  
  // Success
  success: '#10B981',
  successForeground: '#FFFFFF',
  
  // Warning
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',
  
  // Info
  info: '#3B82F6',
  infoForeground: '#FFFFFF',
};

export const darkColors = {
  // Primary
  primary: '#10B981',
  primaryForeground: '#FFFFFF',
  
  // Secondary
  secondary: '#1F2937',
  secondaryForeground: '#F9FAFB',
  
  // Background
  background: '#111827',
  foreground: '#F9FAFB',
  
  // Muted
  muted: '#374151',
  mutedForeground: '#9CA3AF',
  
  // Card
  card: '#1F2937',
  cardForeground: '#F9FAFB',
  
  // Border
  border: '#374151',
  input: '#374151',
  
  // Destructive
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  
  // Success
  success: '#10B981',
  successForeground: '#FFFFFF',
  
  // Warning
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',
  
  // Info
  info: '#3B82F6',
  infoForeground: '#FFFFFF',
};

// Default to light colors for backwards compatibility
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    gap: spacing.md,
  },
});
