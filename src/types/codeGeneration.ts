export interface CodeGenerationRequest {
  DatabaseName: string;
  TableName: string;
  Schema?: string;
  GenerationTypes: string[];
  Options: GenerationOptions;
}

export interface GenerationOptions {
  namespace: string;
  useDataAnnotations: boolean;
  generateController: boolean;
  generateService: boolean;
  generateRepository: boolean;
  generateInterface: boolean;
  frameworkType: FrameworkType;
}

export enum FrameworkType {
  DotNet = 'DotNet',
  NodeJs = 'NodeJs',
  React = 'React',
  Angular = 'Angular',
  ConfigurationAPI = 'ConfigurationApi',
  ServicesAPI = 'ServicesApi'
}

export interface GeneratedCodeResponse {
  fileName: string;
  content: string;
  fileType: string;
}

export interface Framework {
  value: string;
  label: string;
}
