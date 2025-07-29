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

export interface GenerationType {
  value: string;
  label: string;
  description: string;
}

export interface CodeGenerationRequest {
  DatabaseName: string;
  TableName: string;
  Schema?: string;
  GenerationTypes: string[];
  Options: GenerationOptions;
}

export interface GenerationOptions {
  Namespace: string;
  UseDataAnnotations: boolean;
  GenerateController: boolean;
  GenerateService: boolean;
  GenerateRepository: boolean;
  GenerateInterface: boolean;
  FrameworkType: FrameworkType;
  
  // React-specific options
  ReactOptions?: ReactGenerationOptions;
  
  // Configuration.API-specific options
  configurationApiOptions?: ConfigurationApiGenerationOptions;
}

export interface ConfigurationApiGenerationOptions {
  generateHandlers: boolean;          // CQRS Handlers with MediatR
  generateEndpoints: boolean;         // Carter minimal API endpoints
  generateRepository: boolean;        // Repository interface + Dapper implementation
  generateModel: boolean;            // Entity model with EF annotations
  generateExceptions: boolean;       // Custom exception classes
  generateStoredProcedures: boolean; // Complete CRUD stored procedures
  generatePagination: boolean;       // Include pagination handlers
  outputStructure: 'vertical-slice' | 'layered'; // Architecture type
  useFluentValidation: boolean;      // Include validators
  useDapper: boolean;                // Use Dapper for data access
}

export interface ReactGenerationOptions {
  GenerateApi: boolean;           // RTK Query API slice
  GenerateInterfaces: boolean;    // TypeScript interfaces
  GenerateComponents: boolean;    // React components (List + FormModal)
  GeneratePages: boolean;         // Page wrappers
  GenerateRedux: boolean;         // Redux Toolkit slices
  UseTypeScript: boolean;         // Use TypeScript (always true for this project)
  ComponentStyle: string;         // Component style: 'functional' | 'class'
  StateManagement: string;        // State management: 'redux' | 'local'
  EnableBulkOperations: boolean;  // Enable bulk operations in components
  EnableExport: boolean;          // Enable export functionality
  EnableAdvancedFiltering: boolean; // Enable advanced filtering
  UseDataTable: boolean;          // Use advanced data table features
  FormLayout: string;             // Form layout: 'vertical' | 'horizontal'
  DefaultPageSize: number;        // Default page size for tables
}

export enum FrameworkType {
  DotNet = 'DotNet',
  NodeJs = 'NodeJs',
  React = 'React',
  Angular = 'Angular',
  ConfigurationAPI = 'ConfigurationApi',
  ServicesAPI = 'ServicesApi'
}

export interface GeneratedCode {
  fileName: string;
  content: string;
  fileType: string;
  filePath?: string;  // Full path for React files
  layer?: 'Api' | 'Interface' | 'Component' | 'Page' | 'Redux';  // React layer type
}

export interface ReactGeneratedFiles {
  apiFile?: GeneratedCode;        // Apis/[Entity]/[entity]Api.ts
  interfaceFile?: GeneratedCode;  // Interfaces/Settings/[entity]Types.ts
  listComponent?: GeneratedCode;  // Components/Page/Settings/[Entity]/[Entity]List.tsx
  formComponent?: GeneratedCode;  // Components/Page/Settings/[Entity]/[Entity]FormModal.tsx
  pageComponent?: GeneratedCode;  // Pages/Settings/[Entity]Page/[Entity].tsx
  reduxSlice?: GeneratedCode;     // Storage/Redux/Settings/[Entity]/[entity]Slice.ts
  additionalFiles?: GeneratedCode[];   // Additional generated files
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName?: string;
  lastName?: string;
  expires: string;
}

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
}
