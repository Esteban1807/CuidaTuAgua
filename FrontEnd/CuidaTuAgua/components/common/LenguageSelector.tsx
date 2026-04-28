import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType, Image } from 'react-native';

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
  const [selected, setSelected] = useState(IDIOMAS[0]);

  return (
    <View style={[styles.container, style]}>
      {/* Botón Principal (El que siempre se ve) */}
      <TouchableOpacity 
        style={styles.selectorBtn} 
        onPress={() => setIsOpen(!isOpen)}
      >
          <Image source={selected.flag} style={styles.flagImage} />
        <Text style={styles.codeText}>{selected.code}</Text>
      </TouchableOpacity>

      {/* Menú Desplegable */}
      {isOpen && (
        <View style={styles.dropdown}>
          {IDIOMAS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.itemBtn}
              onPress={() => {
                setSelected(item);
                setIsOpen(false);
              }}
            >
              <Image source={item.flag} style={styles.flagImage} />
              <Text style={styles.itemLabel}>{item.label}</Text>
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