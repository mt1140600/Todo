import React from "react";
import ReactDOM from "react-dom";
import * as localForage from "localforage";

let place = document.querySelector("#test");
        let prevState;
        let arrN = [];
        class TodoItems extends React.Component {
            render() {

                function createList(item) {
                    let list = () => {
                        return <li key = {
                            item.key
                        } > {
                            item.text
                        } < /li>
                    };
                    return list();
                }

                let todoEntries = this.props.entries;
                let listItems = todoEntries.map(createList);
                return ( 
                <ol className = "theList" > {
                        listItems
                    } 
                    </ol>
                );
            }
        }

        class TodoList extends React.Component {
            constructor(props) {
                super(props);
                console.log(4545);
                localForage.getItem('my array').then(function(value) {
                    prevState = value;
                    console.log(prevState.length);
                    let i = 0;
                    for (let iterate of value) {
                        console.log('ujb');
                        console.log(iterate);
                        arrN[i] = {
                            text: iterate.text,
                            key: iterate.key
                        };
                        console.log(i);
                        i = i + 1;
                    }
                    console.log(arrN);
                }).catch(function(err) {
                    console.log(err);
                });
                this.state = {
                    items: arrN,
                    value: '',
                }
                this.store = this.store.bind(this);
                this.addItem = this.addItem.bind(this);
            }
            store(e) {
                this.setState({
                    value: e.target.value
                });
            }
            addItem(e) {
                let arr = this.state.items;

                arr.push({
                        text: this.state.value,
                        key: Date.now()
                    }

                );

                this.setState({
                    items: arr
                });
                localForage.setItem('my array', arr).then(function(value) {
                    
                }).catch(function(err) {
                    console.log(err);
                });
                this.state.value = "";
                e.preventDefault();
            }
            render() {
                return ( <
                    div className = "todoListMain" >
                    <
                    div className = "header" >
                    <
                    form >
                    <
                    input placeholder = "enter task"
                    value = {
                        this.state.value
                    }
                    onChange = {
                        this.store
                    } >
                    <
                    /input> <
                    button onClick = {
                        this.addItem
                    } > add < /button> <
                    /form> <
                    /div> <
                    TodoItems entries = {
                        this.state.items
                    }
                    /> <
                    /div>
                );
            }
        }
  const app = document.getElementById('app');
      ReactDOM.render(
        <div>
          <TodoList/>
        </div>,
        app
      );