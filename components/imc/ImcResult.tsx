import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text as RNText, StyleSheet, View } from 'react-native';

import { fontSize, spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { Text } from '../ui/Text';

interface ImcResultProps {
  bmi: number;
  categoryLabel: string;
  categoryDetail: string;
  categoryIntent: 'success' | 'info' | 'warning' | 'danger';
  bmiProgress: number;
  healthyMinKg: number;
  healthyMaxKg: number;
  targetKg: number;
  deltaMessage: string;
}

export function ImcResult({
  bmi,
  categoryLabel,
  categoryDetail,
  categoryIntent,
  bmiProgress,
  healthyMinKg,
  healthyMaxKg,
  targetKg,
  deltaMessage,
}: ImcResultProps) {
  const colors = useThemeColors();
  const badgeVariant =
    categoryIntent === 'danger'
      ? 'destructive'
      : categoryIntent === 'warning'
      ? 'warning'
      : categoryIntent === 'success'
      ? 'success'
      : 'info';

  // Color de la barra según la categoría
  const progressColor =
    categoryIntent === 'danger'
      ? colors.destructive
      : categoryIntent === 'warning'
      ? colors.warning
      : categoryIntent === 'success'
      ? colors.success
      : colors.info;

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
      </CardHeader>

      <CardContent>
        <View style={styles.content}>
          {/* BMI Value */}
          <View style={styles.bmiValue}>
            <Text variant="muted">Tu IMC</Text>
            <RNText style={[styles.bmiNumber, { color: colors.foreground }]}>
              {bmi.toFixed(1)}
            </RNText>
          </View>

          {/* Category Badge */}
          <View style={styles.category}>
            <Badge variant={badgeVariant}>{categoryLabel}</Badge>
            <Text variant="muted" style={styles.categoryDetail}>
              {categoryDetail}
            </Text>
          </View>

          {/* Progress Bar */}
          <View>
            <Text variant="small" style={{ marginBottom: spacing.sm }}>
              Escala de IMC (15-45)
            </Text>
            <Progress value={bmiProgress} indicatorColor={progressColor} />
            
            {/* Referencia de rangos */}
            <View style={styles.progressReference}>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceCircle, { backgroundColor: colors.info }]} />
                <Text variant="small" style={{ color: colors.mutedForeground }}>
                  {'<18.5'}
                </Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceCircle, { backgroundColor: colors.success }]} />
                <Text variant="small" style={{ color: colors.mutedForeground }}>
                  18.5-24.9
                </Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceCircle, { backgroundColor: colors.warning }]} />
                <Text variant="small" style={{ color: colors.mutedForeground }}>
                  25-29.9
                </Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceCircle, { backgroundColor: colors.destructive }]} />
                <Text variant="small" style={{ color: colors.mutedForeground }}>
                  {'>30'}
                </Text>
              </View>
            </View>
          </View>

          {/* Healthy Weight Range */}
          <Card style={[styles.healthyCard, { backgroundColor: colors.muted }]}>
            <CardContent style={{ padding: spacing.md }}>
              <Text variant="small" style={styles.healthyTitle}>
                Peso saludable estimado
              </Text>
              <Text variant="default" style={{ marginBottom: spacing.xs }}>
                Rango: {healthyMinKg.toFixed(1)}–{healthyMaxKg.toFixed(1)} kg
              </Text>
              <Text variant="default" style={{ marginBottom: spacing.sm }}>
                Objetivo (punto medio): {targetKg.toFixed(1)} kg
              </Text>
              <Text variant="muted">{deltaMessage}</Text>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card style={[styles.disclaimerCard, { backgroundColor: colors.info + '20', borderColor: colors.info }]}>
            <CardContent style={{ padding: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <Ionicons name="information-circle" size={20} color={colors.info} />
                <Text variant="small" style={{ color: colors.infoForeground, flex: 1 }}>
                  El IMC es una estimación y no reemplaza evaluación médica.
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
  },
  content: {
    gap: spacing.lg,
  },
  bmiValue: {
    alignItems: 'center',
  },
  bmiNumber: {
    fontSize: fontSize['5xl'],
    fontWeight: 'bold',
    marginTop: spacing.sm,
  },
  category: {
    alignItems: 'center',
  },
  categoryDetail: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  progressReference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  referenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  referenceCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthyCard: {
    borderWidth: 0,
  },
  healthyTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  disclaimerCard: {
    borderWidth: 1,
  },
});
