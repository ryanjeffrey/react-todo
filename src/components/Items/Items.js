import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useItems } from '../../hooks/useItems';
import { createListItem, deleteListItem, toggleListItem } from '../../services/items';

import './Items.css';

export default function Items() {
  const [description, setDescription] = useState('');
  const { items, setItems } = useItems();
  const { user } = useContext(UserContext);
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleClick = async (item) => {
    try {
      const updatedItem = await toggleListItem(item);
      setItems((prevItems) =>
        prevItems.map((prevItem) => (prevItem.id === item.id ? updatedItem : prevItem))
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const handleNewItem = async () => {
    try {
      const newItem = await createListItem(description);
      setItems((prev) => [...prev, newItem]);
      setDescription('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    const message = 'Are you sure you want to delete this To Do?';
    if (!confirm(message)) return;
    const deletedItem = await deleteListItem(id);
    setItems((prevState) => prevState.filter((prevTodo) => prevTodo.id !== deletedItem.id));
  };

  return (
    <div className="todo-wrapper">
      {items.map((item) => (
        <div key={item.id}>
          <label className="checkbox">
            <input type="checkbox" checked={item.complete} onChange={() => handleClick(item)} />
            {item.description}
          </label>
          <button className="delete-button" onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Add ToDo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button onClick={handleNewItem}>Add</button>
      </div>
    </div>
  );
}
