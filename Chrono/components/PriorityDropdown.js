import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PRIORITY_OPTIONS = [
  { label: 'Mayor prioridad', value: 'desc' },
  { label: 'Menor prioridad', value: 'asc' },
];

export default function PriorityDropdown({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(PRIORITY_OPTIONS[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onChange) onChange(option.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.dropdown}>
        <Text style={styles.selectedText}>{selected.label}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.options}>
          {PRIORITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelect(option)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', marginBottom: 10 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#d4e1e9',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#5b779a',
  },
  selectedText: { color: "#d4e1e9", fontWeight: 'bold' },
  options: {
    color: "#d4e1e9",
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#93b3c7',
    borderWidth: 1,
    borderColor: '#d4e1e9',
    borderRadius: 5,
    zIndex: 10,
  },
  option: { padding: 10 },
  optionText: { color: '#f4f8fa' },
});
