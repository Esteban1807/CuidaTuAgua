import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, spacing, typography } from '../../theme';

type Props = {
  onLogout?: () => void;
};

export default function DashboardScreen({ onLogout }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Bienvenido, aquí verás el resumen de tu consumo</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Consumo mensual</Text>
          <Text style={[styles.cardBody, { color: colors.textSecondary }]}>120 Litros</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Estado del servicio</Text>
          <Text style={[styles.cardBody, { color: colors.success }]}>Normal</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onLogout}
        style={[styles.logoutButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.logoutText, { color: colors.surface }]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardBody: {
    marginTop: 8,
    fontSize: 14,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: '600',
  },
});