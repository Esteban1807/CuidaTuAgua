import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { styles } from './DashboardScreen.styles';
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

// --- Simulación de datos de la API ---
// Cuando conectes tu API en el otro archivo, te devolverá un arreglo similar a este.
const dataHome = function home(){
  var nameHome = "Hogar 1";
  var descriptionHome = "120 Litros";

  return {nameHome, descriptionHome}

}


// --- 1. Contenido del Panel Lateral ---
const CustomDrawerContent = (props: CustomDrawerProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
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


const MainDashboardContent = ({ navigation, onLogout }: any) => {
  return (
    <view style={styles.mainContainer}>
      {/* Barra superior con el botón de perfil */}
      <View style={styles.topBar}>
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.appLogo} />
          <Text style={styles.textLogo}>Cuida Tu Agua</Text>
          <Text style={styles.descriptionLogo}>
            Bienvenido, aquí verás el resumen de tu consumo
          </Text>
        </View>
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
        <View style={styles.cardsContainer}>
           <View style={styles.card}>
              <Text style={styles.cardTitle}>{dataHome().nameHome}</Text>
              <Text style={styles.cardValue}>{dataHome().descriptionHome}</Text>
           </View>
           <View style={styles.card}>
              <Text style={styles.cardTitle}>{dataHome().nameHome}</Text>
              <Text style={styles.cardValue}>{dataHome().descriptionHome}</Text>
           </View>
        </View>
      </View>
    </view>
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