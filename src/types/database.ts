export interface Database {
  id: number;
  name: string;
  createdDate: string;
  tables: Table[];
}

export interface Table {
  id: number;
  name: string;
  schema: string;
  columns: Column[];
}

export interface Column {
  id: number;
  name: string;
  dataType: string;
  maxLength?: number;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isIdentity: boolean;
  defaultValue?: string;
}
