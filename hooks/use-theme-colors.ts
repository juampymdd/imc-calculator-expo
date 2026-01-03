import { darkColors, lightColors } from '@/constants/styles';
import { useColorScheme } from 'react-native';

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}
