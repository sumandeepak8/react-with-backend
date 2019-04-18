import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: props.books,
      bookToAdd: ''
    };
  }

  transfer() {
    this.state.bookToAdd = document.getElementsByTagName('input')[0].value;
    const reqData = {
      method: 'POST',
      body: this.state.bookToAdd
    };
    fetch('/addBook', reqData)
      .then(res => res.json())
      .then(booksData => {
        this.setState({
          bookToAdd: this.state.bookToAdd,
          books: booksData
        });
      });
  }

  getForm() {
    return (
      <div id="form" className="form">
        <input placeholder="Enter the book name" />
        <input type="submit" value="add" onClick={this.transfer.bind(this)} />
      </div>
    );
  }

  getRow(bookId, bookName) {
    return (
      <tr>
        <td>{bookId}</td>
        <td>{bookName}</td>
      </tr>
    );
  }

  getTableBody() {
    if (this.state.books != undefined)
      return this.state.books.map(book => {
        return this.getRow(book.id, book.name);
      });
  }

  getTable() {
    return (
      <table id="books" className="books">
        <thead>
          <td>BOOK ID</td>
          <td>BOOK NAME</td>
        </thead>
        <tbody>{this.getTableBody()}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.getForm()}
        {this.getTable()}
      </div>
    );
  }
}

export default App;
