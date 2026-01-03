import { fontSize } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text as RNText } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'large' | 'small';
  style?: any;
}

export function Text({ children, variant = 'default', style }: TextProps) {
  const colors = useThemeColors();
  
  const variantStyles: any = {
    default: { fontSize: fontSize.base, color: colors.foreground },
    muted: { fontSize: fontSize.sm, color: colors.mutedForeground },
    large: { fontSize: fontSize.lg, color: colors.foreground },
    small: { fontSize: fontSize.xs, color: colors.foreground },
  };
  
  const textStyle = [
    variantStyles[variant],
    style,
  ];

  return (
    <RNText style={textStyle}>
      {children}
    </RNText>
  );
}
