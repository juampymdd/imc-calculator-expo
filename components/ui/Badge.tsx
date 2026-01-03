import { borderRadius, fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text as RNText, StyleSheet, View } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
  style?: any;
}

export function Badge({ children, variant = 'default', style }: BadgeProps) {
  const colors = useThemeColors();
  
  const variantStyles: any = {
    default: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    destructive: { backgroundColor: colors.destructive },
    success: { backgroundColor: colors.success },
    warning: { backgroundColor: colors.warning },
    info: { backgroundColor: colors.info },
  };
  
  const textVariants: any = {
    default: { color: colors.primaryForeground },
    secondary: { color: colors.secondaryForeground },
    destructive: { color: colors.destructiveForeground },
    success: { color: colors.successForeground },
    warning: { color: colors.warningForeground },
    info: { color: colors.infoForeground },
  };
  
  const containerStyle = [
    styles.base,
    variantStyles[variant],
    style,
  ];

  const textStyle = [
    styles.text,
    textVariants[variant],
  ];

  return (
    <View style={containerStyle}>
      <RNText style={textStyle}>
        {children}
      </RNText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  variantDefault: {},
  variantSecondary: {},
  variantDestructive: {},
  variantSuccess: {},
  variantWarning: {},
  variantInfo: {},
  text: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  textDefault: {},
  textSecondary: {},
  textDestructive: {},
  textSuccess: {},
  textWarning: {},
  textInfo: {},
});
