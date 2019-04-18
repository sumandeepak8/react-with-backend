import React, { Component } from 'react';
import './App.css';

class App extends Component {

  transfer() {
    let bookName = document.getElementsByTagName('input')[0].value;
    const reqData = {
      method: 'POST',
      body: bookName
    };

    fetch('/addBook', reqData)
      .then(res => res.json())
      .then(rows => {
        let booksTable = document.getElementById('books');
        let tbody = booksTable.getElementsByTagName('tbody');
        tbody.innerHTML = '';
        rows.forEach(element => {
          let row = document.createElement('tr');
          let idColoumn = document.createElement('td');
          idColoumn.innerText = element.id;
          let nameColoumn = document.createElement('td');
          nameColoumn.innerText = element.name;
          row.appendChild(idColoumn);
          row.appendChild(nameColoumn);
          tbody[0].appendChild(row);
        });
      });
  }

  render() {
    return (
      <div id="form" className="form">
        <input placeholder="Enter the book name" />
        <input type="submit" value="add" onClick={this.transfer.bind(this)} />
      </div>
    );
  }
}

export default App;
