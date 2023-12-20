import { useEffect} from 'react';
import { useWindowDimensions } from 'react-native';
import 
    Animated , { 
    useSharedValue, 
    withSequence, 
    withTiming, 
    useAnimatedStyle , 
    Easing
} from 'react-native-reanimated';
import { Canvas, Rect, BlurMask } from '@shopify/react-native-skia';
import { THEME } from '../../styles/theme';


type OverlayFeedbackProps = {
    status: number
}

const COLORS = ['transparent', THEME.COLORS.BRAND_LIGHT, THEME.COLORS.DANGER_LIGHT];

export const OverlayFeedback = ( { status }: OverlayFeedbackProps )=>{
    const { height, width } = useWindowDimensions();
    const color = COLORS[status];
    const opacity = useSharedValue(0);

    const opacityAnimation =  useAnimatedStyle(()=>{
        return{
            opacity: opacity.value
        }
    })
    
    useEffect(()=>{
        opacity.value = withSequence(withTiming(1, {duration: 400, easing: Easing.bounce}), withTiming(0));
    },[status])

    return (
        <Animated.View style={[{ width, height , position: 'absolute' }, opacityAnimation]}>
            <Canvas style={{ flex:1 }}>
                <Rect 
                    x={0} 
                    y={0} 
                    width={width}
                    height={height}
                    color={color}
                    />
                    <BlurMask blur={50} style='inner'/>
            </Canvas>
        </Animated.View>
    );
};