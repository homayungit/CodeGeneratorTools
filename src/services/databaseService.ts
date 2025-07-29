import api from './api';
import { Database, Table } from '../types';

export const databaseService = {
  async getDatabases(): Promise<Database[]> {
    const response = await api.get('/database/list');
    return response.data;
  },

  async getDatabaseTables(databaseName: string): Promise<Database> {
    const response = await api.get(`/database/${databaseName}/tables`);
    return response.data;
  },

  async getTableColumns(databaseName: string, tableName: string, schema: string = 'dbo'): Promise<Table> {
    const response = await api.get(`/database/${databaseName}/tables/${tableName}/columns`, {
      params: { schema }
    });
    return response.data;
  }
};
