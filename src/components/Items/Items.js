import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useItems } from '../../hooks/useItems';
import { createListItem, toggleListItem } from '../../services/items';

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
      await createListItem(description);
      setItems((prev) => [...prev, { description }]);
      setDescription('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <div className='todo-wrapper'>
      {items.map((item) => (
        <div key={item.id}>
          <label className="checkbox">
            <input type="checkbox" checked={item.complete} onChange={() => handleClick(item)} />
            {item.description}
          </label>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="new item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleNewItem}>
          Add
        </button>
      </div>
    </div>
  );
}
