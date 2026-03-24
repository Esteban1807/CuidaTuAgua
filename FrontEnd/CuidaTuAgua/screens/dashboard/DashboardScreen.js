import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardScreen() {
  const { user, selectedHome, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userName}>{user?.name}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.homeCard}>
          <Text style={styles.homeTitle}>
            {selectedHome?.name || 'Sin hogar seleccionado'}
          </Text>

          <Text style={styles.homeText}>
            Dirección: {selectedHome?.address || '-'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Estado del sistema</Text>
          <Text style={styles.infoText}>
            El dispositivo no está conectado
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver monitoreo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver historial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: '#12A8E0',
    padding: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2239',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#0B5FA5',
    fontWeight: '600',
  },
  homeCard: {
    backgroundColor: '#C9F5FB',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B5FA5',
  },
  homeText: {
    fontSize: 15,
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    color: '#6B7280',
  },
  actions: {
    marginTop: 10,
    gap: 12,
  },
  button: {
    backgroundColor: '#118FC3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});