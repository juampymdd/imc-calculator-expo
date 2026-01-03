import { borderRadius, fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { ActivityIndicator, Text as RNText, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const colors = useThemeColors();
  
  const getButtonStyle = () => {
    const base = { borderRadius: borderRadius.md, alignItems: 'center' as const, justifyContent: 'center' as const, flexDirection: 'row' as const };
    const variants: any = {
      default: { backgroundColor: colors.primary },
      secondary: { backgroundColor: colors.secondary },
      destructive: { backgroundColor: colors.destructive },
      outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.input },
      ghost: { backgroundColor: 'transparent' },
    };
    const sizes: any = {
      default: { height: 48, paddingHorizontal: spacing.xl },
      sm: { height: 40, paddingHorizontal: spacing.lg },
      lg: { height: 56, paddingHorizontal: spacing['2xl'] },
    };
    return [base, variants[variant], sizes[size], (disabled || loading) && { opacity: 0.5 }];
  };
  
  const getTextStyle = () => {
    const textVariants: any = {
      default: { color: colors.primaryForeground },
      secondary: { color: colors.secondaryForeground },
      destructive: { color: colors.destructiveForeground },
      outline: { color: colors.foreground },
      ghost: { color: colors.foreground },
    };
    const textSizes: any = {
      default: { fontSize: fontSize.base },
      sm: { fontSize: fontSize.sm },
      lg: { fontSize: fontSize.lg },
    };
    return [{ fontWeight: '600' }, textVariants[variant], textSizes[size]];
  };
  
  const buttonStyle = [
    ...getButtonStyle(),
    style,
  ];

  const textStyle = getTextStyle();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.foreground : '#fff'} />
      ) : (
        <RNText style={textStyle}>
          {children}
        </RNText>
      )}
    </TouchableOpacity>
  );
}
