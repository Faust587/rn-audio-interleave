import { FC, ReactElement } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

type IconButtonProps = {
  icon: ReactElement;
  disabled?: boolean;
  onPress?: () => void;
  backgroundColor?: string;
};

export const IconButton: FC<IconButtonProps> = ({ icon, backgroundColor, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={StyleSheet.flatten([styles.container, { backgroundColor }])}>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
  },
});
