import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  title:{
    color: THEME.COLORS.GREY_300,
    marginBottom: 7,
    textAlign: 'center',
    fontSize:16,
    fontFamily: THEME.FONTS.BOLD,
  },
  header:{
    width: '100%',
    marginBottom: 21
  },
  question: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 300,
    padding: 32,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  }
});