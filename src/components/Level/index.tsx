import { useEffect } from "react";
import { Text, Pressable, PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...rest
}: Props) {
  const COLOR = TYPE_COLORS[type];
  
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);
  

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ["transparent", COLOR]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        interpolateColor(checked.value, [0, 1], [COLOR, THEME.COLORS.GREY_100]),
        { duration: 100 }
      ),
    };
  });

  const scaleUp = () => {
    scale.value = withTiming(1.2, { duration: 700, easing: Easing.bounce });
  };

  const scaleDown = () => {
    scale.value = withTiming(1, { duration: 700 });
  };

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 500 });
  }, [isChecked]);

  return (
    <PressableAnimated
      onPressIn={scaleUp}
      onPressOut={scaleDown}
      style={[styles.container,  { borderColor: COLOR }, animatedContainerStyle ]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}
