import React, { useState, useEffect  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType, Image } from 'react-native';
import { useTheme, spacing, typography } from '../../theme';
import i18n from '../../i18n';



interface Idioma {
  id: string;
  label: string;
  flag: ImageSourcePropType;
  code: string;
}

interface Props {
  style?: StyleProp<ViewStyle>;
}

const IDIOMAS: Idioma[] = [
  { id: '1', label: 'Español', flag: require('../../assets/images/colombia-flag.png'), code: 'ES' },
  { id: '2', label: 'English', flag: require('../../assets/images/usa-flag.png'), code: 'EN' },
  { id: '3', label: 'Português', flag: require('../../assets/images/brazil-flag.png'), code: 'PT' },
  { id: '4', label: 'Français', flag: require('../../assets/images/france-flag.png'), code: 'FR' },
];



const LanguageSelector = ({ style }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const getCurrentLanguage = () => {
    const current = i18n.language.split('-')[0]; // ej: es-CO → es
    return IDIOMAS.find(i => i.code.toLowerCase() === current) || IDIOMAS[0];
  };

  const [selected, setSelected] = useState(getCurrentLanguage());

  useEffect(() => {
    const current = getCurrentLanguage();
    setSelected(current);
  }, [i18n.language]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.selectorBtn}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Image source={selected.flag} style={styles.flagImage} />
        <Text style={[styles.codeText, { color: colors.textPrimary }]}>{selected.code}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.grayMedium }]}> 
          {IDIOMAS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemBtn}
              onPress={async () => {
                setSelected(item);
                setIsOpen(false);
                i18n.changeLanguage(item.code.toLowerCase());
              }}
            >
              <Image source={item.flag} style={styles.flagImage} />
              <Text style={[styles.itemLabel, { color: colors.textPrimary }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    alignSelf: 'flex-end',
  },
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },

  flagImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 3,
    resizeMode: 'cover',
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 150,
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  codeText: {
    fontWeight: 'bold',
    color: '#333',
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
});