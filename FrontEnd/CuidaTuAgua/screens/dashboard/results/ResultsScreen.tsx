// DashboardScreen.tsx

import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { House } from 'lucide-react-native';

import { useResponsive } from '../../../hooks/useResponsive';
import { useTheme } from '../../../theme';

import { createStyles } from './ResultsScreen.styles';
type Props = {
  onBack?: () => void;
};

const DashboardScreen = (onBack : Props) => {

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

          {/* HOME TITLE */}

          <View style={styles.homeTitle}>

            <House
              size={22}
              color="#111827"
            />

            <Text style={styles.homeTitleText}>
              Hogar 1
            </Text>

          </View>

          {/* =========================
              STATS CARD
          ========================== */}

          <View style={[styles.card, styles.statsCard]}>

            <View style={styles.statsLeft}>

              <Text style={styles.statsValue}>
                38 L
              </Text>

              <View style={styles.chart}>

                <View style={styles.lineGray} />

                <View style={styles.lineBlue} />

              </View>

              <TouchableOpacity style={styles.updateButton}>

                <Text style={styles.updateButtonText}>
                  Actualizar gráfico
                </Text>

              </TouchableOpacity>

            </View>

            <View style={styles.statsRight}>

              <Text style={styles.statusTitle}>
                Estado
              </Text>

              <Text style={styles.statusText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ipsam modi explicabo recusandae reprehenderit.
              </Text>

            </View>

          </View>

          {/* =========================
              GOALS
          ========================== */}

          <View style={styles.card}>

            <Text style={styles.goalsTitle}>
              Metas
            </Text>

            {/* META 1 */}

            <View style={styles.goalItem}>

              <View style={styles.goalTop}>

                <Text style={styles.goalLabel}>
                  Meta 1
                </Text>

                <Text style={styles.goalPercent}>
                  30%
                </Text>

              </View>

              <View style={styles.goalBar}>
                <View style={styles.goalFill30} />
              </View>

            </View>

            {/* META 2 */}

            <View style={styles.goalItem}>

              <View style={styles.goalTop}>

                <Text style={styles.goalLabel}>
                  Meta 2
                </Text>

                <Text style={styles.goalPercent}>
                  40%
                </Text>

              </View>

              <View style={styles.goalBar}>
                <View style={styles.goalFill40} />
              </View>

            </View>

            {/* META 3 */}

            <View style={styles.goalItem}>

              <View style={styles.goalTop}>

                <Text style={styles.goalLabel}>
                  Meta 3
                </Text>

                <Text style={styles.goalPercent}>
                  55%
                </Text>

              </View>

              <View style={styles.goalBar}>
                <View style={styles.goalFill55} />
              </View>

            </View>

            {/* META 4 */}

            <View style={styles.goalItem}>

              <View style={styles.goalTop}>

                <Text style={styles.goalLabel}>
                  Meta 4
                </Text>

                <Text style={styles.goalPercent}>
                  45%
                </Text>

              </View>

              <View style={styles.goalBar}>
                <View style={styles.goalFill45} />
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

export default DashboardScreen;