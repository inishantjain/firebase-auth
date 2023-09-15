import { db } from "../firebase";
import { query, getDocs, collection, addDoc, deleteDoc, doc, where, updateDoc } from "firebase/firestore";
import { TaskType } from "../types/types.task";

// const UserCollectionRef = collection(db, "users");
const taskCollectionRef = collection(db, "tasks");

export async function getUserTasks(uid: string): Promise<TaskType[]> {
  const queryByUid = query(taskCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(queryByUid);
  return querySnapshot.docs.map((doc) => {
    return { docId: doc.id, ...doc.data() } as TaskType;
  });
}

export async function createUserTasks(uid: string, title: string, description: string) {
  return addDoc(taskCollectionRef, {
    //document format
    uid,
    title,
    description,
    isCompleted: false,
  });
}

export function deleteUserTasks(docId: string) {
  const docRef = doc(db, "tasks", docId);
  return deleteDoc(docRef);
}

export function updateTask( //FIXME: update task only if it is associated with the right uid
  docId: string,
  taskData: { title?: string; description?: string; isCompleted?: boolean } = {}
) {
  // const { title, description, isCompleted } = taskData;

  const docRef = doc(db, "tasks", docId);
  return updateDoc(docRef, taskData);
}

// function addTask(title: string, description: string) {}
