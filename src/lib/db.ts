import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export const getProducts = () => {
    const filePath = path.join(dataDir, 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

export const getUsers = () => {
    const filePath = path.join(dataDir, 'users.json');
    if (!fs.existsSync(filePath)) return [];
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

export const saveUser = (user: any) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
    return user;
};

export const getOrders = () => {
    const filePath = path.join(dataDir, 'orders.json');
    if (!fs.existsSync(filePath)) return [];
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

export const saveOrder = (order: any) => {
    const orders = getOrders();
    orders.push(order);
    fs.writeFileSync(path.join(dataDir, 'orders.json'), JSON.stringify(orders, null, 2));
    return order;
};
