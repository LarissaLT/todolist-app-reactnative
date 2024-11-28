import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StyleSheet, 
  Switch, 
  Modal 
} from 'react-native';

type Task = {
  id: string;
  text: string;
  isChecked: boolean;
};

const HomeScreen: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [virtualInspectionModalVisible, setVirtualInspectionModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const addTask = () => {
    if (task.trim()) {
      setTasksList((prevTasks) => [
        ...prevTasks,
        { id: Date.now().toString(), text: task, isChecked: false }
      ]);
      setTask('');
    }
  };

  const toggleTaskCheck = (taskId: string) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const deleteTask = () => {
    if (taskToDelete) {
      setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete));
      setTaskToDelete(null);
    }
    setVirtualInspectionModalVisible(false);
  };

  const handleDeletePress = (taskId: string) => {
    setTaskToDelete(taskId);
    setVirtualInspectionModalVisible(true); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={require('../assets/images/todolist.logo.png')} style={styles.logo} />
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

      <FlatList
        data={tasksList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => toggleTaskCheck(item.id)} style={styles.checkboxContainer}>
              <Image
                source={item.isChecked ? require('../assets/images/todolist.checkbox-on.png') : require('../assets/images/todolist.checkbox-off.png')}
                style={styles.checkbox}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.listItemText,
                item.isChecked && { textDecorationLine: 'line-through' }, 
              ]}
            >
              {item.text}
            </Text>

            <TouchableOpacity onPress={() => handleDeletePress(item.id)} style={styles.deleteButton}>
              <Image source={require('../assets/images/todolist.trash.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal */}
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
                onPress={deleteTask}
              >
                <Text style={styles.modalConfirmButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: 'black',
    borderColor: '#76d7ef',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    marginRight: 10,
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
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 35, 
    height: 35, 
    resizeMode: 'contain', 
  },
  listItemText: {
    color: '#333',
    fontSize: 16,
    flex: 1,
  },

  deleteButton: {
    alignSelf: 'flex-end',
    marginLeft: 'auto', 
    padding: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  cancelButton: {
    backgroundColor: '#76d7ef',
  },
  confirmButton: {
    backgroundColor: 'gray',
  },
  modalCancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalConfirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
