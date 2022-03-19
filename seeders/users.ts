import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../models/User';


export const users: IUser[] = [
    {
        id: uuidv4(),
        name: 'Pedro',
        email: 'pedro@pedro.com',
        password: 'test'
    },
    {
        id: uuidv4(),
        name: 'Paula',
        email: 'paula@paula.com',
        password: 'test2'
    }
]