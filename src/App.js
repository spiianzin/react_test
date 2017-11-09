
var tasks = [
   {
      name: "Shopping",
      isDone: false,
      todo: [{name: "SHOP1", isDone: false}],
      subTasks: [
       {
         name: "The Best shop",
         isDone: true,
         todo: [
           {name: "the Best meat", isDone: false},
           {name: "the Best milk", isDone: false}
         ]
       },
       {
         name: "Ikea",
         isDone: false,
         todo: [
           {name: "Chair", isDone: false},
           {name: "Glasses", isDone: false}
       ]}
      ]
   },
   {
       name: "Washing",
       todo: [{name: "Washing2", isDone: false}],
       isDone: false,
       subTasks: [
         {name: "Clothes", isDone: false, todo: []},
         {name: "Car", isDone: false, todo: []}
     ]
   }
];

class AddTask extends React.Component {
  constructor(props) {
    super(props)
  }

  onAddTask() {
    var newTasks = this.props.tasks;
    var activeItem = this.props.activeItem;
    if (activeItem.subIndex == null) {
      newTasks.push({name: this.input.value, isDone: false, todo: [], subTasks:[]})
    } else {
      newTasks[activeItem.index].subTasks.push({name: this.input.value, isDone: false, todo: []})
    }
    this.props.onChangeState(newTasks);
  }

  render() {
    return(
      <div className="addTask">
        <input
          className='inputAddTask'
          defaultValue=''
          placeholder='Enter category name'
          ref={(input) => this.input = input}
        />
        <button onClick={() => this.onAddTask()}>add</button>
      </div>
    );
  }
}

class AddTodo extends React.Component {
  constructor(props) {
    super(props)
  }

  onAddTodo() {
    var newTasks = this.props.tasks;
    var activeItem = this.props.activeItem;
    if (activeItem.subIndex == null) {
      newTasks[activeItem.index].todo.push({name: this.input.value, isDone: false});
    } else {
      newTasks[activeItem.index].subTasks[activeItem.subIndex].todo.push({name: this.input.value, isDone: false});
    }
    this.props.onChangeState(newTasks);
  }

  render() {
    return(
      <div className="addTodo">
        <input
          className='inputAddTodo'
          defaultValue=''
          placeholder='Enter todo'
          ref={(input) => this.input = input}
        />
        <button onClick={() => this.onAddTodo()}>add</button>
      </div>
    );
  }
}

class SubTask extends React.Component {
  constructor(props) {
    super(props);
  }

  onDeleteSubTask = () => {
    var newTasks = this.props.tasks;
    newTasks[this.props.index].subTasks.splice(this.props.subIndex, 1);
    this.props.onChangeState(newTasks);
  }

  render() {
    return (
      <Item
        item={this.props.subTask}
        index={this.props.index}
        itemClass="subTask"
        subIndex={this.props.subIndex}
        onActivateItem={this.props.onActivateItem}
        onEditItem={this.props.onEditItem}
        onDeleteItem={this.onDeleteSubTask}
      />
    )
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  onDeleteTask = (task) => {
    var newTasks = this.props.tasks;
    newTasks.splice(this.props.index, 1);
    this.props.onChangeState(newTasks);
  }

  render() {
    return (
      <div>
        <Item
          item={this.props.task}
          index={this.props.index}
          subIndex={null}
          itemClass=""
          onActivateItem={this.props.onActivateItem}
          onEditItem={this.props.onEditItem}
          onDeleteItem={this.onDeleteTask}
        />
        { this.props.showSubTasks
          ? <div className="subTasks">
              {this.props.task.subTasks.map( (subTask, i) =>
                <SubTask
                  subTask={subTask}
                  index={this.props.index}
                  subIndex={i}
                  tasks={this.props.tasks}
                  onActivateItem={this.props.onActivateItem}
                  onEditItem={this.props.onEditItem}
                  onChangeState={this.props.onChangeState}
                />
              )}
            </div>
          : null
        }

      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (i) => {
    var tasks = this.props.tasks;
    var index = this.props.activeItem.index;
    var subIndex = this.props.activeItem.subIndex;

    if (index != null && subIndex != null) {
      var isDone = tasks[index].subTasks[subIndex].todo[i].isDone;
      tasks[index].subTasks[subIndex].todo[i].isDone = !isDone;
    } else {
      var isDone = tasks[index].todo[i].isDone;
      tasks[index].todo[i].isDone = !isDone;
    }
    this.props.onChangeState({tasks: tasks});
  }

  render() {
    return(
      <div className="todo">
          {this.props.todo.length != 0
            ? this.props.todo.map((item, i) =>
                <div className="todoItemWrapper">
                  <input onChange={() => this.onChange(i)} checked={item.isDone ? "checked" : ""} className="taskDoneCheckbox" type="checkbox" />
                  <p className="todoItem">{item.name}</p>
                </div> )
            : <p>Nothing doing here!</p>
          }
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <p className={this.props.itemClass + " button"} onClick={() => this.props.onActivateItem({item: this.props.item, index: this.props.index, subIndex: this.props.subIndex, changing: false})}>
          {this.props.item.name}
          <button className="editButton" onClick={() => this.props.onEditItem({item: this.props.item, index: this.props.index, subIndex: this.props.subIndex, changing: true})}>Edit</button>
          <button className="delButton" onClick={() => this.props.onDeleteItem(this.props.item) }>Del</button>
        </p>
      </div>
    )
  }
}


class Edit extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return(
      <div className="edit">
        <button>Save</button>
        <button onClick={() => this.props.onChangeState({editingItem: null})}>Close</button>
        <input
          className='inputAddTask'
          defaultValue=''
          placeholder='Enter category name'
          ref={(input) => this.input = input}
        />
        <input className="taskDoneCheckbox" type="checkbox" />
        <textarea name="Text1" cols="40" rows="5"></textarea>
      </div>
    )
  }
}


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tasks: tasks,
       activeItem: {item: tasks[0], index: 0, subIndex: null, changing: false},
       editingItem: null
     }
  }

  onActivateItem = (item) => {
    this.setState({activeItem: item})
  }

  onEditItem = (item) => {
    this.setState({editingItem: item})
  }

  onChangeState = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="app">
        <h1>Todo app</h1>
        <div className="inputs">
          <AddTask onChangeState={this.onChangeState} tasks={tasks} activeItem={this.state.activeItem} />
          <AddTodo onChangeState={this.onChangeState} tasks={tasks} activeItem={this.state.activeItem} />
        </div>
        <div className="main">
          <div className="tasks">
            {this.state.tasks.map((task, i) =>
              <Task
                index={i}
                task={task}
                tasks={tasks}
                showSubTasks={i == this.state.activeItem.index ? true :false }
                onActivateItem={this.onActivateItem.bind(this)}
                onEditItem={this.onEditItem}
                onChangeState={this.onChangeState}
              />
            )}
          </div>
          { this.state.editingItem
            ? <Edit onChangeState={this.onChangeState} />
            : <TodoList
                activeItem={this.state.activeItem}
                todo={this.state.activeItem.item.hasOwnProperty('todo') ? this.state.activeItem.item.todo : [] }
                tasks={tasks}
                onChangeState={this.onChangeState}
               />
           }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));