import { borderRadius, fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text as RNText, StyleSheet, TouchableOpacity, View } from 'react-native';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  style?: any;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps) {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.muted }, style]}>
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.option, isSelected && { ...styles.optionSelected, backgroundColor: colors.background }]}
          >
            <RNText style={[styles.text, { color: isSelected ? colors.foreground : colors.mutedForeground }]}>
              {option}
            </RNText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  option: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
    backgroundColor: 'transparent',
  },
  optionSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  textSelected: {},
});
