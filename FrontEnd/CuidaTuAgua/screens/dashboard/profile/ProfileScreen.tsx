// ProfileScreen.tsx

import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useResponsive } from '../../../hooks/useResponsive';
import { useTheme } from '../../../theme';

import { createStyles } from './ProfileScreen.styles';

type Props = {
  onBack?: () => void;
};

const ProfileScreen = (onBack : Props) => {

  const { isMobile } = useResponsive();

  const { colors } = useTheme();

  const styles = createStyles(colors, isMobile);

  return (
    <View style={styles.safeArea}>

      {/* =========================
          TOPBAR
      ========================== */}

      <View style={styles.topBar}>

        <Text style={styles.brand}>
          CuidaTuAgua
        </Text>

      </View>

      {/* =========================
          MAIN
      ========================== */}

      <View style={styles.mainContainer}>

        {/* CONTENT */}

        <ScrollView
          contentContainerStyle={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >

          {/* EDIT BUTTON */}

          <TouchableOpacity style={styles.editButton}>

            <Text style={styles.editButtonText}>
              Editar perfil
            </Text>

          </TouchableOpacity>

          {/* CARD */}

          <View style={styles.card}>

            <Text style={styles.title}>
              Datos personales
            </Text>

            <View style={styles.profileContent}>

              {/* IMAGE */}

              <View style={styles.imageSection}>

                <Text style={styles.imageLabel}>
                  Foto de perfil
                </Text>

                <View style={styles.profileImage} />

              </View>

              {/* FORM */}

              <View style={styles.form}>

                {/* NOMBRE */}

                <View style={styles.inputGroup}>

                  <Text style={styles.label}>
                    Nombre
                  </Text>

                  <TextInput
                    placeholder="Diego Felipe"
                    style={styles.input}
                  />

                </View>

                {/* APELLIDO */}

                <View style={styles.inputGroup}>

                  <Text style={styles.label}>
                    Apellido
                  </Text>

                  <TextInput
                    placeholder="Messi"
                    style={styles.input}
                  />

                </View>

                {/* EMAIL */}

                <View style={styles.inputGroup}>

                  <Text style={styles.label}>
                    Email
                  </Text>

                  <TextInput
                    placeholder="messi@gmail.com"
                    style={styles.input}
                  />

                </View>

                {/* NUMERO */}

                <View style={styles.inputGroup}>

                  <Text style={styles.label}>
                    Número
                  </Text>

                  <TextInput
                    placeholder="3108720988"
                    style={styles.input}
                  />

                </View>

              </View>

            </View>

          </View>

        </ScrollView>

        {/* =========================
            SIDEBAR
        ========================== */}

        <View style={styles.sidebar}>

          <View style={styles.sidebarTop}>

            <TouchableOpacity style={styles.sidebarButton}>

              <Text style={styles.sidebarButtonText}>
                Perfil
              </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarButton}>

              <Text style={styles.sidebarButtonText}>
                Dispositivos
              </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarButton}>

              <Text style={styles.sidebarButtonText}>
                Reporte
              </Text>

            </TouchableOpacity>

          </View>

          <TouchableOpacity style={styles.logoutButton}>

            <Text style={styles.sidebarButtonText}>
              Cerrar sesión
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
};

export default ProfileScreen;