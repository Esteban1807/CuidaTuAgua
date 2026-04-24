import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function HomesScreen() {
  const { user, homes, logout, setSelectedHome } = useAuth();
  

  const handleSelectHome = (home) => {
    setSelectedHome(home);
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Bienvenido</Text>
            <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Mis hogares</Text>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {homes?.length > 0 ? (
            homes.map((home) => (
              <TouchableOpacity
                key={home.id}
                style={styles.card}
                onPress={() => handleSelectHome(home)}
              >
                <Text style={styles.cardTitle}>{home.name}</Text>
                <Text style={styles.cardText}>
                  Dirección: {home.address}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                No tienes hogares registrados.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.addCard}>
            <Text style={styles.addPlus}>+</Text>
            <Text style={styles.addText}>Agregar hogar</Text>
          </TouchableOpacity>
        </ScrollView>
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
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcome: {
    fontSize: 14,
    color: '#083344',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2239',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: '#0B5FA5',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 30,
    gap: 16,
  },
  card: {
    backgroundColor: '#C9F5FB',
    borderWidth: 1,
    borderColor: '#87D9EB',
    borderRadius: 10,
    padding: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B5FA5',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#1F2937',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  addCard: {
    minHeight: 130,
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#EAFBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 46,
    color: '#0B5FA5',
    marginBottom: 6,
  },
  addText: {
    fontSize: 16,
    color: '#0B5FA5',
    fontWeight: '600',
  },
});