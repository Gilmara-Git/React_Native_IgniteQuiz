import { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Animated , { useSharedValue , useAnimatedStyle , withTiming} from 'react-native-reanimated';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);

  const percentageProgress = useSharedValue(percentage);

  const animatedProgressBar = useAnimatedStyle(()=>{
    return {
      width: `${percentageProgress.value}%`
    }
  })

  useEffect(()=>{
    percentageProgress.value = withTiming(percentage, {duration: 500 })
  },[current]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedProgressBar ]} />
    </View>
  );
}