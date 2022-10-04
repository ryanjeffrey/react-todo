import { checkError, client } from './client';

export async function getListItems() {
  const response = await client.from('todos').select();
  return checkError(response);
}

export async function createListItem(description) {
  const response = await client.from('todos').insert({ description }).single();
  
  return checkError(response);
}

export async function toggleListItem({ id, complete }) {
  const response = await client
    .from('todos')
    .update({ complete: !complete })
    .match({ id })
    .single();

  return checkError(response);
}

export async function deleteListItem(id) {
  const response = await client.from('todos').delete().match({ id }).single();

  return checkError(response);
}