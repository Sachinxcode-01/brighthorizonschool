import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialData } from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../../db.json');

class Database {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure all keys exist
        for (const key in initialData) {
          if (!this.data[key]) {
            this.data[key] = initialData[key];
          }
        }
      } else {
        this.data = { ...initialData };
        this.save();
      }
    } catch (err) {
      console.error('Error initializing database file, falling back to initial data:', err);
      this.data = { ...initialData };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  getCollection(name) {
    return this.data[name] || [];
  }

  setCollection(name, items) {
    this.data[name] = items;
    this.save();
  }

  getItem(collectionName, id) {
    const list = this.getCollection(collectionName);
    return list.find(item => item.id === id);
  }

  addItem(collectionName, item) {
    const list = this.getCollection(collectionName);
    const newItem = {
      id: item.id || `${collectionName.slice(0, 3)}-${Date.now()}`,
      ...item
    };
    list.unshift(newItem);
    this.setCollection(collectionName, list);
    return newItem;
  }

  updateItem(collectionName, id, updates) {
    const list = this.getCollection(collectionName);
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    this.setCollection(collectionName, list);
    return list[index];
  }

  deleteItem(collectionName, id) {
    const list = this.getCollection(collectionName);
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length === list.length) return false;
    this.setCollection(collectionName, filtered);
    return true;
  }

  getObject(name) {
    return this.data[name] || {};
  }

  updateObject(name, updates) {
    this.data[name] = { ...this.data[name], ...updates };
    this.save();
    return this.data[name];
  }

  logAudit(adminEmail, action, details, ipAddress = '127.0.0.1') {
    const logs = this.getCollection('auditLogs');
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminId: 'admin-1',
      adminEmail: adminEmail || 'admin@brighthorizon.edu.in',
      action,
      details,
      ipAddress
    };
    logs.unshift(newLog);
    this.setCollection('auditLogs', logs.slice(0, 200)); // keep last 200 logs
  }
}

export const db = new Database();
