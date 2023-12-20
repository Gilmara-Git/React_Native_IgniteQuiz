import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Alert} from 'react-native';
import { HouseLine , Trash} from 'phosphor-react-native';
import { THEME } from '../../styles/theme';

import { Header } from '../../components/Header';
import { HistoryCard, HistoryProps } from '../../components/HistoryCard';

import { styles } from './styles';
import { historyGetAll, historyRemove } from '../../storage/quizHistoryStorage';
import { Loading } from '../../components/Loading';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import Animated , { Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';


export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);
  
  const swipeableRefs= useRef<Swipeable[]>([]);


  const { goBack } = useNavigation();

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }

  function handleRemove(id: string, index: number) {
   // accessing a History item directly and setting it to close whenever the trash icon(Swipeable) is clicked
   // this way it closes and the Alert is displayed
  swipeableRefs.current?.[index].close();

    Alert.alert(
      'Remover',
      'Deseja remover esse registro?',
      [
        {
          text: 'Sim', onPress: () => remove(id)
        },
        { text: 'Não', style: 'cancel' }
      ]
    );

  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item, index) => (
            <Animated.View
              key={item.id}
              layout={Layout.springify()}
              entering={SlideInRight}
              exiting={SlideOutRight}
            >
                <Swipeable 
                  ref={(ref)=>{
                    if(ref){
                      swipeableRefs.current.push(ref)
                 
                    }
                  }}
                    containerStyle={styles.swipableContainer}
                    overshootLeft={false}
                    renderRightActions={()=>null}
                    onSwipeableOpen={()=>handleRemove(item.id, index)}
                    leftThreshold={10}
                    renderLeftActions={()=>
                    <View 
                      style={styles.swipableRemove}
                     
                      >
                      <Trash color={THEME.COLORS.GREY_100} size={32}/>
                  </View>
                }
             
                >
                  <HistoryCard data={item} />
                </Swipeable>
         
           </Animated.View>
          ))
        }
      </ScrollView>
    </View>
  );
}