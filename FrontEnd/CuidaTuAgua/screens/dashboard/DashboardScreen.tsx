import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  onLogout?: () => void;
};

export default function DashboardScreen({ onLogout }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        backgroundColor: '#F5F7FA',
      }}
    >
      {/* HEADER */}
      <View>
        <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>
          Dashboard
        </Text>

        <Text style={{ fontSize: 16, color: '#6B7280' }}>
          Bienvenido, aquí verás el resumen de tu consumo
        </Text>
      </View>

      {/* CONTENIDO (mock) */}
      <View style={{ gap: 16 }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            Consumo mensual
          </Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: '#6B7280' }}>
            120 Litros
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            Estado del servicio
          </Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: '#10B981' }}>
            Normal
          </Text>
        </View>
      </View>

      {/* FOOTER */}
      <TouchableOpacity
        onPress={onLogout}
        style={{
          backgroundColor: '#118FC3',
          padding: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}