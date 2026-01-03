import { borderRadius, fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text as RNText, StyleSheet, TextInput, View } from 'react-native';

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad' | 'number-pad';
  error?: string;
  label?: string;
  style?: any;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
  label,
  style,
}: InputProps) {
  const colors = useThemeColors();
  return (
    <View style={style}>
      {label && (
        <RNText style={[styles.label, { color: colors.foreground }]}>
          {label}
        </RNText>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { borderColor: error ? colors.destructive : colors.input, backgroundColor: colors.background, color: colors.foreground }]}
      />
      {error && (
        <RNText style={[styles.error, { color: colors.destructive }]}>
          {error}
        </RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  input: {
    height: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    fontSize: fontSize.base,
  },
  inputError: {
    borderWidth: 1,
  },
  error: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});
