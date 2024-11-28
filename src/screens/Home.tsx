import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';

import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

export type Task = {
  id: string;
  text: string;
  isChecked: boolean;
  date: string;
};

const HomeScreen: React.FC = () => {
  const [task, setTask] = useState<string>(''); 
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [virtualInspectionModalVisible, setVirtualInspectionModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const loadTasks = async () => {
      const tasksData: Task[] = [
        { id: '1', text: 'Comprar pão na padaria para o café da manhã.', isChecked: false, date: '25-11-2024' },
        { id: '2', text: 'Ir ao supermercado para comprar frutas e vegetais.', isChecked: false, date: '25-11-2024' },
        { id: '3', text: 'Lavar o carro, pois está muito sujo.', isChecked: true, date: '25-11-2024' },

        { id: '4', text: 'Estudar para a prova de matemática amanhã.', isChecked: false, date: '26-11-2024' },
        { id: '5', text: 'Fazer revisão das notas de física para a aula de amanhã.', isChecked: true, date: '26-11-2024' },
        { id: '6', text: 'Finalizar relatório do projeto de TI.', isChecked: false, date: '26-11-2024' },
        { id: '7', text: 'Fazer a receita de bolo de chocolate para o aniversário.', isChecked: true, date: '26-11-2024' },
        { id: '8', text: 'Responder e-mails pendentes.', isChecked: false, date: '26-11-2024' },
        { id: '9', text: 'Agendar reunião com o cliente para a próxima semana.', isChecked: true, date: '26-11-2024' },
        { id: '10', text: 'Limpar a casa e arrumar o quarto.', isChecked: false, date: '26-11-2024' },
        { id: '11', text: 'Fazer compras para a festa de fim de semana.', isChecked: true, date: '26-11-2024' },

        { id: '12', text: 'Fazer check-in para o voo da viagem de negócios.', isChecked: false, date: '27-11-2024' },
        { id: '13', text: 'Comprar ingressos para o evento de sexta-feira.', isChecked: true, date: '27-11-2024' },
        { id: '14', text: 'Assistir ao webinar sobre marketing digital.', isChecked: true, date: '27-11-2024' },
        { id: '15', text: 'Organizar arquivos no Google Drive.', isChecked: false, date: '27-11-2024' },
        { id: '16', text: 'Marcar consulta no dentista.', isChecked: false, date: '27-11-2024' },
      ];
      setTasks(tasksData);
      setTasksList(tasksData); 
    };
  
    loadTasks();
  }, []);

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Erro', 'A tarefa não pode estar vazia.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
      isChecked: false,
      date: format(selectedDate, 'dd-MM-yyyy'),
    };

    setTasksList((prevTasks) => [...prevTasks, newTask]);
    setTask('');
  };

  const deleteTask = (taskId: string | null) => {
    if (!taskId) return;
    setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setVirtualInspectionModalVisible(false);
    setTaskToDelete(null);
  };

  const toggleTaskCheck = (taskId: string) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleDeletePress = (taskId: string) => {
    setTaskToDelete(taskId);
    setVirtualInspectionModalVisible(true);
  };

  const filteredTasks = tasksList.filter(
    (task) => task.date === format(selectedDate, 'dd-MM-yyyy')
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages =
    filteredTasks.length === 0 ? 1 : Math.ceil(filteredTasks.length / tasksPerPage);

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      const today = new Date();
      if (date > today) {
        Alert.alert('Data inválida', 'Não é permitido escolher uma data futura');
        setSelectedDate(today);
      } else {
        setSelectedDate(date);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image
          source={require('../assets/images/todolist.logo.png')}
          style={styles.logo}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={task}
        onChangeText={setTask}
        placeholderTextColor="#888"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showDatePickerHandler} style={styles.dateButton}>
          <Image
            source={require('../assets/images/todolist.calendar.png')}
            style={styles.calendarIcon}
          />
        </TouchableOpacity>
        <Text style={styles.dateText}>{format(selectedDate, 'dd/MM/yyyy')}</Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.tasks}>
      {filteredTasks.length === 0 ? (
        <View style={styles.taskInfo}>
          <Text style={styles.noTasksText}>Você ainda não tem tarefas</Text>
        </View>
      ) : (

      <FlatList
        data={currentTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => toggleTaskCheck(item.id)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  item.isChecked
                    ? require('../assets/images/todolist.checkbox-on.png')
                    : require('../assets/images/todolist.checkbox-off.png')
                }
                style={styles.checkbox}
              />
            </TouchableOpacity>

            <Text
              style={[styles.listItemText, item.isChecked && { textDecorationLine: 'line-through' }]}
            >
              {item.text}
            </Text>

            <TouchableOpacity
              onPress={() => handleDeletePress(item.id)}
              style={styles.deleteButton}
            >
              <Image
                source={require('../assets/images/todolist.trash.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    )}
    </View>

    <View style={styles.pagination}>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={styles.pageButton}
        >
          <Image
          source={require('../assets/images/todolist.left.png')}
          style={styles.imageleft}
        />
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Página {currentPage} de {totalPages}
        </Text>

        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={styles.pageButton}
        >
          <Image
          source={require('../assets/images/todolist.right.png')}
          style={styles.imageright}
        />
        </TouchableOpacity>
      </View>

      <Modal
        visible={virtualInspectionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setVirtualInspectionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>
              Deseja realmente excluir esta tarefa?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setVirtualInspectionModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => deleteTask(taskToDelete)}
              >
                <Text style={styles.modalConfirmButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f8fa',
  },
  navbar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    color: '#1e3050',
    borderColor: '#76d7ef',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#76d7ef',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  dateText: {
    color: '#1e3050',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  dateButton: {
    padding: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  calendarIcon: {
    backgroundColor: '#f5f8fa',
    width: 25, 
    height: 25, 
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 5,
  },
  checkbox: {
    width: 25,
    height: 25,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1e3050',
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteIcon: {
    width: 18,
    height: 18,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  imageleft: {
    width: 15, 
    height: 15, 
    resizeMode: 'contain', 
  },
  imageright: {
    width: 15, 
    height: 15, 
    resizeMode: 'contain', 
  },
  pageText: {
    color: '#1e3050',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '42%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#1e3050',
  },
  modalCancelButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  modalConfirmButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  noTasksText: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  taskInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center',
  },
  tasks: {
    flexGrow: 1,
  },
  pagination: {
    flexShrink: 0, 
    marginTop: 20,
  },
});

export default HomeScreen;
