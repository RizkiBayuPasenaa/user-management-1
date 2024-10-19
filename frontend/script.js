const apiUrl = 'http://localhost:5000/users';

function getUsers() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayUsers(data));
}

function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteUser(user.id);

    li.appendChild(deleteBtn);
    userList.appendChild(li);
  });
}

function addUser() {
  const username = document.getElementById('username').value;
  
  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: username })
  }).then(() => getUsers());
}

function deleteUser(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  }).then(() => getUsers());
}

document.getElementById('addUserBtn').addEventListener('click', addUser);

getUsers();
