
var data = [
  {
  title: '1',
  subTasks : [
      {
        title: '1.1'
        to_do: [
          {
            title: 'todo1'
            description: 'Super cool task'
          },
        ]
      },
      {
        title: '1.2',
        to_do: []
      }
    ]
  },
  {
  title: '2',
  subTasks : [
      {
        title: '2.1',
        to_do: []
      },
      {
        title: '2.2',
        to_do: []
      }
    ]
  }
];

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = this.props.data.title;
    var subTasks = this.props.data.subTasks;
    return (
        <div>
          <h3>{title}</h3>
          <ul>
          <SubCategory />
          </ul>
        </div>
    );
  }
};

class SubCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = this.props.data.title;
    var subTasks = this.props.data.subTasks;
    return (
            {subTasks.map((item, index) => <li className="categories__subCategory" >{item.title}</li>)}
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>To-do list</h1>
        <input
          className='test-input'
          placeholder='введите значение'
        />
        <div className="categories">
          {data.map((item) => <Category data={item}/>)}
        </div>
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
