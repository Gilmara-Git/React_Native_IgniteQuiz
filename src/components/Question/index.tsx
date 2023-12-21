import { Text } from 'react-native';
import { Option } from '../Option';
import { styles } from './styles';
import Animated, { Keyframe , runOnJS } from 'react-native-reanimated';
import { Dimensions } from 'react-native';


type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: ()=>void;
}

export function Question({ question, alternativeSelected, setAlternativeSelected, onUnmount }: Props) {

  const SCREEN_WIDTH = Dimensions.get('window').width;

  const enteringKeyFrame = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        { translateX: SCREEN_WIDTH },
        { rotate: '90deg'}
      
      ]
    },
    70:{
      opacity: 0.7
    },
    100:{
      opacity: 1,
      transform: [
        { translateX: 0},
        { rotate: '0deg'}
      ]
    }

  });

  const exitingKeyFrame = new Keyframe({
    from:{
      opacity: 1,
      transform: [
        {translateX: 0 },
        { rotate: '0deg'}
      
      ]
    },
    to:{
      opacity: 0,
      transform: [
        {translateX: SCREEN_WIDTH * (-1)},
        { rotate: '-90deg'}
      
      ]
    }
  });

  return (
    <Animated.View 
      entering={enteringKeyFrame.delay(50).duration(400)}
      exiting={exitingKeyFrame.delay(50).duration(400).withCallback(finished=>{
        'worklet';
        if(finished) {
          runOnJS(onUnmount)();
        }
      })}
      style={styles.container}
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </Animated.View>
  );
}