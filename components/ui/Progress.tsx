import { borderRadius } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressProps {
  value: number; // 0-100
  style?: any;
  indicatorStyle?: any;
}

export function Progress({ value, style, indicatorStyle }: ProgressProps) {
  const colors = useThemeColors();
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }, style]}>
      <View
        style={[styles.indicator, { backgroundColor: colors.primary }, indicatorStyle, { width: `${clampedValue}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
