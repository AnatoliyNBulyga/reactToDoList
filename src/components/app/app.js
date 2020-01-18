import React, {Component} from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import TodoList from "../todo-list/todo-list";
import './app.css';
import ItemAddForm from "../item-add-form/item-add-form";

export default class App extends Component {
    state = {
      todoData: [
          {text: 'Drink Coffee', important: false, id: 1, done: false},
          {text: 'Make Awesome app', important: true, id: 2, done: false},
          {text: 'Have a lunch', important: false, id: 3, done: false},
      ],
      newFormText: '',
      newSearchValue: '',
      filter: 'all' /* active, all, done */
    };

    onDeleted = (id) => {

        this.setState(({todoData}) => ({
            todoData: [...todoData].filter( (el) => el.id !== id )
        }));

    }
    
    onAddItem = (text) => {
        this.setState(({todoData}) => ({
            todoData: [...todoData, {text: text, important: false, id: todoData.length + 1, done: false}]
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.onAddItem(this.state.newFormText);
        this.setState({
            newFormText: ''
        })
    }

    onToggleProperty(arr, id, propertyName) {
        
        return {
            todoData: [ ...arr ].map(( item ) => {
                if ( item.id === id ) return {  ...item, [propertyName]: !item[propertyName]  }
                return item;
            })
        }

    }

    onToggleImportant = (id) => {
        this.setState( ( {todoData} ) => this.onToggleProperty( todoData, id, 'important') )
    }

    onToggleDone = (id) => {
        this.setState( ({ todoData }) => this.onToggleProperty( todoData, id, 'done') )
    }

    onLabelChange = (e) => {
        const value = e.target.value;
        this.setState((state) => ({
            todoData: [...state.todoData],
            newFormText: value
        }))
    }

    onSearchChange = (e) => {
       const value = e.target.value;
       
       this.setState( (state) => ({
           ...state,
           newSearchValue: value
       }));
    }

    search(items, text) {
        if (text.length === 0) return items;
        return items.filter( item =>  item.text.toLowerCase().indexOf(text.toLowerCase().trim()) > -1)

    }

    filterItems(items, filter) {
        switch(filter) {
            case "all":
                return items;
            case "active":
                return items.filter( item => !item.done);
            case "done":
                return items.filter( item => item.done);
            default:
                return items;
        }
    }

    onFilter = (value) => {
        this.setState((state) => ({
            ...state,
            filter: value
        }))

    }

     render() {
        const {todoData, newSearchValue, newFormText, filter} = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.filterItems(this.search(todoData, newSearchValue), filter);

         return (
             <div className="todo-app">
                 <AppHeader toDo={todoCount} done={doneCount}/>
                 <div className="top-panel d-flex">
                     <SearchPanel placeholder="search"
                                  value={newSearchValue}
                                  onSearchChange={this.onSearchChange}/>
                     <ItemStatusFilter filter={filter} onFilter={this.onFilter}
                     />
                 </div>
                 <TodoList
                     todos={visibleItems}
                     onDeleted={this.onDeleted}
                     onToggleImportant={this.onToggleImportant}
                     onToggleDone={this.onToggleDone}
                     compare={todoData.compare}
                 />
                 <ItemAddForm text={newFormText} onSubmit={this.onSubmit} onLabelChange={this.onLabelChange} onAddItem={this.onAddItem} />
             </div>
         );
     }
}
