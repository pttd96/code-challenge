import type { User } from "../model/user.model.js";
import { userRepository } from "../repository/user.repository.js";

class UserService {
  createUser(name: string, score: number): User {
    console.log("Creating user: ", name, score);
    const createdUser = userRepository.createUser(name, score);
    console.log("Created user: ", name, score);
    return createdUser;
  }

  getUserById(id: number): User | undefined {
    console.log("Getting user by id: ", id);
    return userRepository.getUserById(id);
  }

  getUsers(limit?: number, user_name?: string, score?: number): User[] {
    console.log("Getting users by: "+ user_name + ", " + score + " limit: " + limit);
    return userRepository.getAll(limit, user_name, score);
  }

  deleteUser(id: number): boolean {
    console.log("Deleting user by id: ", id);
    const userDeleted = userRepository.deleteUser(id);
    if (userDeleted) {
        console.log("Deleted user by id: ", id);
    }
    return userDeleted;
  }

  updateUser(id: number, name?: string, score?: number): boolean {
    console.log("Updated user: ", id, name, score);
    const userUpdated = userRepository.updateUser(id, name, score);
    if (userUpdated) {
        console.log("Updated user by id: ", id);
    }
    return userUpdated
  }

}

export const userService = new UserService();