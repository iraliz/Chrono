
import React, { useEffect, useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from '../src/api';


// Configura el calendario en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ]
};
LocaleConfig.defaultLocale = 'es';


// Componente que muestra el calendario y marca los días con tareas

const timeManagementTips = [
  // Tips originales
  'Divide tus tareas grandes en pequeñas para avanzar poco a poco.',
  'Toma descansos cortos para mantener la concentración.',
  'Elimina distracciones y crea un ambiente de trabajo adecuado.',
  'Utiliza la técnica Pomodoro: trabaja 25 minutos y descansa 5.',
  'Actualiza tu lista de tareas diaria y márcalas al completarlas, sigue así.',
  'Aprende a decir "no" a tareas que no son urgentes o importantes.',
  'Revisa tus objetivos cada mañana para mantener el enfoque.',
  'Evita el multitasking, concéntrate en una tarea a la vez.',
  'Premia tus logros para mantenerte motivado.',
  'Define tu "por qué": Entiende el propósito detrás de tus acciones.',
  'Celebra pequeños logros: Reconoce tu progreso para mantener el ánimo.',
  'Busca inspiración: Lee, mira videos, habla con personas que te motiven.',
  'Evita influencias que te desanimen.',
  'Ponte a prueba y crece.',
  'Visualiza el éxito: Imagina cómo te sentirás al lograr tus metas.',
  'Busca aspectos interesantes en lo que haces.',
  'Mantén una mentalidad de crecimiento, tienes que creer en tu capacidad de mejorar.',
  'Haz ejercicio, esto libera endorfinas que mejoran el estado de ánimo.',
  'Recuerda tus fortalezas: Confía en tus habilidades para superar obstáculos.',
  'Usa la regla de los 2 minutos: Si toma menos de 2 minutos, hazlo ahora.',
  'Identifica la causa al postergar una tarea',
  'Premia tu esfuerzo al completar una tarea.',
  'Establece plazos firmes: Define fechas límite realistas pero obligatorias.',
  'Busca un "socio de responsabilidad": Alguien que te motive a cumplir.',
  'Cambia tu entorno, a veces un cambio de aire ayuda a reiniciar.',
  'Perdónate por postergar: Evita la autocrítica excesiva.',
  'Empieza con la tarea más difícil: Quítatela de encima y sentirás alivio.',
  'Crea un ambiente ordenado: Un espacio limpio favorece una mente clara.',
  'Define qué quieres lograr antes de empezar.',
  'Enfócate en el presente por unos minutos al día.',
  'Toma pequeños descansos: Evita la fatiga mental prolongada.',
  'Escucha música instrumental: Puede ayudar a bloquear el ruido externo.',
  'Establece prioridades y enfócate en lo más importante primero.',
  'Duerme lo suficiente: La falta de sueño afecta gravemente la concentración.',
  '"La clave no es priorizar lo que está en tu agenda, sino agendar tus prioridades." – Stephen Covey',
  '"No digas que no tienes suficiente tiempo. Tienes exactamente el mismo número de horas al día que tuvieron Helen Keller, Miguel Ángel, Leonardo da Vinci, Thomas Jefferson y Albert Einstein." – H. Jackson Brown Jr.',
  '"La motivación es lo que te pone en marcha, el hábito es lo que te mantiene en marcha." – Jim Ryun',
  '"La forma más efectiva de hacerlo es hacerlo." – Amelia Earhart',
  '"No es que tengamos poco tiempo, es que perdemos mucho." – Séneca',
  '"El secreto para salir adelante es empezar. El secreto para empezar es dividir tus complejas y abrumadoras tareas en pequeñas tareas manejables, y luego empezar por la primera." – Mark Twain',
];

function getTipOfTheDay() {
  const today = new Date();
  // Cambia la frase cada día usando el día del año
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return timeManagementTips[dayOfYear % timeManagementTips.length];
}

const CalendarView = ({ tasks, onDayPress }) => {
  // Objeto para marcar los días con tareas
  const markedDates = {};
  tasks.forEach(task => {
    if (task.date) {
      const date = task.date.split('T')[0];
      markedDates[date] = {
        marked: true,
        dotColor: 'red',
        activeOpacity: 0
      };
    }
  });

  // Tip navigation state
  const tipOfDayIndex = (() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % timeManagementTips.length;
  })();
  const [tipIndex, setTipIndex] = React.useState(tipOfDayIndex);

  const goPrevTip = () => setTipIndex((prev) => (prev - 1 + timeManagementTips.length) % timeManagementTips.length);
  const goNextTip = () => setTipIndex((prev) => (prev + 1) % timeManagementTips.length);

  // Si el usuario regresa al tip del día, se resetea automáticamente si cambia el día
  useEffect(() => {
    setTipIndex(tipOfDayIndex);
    // eslint-disable-next-line
  }, [tipOfDayIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tip del día</Text>
        <View style={styles.tipRow}>
          <TouchableOpacity onPress={goPrevTip} style={styles.arrowBtn} accessibilityLabel="Tip anterior">
            <Text style={styles.arrowText}>{'\u25C0'}</Text>{/* ◀ */}
          </TouchableOpacity>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipsText}>{timeManagementTips[tipIndex]}</Text>
          </View>
          <TouchableOpacity onPress={goNextTip} style={styles.arrowBtn} accessibilityLabel="Tip siguiente">
            <Text style={styles.arrowText}>{'\u25B6'}</Text>{/* ▶ */}
          </TouchableOpacity>
        </View>
      </View>
      {/* Muestra el calendario con los días marcados */}
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          todayTextColor: 'blue',
          dotColor: 'red',
        }}
      />
    </View>
  );
};


// Estilos para el contenedor del calendario
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  tipsContainer: {
    backgroundColor: '#e7eef2',
    padding: 12,
    marginBottom: 28,
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 70,
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 4,
    flexWrap: 'nowrap',
    maxWidth: '100%',
  },
  arrowBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  arrowText: {
    fontSize: 28,
    color: '#2b3440',
    fontWeight: 'bold',
  },
  tipTextContainer: {
    flex: 1,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    maxWidth: '100%',
  },
  tipsText: {
    fontSize: 15,
    color: '#4e627f',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '100%',
  },
  tipsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#2b3440',
  },
  
});


// Exporta el componente para su uso en HomeScreen
export default CalendarView;
