import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : "");

  //console.log(title, taskDesc);
  const handleChange = (event) => {
    //input a girilen değer (title input) event.target.value da tutuluyor.
    //input a value olarak verildiği ve yukarıda property olarak event yazdığımız için event.target.value oluyor.
    setTitle(event.target.value);
  };

  const handleTaskChange = (event) => {
    setTaskDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskFormUpdate) {
      onUpdate(task.id, title, taskDesc);
    } else {
      onCreate(title, taskDesc);
    }
    setTitle("");
    setTaskDesc("");
  };
  return (
    <div>
      {/* Gelen değerlerde taskFormUpdate değeri true ise update kısımı olarak işlem görecek ve bu bağlamda width, button renk ad (css) değerleri ve veriler ona göre set edilecek.
      Eğer ki false ise standart TaskCreate ekranımız acılacak. 
      Gelen task değerlerinde value lar (burada örnek title ve taskDesc) olduğu icin otomatik doldurma işlemini yapıyor.
      HTML de ki <form> durumu gibi.*/}
      {taskFormUpdate ? (
        <div className="task-update">
          <h3>Lütfen Taskı Düzenleyin !</h3>
          <form className="task-form">
            <label className="task-label">Başlığı Düzenleyin</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            />
            <label className="task-label">Taskı Düzenleyin</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button
              className="task-button update-button"
              onClick={handleSubmit}
            >
              Düzenle
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Lütfen Task Ekleyiniz !</h3>
          <form className="task-form">
            <label className="task-label">Başlık</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            />
            <label className="task-label">Task (Açıklama)</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button className="task-button" onClick={handleSubmit}>
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
