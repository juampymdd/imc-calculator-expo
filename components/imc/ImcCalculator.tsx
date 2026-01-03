import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { spacing } from '@/constants/styles';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { SegmentedControl } from '../ui/SegmentedControl';

const imcFormSchema = z.object({
  weightValue: z.string().min(1, 'Ingresá tu peso.'),
  weightUnit: z.enum(['kg', 'lb']),
  heightValue: z.string().min(1, 'Ingresá tu altura.'),
  heightUnit: z.enum(['cm', 'in']),
});

export type ImcFormData = z.infer<typeof imcFormSchema>;

interface ImcCalculatorProps {
  onCalculate: (data: ImcFormData) => void;
  onClear: () => void;
  defaultValues?: Partial<ImcFormData>;
}

export function ImcCalculator({ onCalculate, onClear, defaultValues }: ImcCalculatorProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ImcFormData>({
    resolver: zodResolver(imcFormSchema),
    defaultValues: {
      weightValue: defaultValues?.weightValue || '',
      weightUnit: defaultValues?.weightUnit || 'kg',
      heightValue: defaultValues?.heightValue || '',
      heightUnit: defaultValues?.heightUnit || 'cm',
    },
  });

  const handleClear = () => {
    reset({
      weightValue: '',
      weightUnit: 'kg',
      heightValue: '',
      heightUnit: 'cm',
    });
    onClear();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresá tus datos</CardTitle>
        <CardDescription>Podés usar kg o lb y cm o pulgadas.</CardDescription>
      </CardHeader>

      <CardContent>
        <View style={styles.content}>
          {/* Weight */}
          <View>
            <Controller
              control={control}
              name="weightValue"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Peso"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Ej: 92.5"
                  keyboardType="decimal-pad"
                  error={errors.weightValue?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="weightUnit"
              render={({ field: { onChange, value } }) => (
                <SegmentedControl
                  options={['kg', 'lb']}
                  value={value}
                  onChange={onChange}
                  style={{ marginTop: spacing.sm }}
                />
              )}
            />
          </View>

          {/* Height */}
          <View>
            <Controller
              control={control}
              name="heightValue"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Altura"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Ej: 175"
                  keyboardType="decimal-pad"
                  error={errors.heightValue?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="heightUnit"
              render={({ field: { onChange, value } }) => (
                <SegmentedControl
                  options={['cm', 'in']}
                  value={value}
                  onChange={onChange}
                  style={{ marginTop: spacing.sm }}
                />
              )}
            />
          </View>
        </View>
      </CardContent>

      <CardFooter>
        <Button variant="default" onPress={handleSubmit(onCalculate)} style={{ flex: 1, marginRight: spacing.sm }}>
          Calcular
        </Button>
        <Button variant="outline" onPress={handleClear} style={{ flex: 1, marginLeft: spacing.sm }}>
          Limpiar
        </Button>
      </CardFooter>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
});
