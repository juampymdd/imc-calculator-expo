import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImcCalculator, type ImcFormData } from '@/components/imc/ImcCalculator';
import { ImcResult } from '@/components/imc/ImcResult';
import { spacing } from '@/constants/styles';
import { useThemeColors } from '@/hooks/use-theme-colors';
import {
    bmiFromKgAndM,
    bmiScale0To100,
    deltaMessage,
    healthyRangeKg,
    normalizeInputs,
    resolveCategory,
    targetKgMidpoint,
} from '@/lib/imc';

const STORAGE_KEYS = {
  weightValue: '@imc_weight_value',
  weightUnit: '@imc_weight_unit',
  heightValue: '@imc_height_value',
  heightUnit: '@imc_height_unit',
};

interface CalculatedResult {
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

export default function CalculatorIndex() {
  const colors = useThemeColors();
  const scrollViewRef = useRef<ScrollView>(null);
  const [formData, setFormData] = useState<Partial<ImcFormData>>({});
  const [result, setResult] = useState<CalculatedResult | null>(null);

  // Load from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const values = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.weightValue),
        AsyncStorage.getItem(STORAGE_KEYS.weightUnit),
        AsyncStorage.getItem(STORAGE_KEYS.heightValue),
        AsyncStorage.getItem(STORAGE_KEYS.heightUnit),
      ]);

      const [weightValue, weightUnit, heightValue, heightUnit] = values;

      if (weightValue && heightValue) {
        const data: ImcFormData = {
          weightValue,
          weightUnit: (weightUnit as 'kg' | 'lb') || 'kg',
          heightValue,
          heightUnit: (heightUnit as 'cm' | 'in') || 'cm',
        };
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  };

  const saveToStorage = async (data: ImcFormData) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.weightValue, data.weightValue),
        AsyncStorage.setItem(STORAGE_KEYS.weightUnit, data.weightUnit),
        AsyncStorage.setItem(STORAGE_KEYS.heightValue, data.heightValue),
        AsyncStorage.setItem(STORAGE_KEYS.heightUnit, data.heightUnit),
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const calculateBmi = (data: ImcFormData) => {
    const weightValue = parseFloat(data.weightValue);
    const heightValue = parseFloat(data.heightValue);

    if (isNaN(weightValue) || isNaN(heightValue)) {
      return;
    }

    // Validate ranges
    if (weightValue < 10 || weightValue > 500) {
      return;
    }

    if (heightValue < 50 || heightValue > 272) {
      return;
    }

    const { weightKg, heightM } = normalizeInputs(
      weightValue,
      data.weightUnit,
      heightValue,
      data.heightUnit
    );

    const bmi = bmiFromKgAndM(weightKg, heightM);
    const category = resolveCategory(bmi);

    if (!category) {
      return;
    }

    const bmiProgress = bmiScale0To100(bmi);
    const { minKg, maxKg } = healthyRangeKg(heightM);
    const targetKg = targetKgMidpoint(heightM);
    const delta = deltaMessage(bmi, weightKg, heightM);

    const intentMap: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
      underweight: 'info',
      healthy: 'success',
      overweight: 'warning',
      obesity_1: 'danger',
      obesity_2: 'danger',
      obesity_3: 'danger',
    };

    setResult({
      bmi,
      categoryLabel: category.label,
      categoryDetail: category.copy.detail,
      categoryIntent: intentMap[category.key] || 'info',
      bmiProgress,
      healthyMinKg: minKg,
      healthyMaxKg: maxKg,
      targetKg,
      deltaMessage: delta,
    });
  };

  const handleCalculate = (data: ImcFormData) => {
    Keyboard.dismiss();
    setFormData(data);
    saveToStorage(data);
    calculateBmi(data);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const handleClear = () => {
    setFormData({});
    setResult(null);
    AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <ImcCalculator
            onCalculate={handleCalculate}
            onClear={handleClear}
            defaultValues={formData}
          />

          {result && <ImcResult {...result} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
});
