import { mockRequest } from './apiClient';
import { users } from '../data/users';

// Later: GET /api/users
export function getUsers() {
  return mockRequest([...users]);
}

// Later: POST /api/users
export function addUser(newUser) {
  return mockRequest(() => {
    const user = {
      id: `U-${1000 + users.length + 1}`,
      status: 'Active',
      lastLogin: 'Never',
      ...newUser,
    };
    users.push(user);
    return user;
  }, { delay: 400 });
}

// Later: PATCH /api/users/:id
export function updateUserStatus(id, status) {
  return mockRequest(() => {
    const user = users.find((u) => u.id === id);
    if (user) user.status = status;
    return user;
  }, { delay: 300 });
}
