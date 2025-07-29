import api from './api';
import { CodeGenerationRequest, GeneratedCode, GenerationType, ReactGeneratedFiles } from '../types';

export const codeGenerationService = {
  async generateCode(request: CodeGenerationRequest): Promise<GeneratedCode[]> {
    const response = await api.post('/codegenerator/generate', request);
    return response.data;
  },

  // React-specific generation using real backend API endpoints
  async generateReactModule(request: CodeGenerationRequest): Promise<ReactGeneratedFiles> {
    try {
      console.log('Sending React generation request:', JSON.stringify(request, null, 2));
      const response = await api.post('/codegenerator/generate-react-module', request);
      console.log('React generation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error generating React module:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
      throw error;
    }
  },

  // Generate individual React layers
  async generateReactApi(request: CodeGenerationRequest): Promise<GeneratedCode> {
    try {
      const response = await api.post('/codegenerator/generate-react-api', request);
      return response.data;
    } catch (error) {
      console.error('Error generating React API:', error);
      throw error;
    }
  },

  async generateReactInterface(request: CodeGenerationRequest): Promise<GeneratedCode> {
    try {
      const response = await api.post('/codegenerator/generate-react-interface', request);
      return response.data;
    } catch (error) {
      console.error('Error generating React interface:', error);
      throw error;
    }
  },

  async generateReactComponents(request: CodeGenerationRequest): Promise<GeneratedCode[]> {
    try {
      const response = await api.post('/codegenerator/generate-react-components', request);
      return response.data;
    } catch (error) {
      console.error('Error generating React components:', error);
      throw error;
    }
  },

  async generateReactPage(request: CodeGenerationRequest): Promise<GeneratedCode> {
    try {
      const response = await api.post('/codegenerator/generate-react-page', request);
      return response.data;
    } catch (error) {
      console.error('Error generating React page:', error);
      throw error;
    }
  },

  async generateReactRedux(request: CodeGenerationRequest): Promise<GeneratedCode> {
    try {
      const response = await api.post('/codegenerator/generate-react-redux', request);
      return response.data;
    } catch (error) {
      console.error('Error generating React Redux slice:', error);
      throw error;
    }
  },

  async getGenerationTypes(framework?: string): Promise<GenerationType[]> {
    const url = framework ? `/codegenerator/generation-types?framework=${framework}` : '/codegenerator/generation-types';
    const response = await api.get(url);
    return response.data;
  },

  async getSupportedFrameworks(): Promise<Array<{ value: string; label: string }>> {
    const response = await api.get('/codegenerator/frameworks');
    return response.data;
  }
};
