import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskShow({ task, onDelete, onUpdate }) {
  //console.log(task);
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
    onDelete(task.id);
  };
  const handleEditClick = () => {
    //useState ile gönderilen değerin tam tersine set ediliyor. true ise false, false ise true
    setShowEdit(!showEdit);
  };

  //Alt komponentten (TaskCreate) onUpdate propunda 3 değişken döndürüyor, bunlar edit edilmiş değişkenler ve bunları burada alıp buradan da bir üst komponente taşımamız lazım.
  const handleSubmit = (id, updatedTitle, updatedTaskDesc) => {
    //TaskCreate de edit durumunda update olduğunda handleSubmit calısacak sonucunda setShowEdit i false yapacak o açılan edit kısımı kapansın diye
    setShowEdit(false);
    onUpdate(id, updatedTitle, updatedTaskDesc);

    //TaskCreate de onUpdate propunun ici dolduruldu.
    //TaskShow da aynı isimle veriler alındı ve üst komponent TaskList e geçirildi.
    //TaskListte herhangi bir işlem olmaksızın en üst komponent App.jsx e gönderildi. TaskListte sadece prop olarak tanımlandı cünkü alttan üste taşıma algoritması bu şekilde işliyor.
  };
  return (
    <div className="task-show">
      {showEdit ? (
        //Burada TaskCreate kısımına onCreate gönderiliyordu ek olarak bu ekrandan task (içerik detayı) ve FORMUN update olup olmadığı bilgisi gönderiliyor isUpdate olayı.
        <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3 className="task-title">Göreviniz</h3>
          <p>{task.title}</p>
          <h3 className="task-title">Yapılacaklar</h3>
          <p>{task.taskDesc}</p>
          <div>
            <button className="task-delete" onClick={handleDeleteClick}>
              Sil
            </button>
            {/* Güncelle buttonuna tıklanıldığında handleEditClick e gidiyor ve showEdit i setShowEdit ile true a çekiyor.
            eğer ki showEdit true ise TASKCREATE yani ana veri girdiğimiz component cağırılıyor. (O component içerisinde kontrol ve değişiklikler mevcut.) */}
            <button className="task-edit" onClick={handleEditClick}>
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;
