import React from 'react'
import PropTypes from 'prop-types';



class TodoItem extends React.Component {

    getStyle = () =>{
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ?
            'line-through' : 'none'
        }
    }

    render() {
        const {id, title, completed} = this.props.todo;
        return (
            <div style={this.getStyle()}>

                <p>
                    <input type="checkbox" checked={completed}onChange={this.props.markComplete.bind(this, id)}/> {'  '}
                    {title}
                    <button onClick={this.props.delTodo.bind(this, id)} style = {btnStyle}>X</button>
                </p>
            </div>
        )
    }
}



//PropTypes
TodoItem.propType = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    float: 'right'
}

export default TodoItem
