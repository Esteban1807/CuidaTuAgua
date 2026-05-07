import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../theme';
import { createStyles } from './LandingScreen.styles';

type Props = {
  onAccess: () => void;
};

const LandingScreen = ({ onAccess }: Props) => {
  const { isMobile } = useResponsive();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={styles.safeArea}>



      <View style={styles.topBar}>

        <View style={styles.topLeft}>

          {isMobile && (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setSidebarOpen(!sidebarOpen)}
            >
              <Text style={styles.menuButtonText}>
                ☰
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.brand}>
            CuidaTuAgua
          </Text>

        </View>

      </View>


      <View style={styles.mainContainer}>

        {/* CONTENT */}
        <ScrollView
          contentContainerStyle={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.userText}>
            Diego Pedro Félix Messi
          </Text>

          {/* HOUSE CARD */}

          <TouchableOpacity
            style={[
              styles.houseCard,
              isMobile && styles.houseCardMobile,
            ]}
          >

            <View
              style={[
                styles.houseImage,
                isMobile && styles.houseImageMobile,
              ]}
            >
              <Text style={styles.imagePlaceholder}>
                Home
              </Text>
            </View>

            <View style={styles.houseInfo}>

              <Text style={styles.houseTitle}>
                Hogar 1
              </Text>

              <Text style={styles.houseText}>
                Dirección #666
              </Text>

              <Text style={styles.houseText}>
                Estrato 5
              </Text>

              <Text style={styles.houseText}>
                Habitantes 4
              </Text>

            </View>

          </TouchableOpacity>



          <TouchableOpacity style={styles.addCard}>
            <Text style={styles.plus}>
              ＋
            </Text>
          </TouchableOpacity>

        </ScrollView>



        {(!isMobile || sidebarOpen) && (
          <View
            style={[
              styles.sidebar,
              isMobile && styles.sidebarMobile,
            ]}
          >

            <View style={styles.sidebarTop}>

              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>
                  Perfil
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
        )}

      </View>
    </View>
  );
};

export default LandingScreen;