import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  //burada herhangi bir prop isimi verilebilir. diğer tarafta iki tane bu tarafta da iki tane önemli olan bu.
  const createTask = async (title, taskDesc) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title,
      taskDesc,
    });
    console.log(response);

    //console.log(title, taskDesc);
    const createdTasks = [
      ...tasks,
      //Api Datası
      response.data,
      ////Local Data ;
      // {
      //   id: Math.round(Math.random() * 999999),
      //   title,
      //   taskDesc,
      // },
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    //console.log(response);
    setTasks(response.data);
  };
  useEffect(() => {
    console.log("ilk kez çalıştığında (page load)");
    fetchTasks();
  }, []);
  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetchTasks();
    // //Local Data ;
    // ////burada silinmek icin gönderilen task id i görebiliriz.
    // //console.log(id);

    // //Burada olay mevcut taskların (tasks array i) içerisinde task.id e denk gelen dışındakileri FİLTRELE ve onları bu değişkende dön olayıdır.
    // //Bu değişkende döndü tamam, sonrasında ise setTasks ile tasks yani mevcut taskları afterDeletingTasks ile güncelleme durumudur.
    // //Basit örnekleme yaparsak, Tasks = 1,2,3,4,5 id li 5 elemanlı bir dizi. Gidip 3 id li değeri silmeye calıstığımızda filtreleme 1,2,4,5 dönecek ve bunu bir değişkene atayacak (afterDeletingTasks)
    // //Sonra bu değişkendeki diziyi setTasks ile tasks arrayina atamasını yapacağım ve mevcut array 4 elemanlı bir dizi haline dönmüş olacak.
    // const afterDeletingTasks = tasks.filter((task) => {
    //   return task.id !== id;
    // });

    // setTasks(afterDeletingTasks);
  };

  const updateTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    fetchTasks();

    // //Local Data ;
    // //Burada en alt kısım olan TaskCreate kısımında değişikliğe uğrayan veriler (3 veriden 2 si uğruyor id sabit) silsile yolu ile buraya kadar gönderiliyor.
    // //TaskCreate onUpdate => TaskShow onUpdate handleSubmit => TaskList onUpdate => App.jsx onUpdate updateTaskById
    // //Burada işlemler yapılıyor ve update ediyor.
    // //Detay ekranının kapanma işlemi TaskShow kısımında handleSubmit kısımında VERİ TRANSFERİ yapmadan önce kapatılıyor.
    // const updatedTasks = tasks.map((task) => {
    //   if (task.id === id) {
    //     return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
    //   }
    //   return task;
    // });
    // setTasks(updatedTasks);
  };
  return (
    <div className="App">
      {/* TaskCreate ekranında onCreate prop u var.
      TaskCreate de handleSubmit onCreate değerini dolduruyor. TaskCreate de bu prop var zaten (başında)
      dolan onCreate propu da createTask a gidiyor. onCreate de iki değişken olduğu icin createTask da bunu iki değişken olarak karşılıyor.
      Yani Ana formdan alt forma nasıl prop gönderiliyorsa, alt form dan da ana forma ters şekilde prop gönderilebiliyor.
      Alt formda dolduruyor ana forma gönderiyor, ana form da createTask ile iki değişkeni yakalayıp tutuyor.
       */}
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      {/* Sil buttonunun en alt kırılımı TaskShow ekranı.
      TaskShow ekranında Sil buttonuna tıklanınca onDelete prop u silinecek id ile dolduruluyor.
      Sonrasında TaskList ekranında aynı sekilde alttan gelen onDelete mevcut ekranda onDelete ile doldurulup bir üst ekranı olan App.jsx e gönderiliyor.
      Burada da aşağı saturdaki gibi onDelete fonksiyonu, deleteTaskById ile ilişkilendiriliyor, yani en alttaki onDelete e basılınca oradan doldurup veri en üste gönderiliyor.
      En üsttede işlem yapılıyor.
      Ana ekrandan alt ekrana prop geçmek gibi aslında, alt ekranlardan en üste veri taşıma durumu.
      bu durum eğer istenirse TaskList yani ortanca ekranda da yapılabilir sonucta elimizde orada da veri ver ama ana işlemleri yaptığımız yer App.jsx  
      Dikkat edilmesi gereken en önemli husus ana ekran ve alt ekranlardaki PROPS isimlerinin aynı olması. Yoksa prop.bilmemne şeklinde kullanılması gerekli olabilir hiç gerek yok.
      Aynı isimde gönderilirse sorun olmayacaktır.
      */}
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={updateTaskById}
      />
    </div>
  );
}

export default App;
