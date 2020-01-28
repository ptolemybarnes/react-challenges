import uuidv1 from 'uuid/v1';

const db = {
  getAll: () => (
    fetch("http://localhost:3001/todos").then(response => response.json())
  ),

  create: entry => {
    const newEntry = { ...entry, id: uuidv1() };
    return fetch("http://localhost:3001/todos", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    }).then(response => response.json())
  },

  delete: id => (
    fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
  ),

  update: entry => (
    fetch(`http://localhost:3001/todos/${entry.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    })
  )
}


export default db;
