import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { styles } from './DashboardScreen.styles';
// Asegúrate de importar esto en tu App.tsx o aquí
import { NavigationContainer } from '@react-navigation/native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerContentComponentProps 
} from '@react-navigation/drawer';

// --- Tipos ---
interface CustomDrawerProps extends DrawerContentComponentProps {
  onLogout?: () => void;
}

type Props = {
  onLogout?: () => void;
};

const logo = require('../../assets/images/logo.png');
const Drawer = createDrawerNavigator();

// --- 1. Contenido del Panel Lateral ---
const CustomDrawerContent = (props: CustomDrawerProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#181818' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.expandedHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
          <Text style={styles.userNameExpanded}>Diego Pérez</Text>
        </View>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.option} onPress={() => props.navigation.closeDrawer()}>
          <Text style={styles.optionText}>Mi Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option} onPress={() => props.navigation.closeDrawer()}>
          <Text style={styles.optionText}>Ajustes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => {
            props.navigation.closeDrawer();
            if (props.onLogout) props.onLogout();
          }}
        >
          <Text style={styles.optionText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

// --- 2. Contenido Principal del Dashboard ---
const MainDashboardContent = ({ navigation, onLogout }: any) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Barra superior con el botón de perfil */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity 
          style={styles.profileTrigger} 
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.userNameOriginal}>Diego Pérez</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tu contenido de CuidaTuAgua */}
      <View style={styles.bodyContent}>
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.appLogo} />
          <Text style={styles.textLogo}>Cuida Tu Agua</Text>
          <Text style={styles.descriptionLogo}>
            Bienvenido, aquí verás el resumen de tu consumo
          </Text>
        </View>

        <View style={styles.cardsContainer}>
           <View style={styles.card}>
              <Text style={styles.cardTitle}>Consumo mensual</Text>
              <Text style={styles.cardValue}>120 Litros</Text>
           </View>
        </View>

        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- 3. Exportación Principal ---
export default function DashboardScreen({ onLogout }: Props) {
  return (
    <NavigationContainer> 
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#181818',
            width: Dimensions.get('window').width * 0.3,
          },
        }}
      >
        <Drawer.Screen name="MainDashboard">
          {(props) => <MainDashboardContent {...props} onLogout={onLogout} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
