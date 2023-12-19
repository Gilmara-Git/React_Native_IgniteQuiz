import { StyleSheet } from 'react-native';

import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    flexGrow:1,// helps space at the bottom of the list to grow when item is deleted
    padding: 32,
  },
  swipableRemove:{
    width: 90, 
    height:90, 
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  swipableContainer:{
    width: '100%',
    height:90, 
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    marginBottom: 12

  }
});