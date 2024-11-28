import AsyncStorage from '@react-native-async-storage/async-storage';

const DB_KEY = 'tasks'; // Nome da chave para o banco de dados no AsyncStorage

// Função para pegar todos os itens do banco (GET)
const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem(DB_KEY);
    return tasks ? JSON.parse(tasks) : []; // Se não houver dados, retorna um array vazio
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
};

// Função para adicionar uma nova tarefa (POST)
const addTask = async (newTask: { id: string; text: string }) => {
  try {
    const tasks = await getTasks();
    tasks.push(newTask);
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(tasks)); // Atualiza o banco com a nova tarefa
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
};

// Função para excluir uma tarefa pelo ID (DELETE)
const deleteTask = async (taskId: string) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((task: { id: string }) => task.id !== taskId); // Filtra a tarefa a ser excluída
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(updatedTasks)); // Atualiza o banco
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
  }
};

export { getTasks, addTask, deleteTask };
