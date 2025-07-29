import React, { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';
import { codeGenerationService } from '../services/codeGenerationService';
import { Database, Table, CodeGenerationRequest, GeneratedCode, FrameworkType, GenerationType, ReactGenerationOptions, ReactGeneratedFiles, ConfigurationApiGenerationOptions } from '../types';
import ReactGenerationOptionsComponent from '../components/ReactGenerationOptions';
import ConfigurationApiGenerationOptionsComponent from '../components/ConfigurationApiGenerationOptions';

const HomePage: React.FC = () => {
  const [databases, setDatabases] = useState<Database[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<Database | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [generationTypes, setGenerationTypes] = useState<GenerationType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [frameworks, setFrameworks] = useState<Array<{ value: string; label: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode[]>([]);
  const [reactGeneratedFiles, setReactGeneratedFiles] = useState<ReactGeneratedFiles | null>(null);
  const [configurationApiGeneratedFiles, setConfigurationApiGeneratedFiles] = useState<GeneratedCode[] | null>(null);
  const [options, setOptions] = useState({
    Namespace: 'MyApp',
    UseDataAnnotations: true,
    GenerateController: true,
    GenerateService: true,
    GenerateRepository: true,
    GenerateInterface: true,
    FrameworkType: FrameworkType.DotNet,
    ReactOptions: {
      GenerateApi: true,
      GenerateInterfaces: true,
      GenerateComponents: true,
      GeneratePages: true,
      GenerateRedux: true,
      UseTypeScript: true,
      ComponentStyle: 'functional',
      StateManagement: 'redux',
      EnableBulkOperations: true,
      EnableExport: true,
      EnableAdvancedFiltering: true,
      UseDataTable: true,
      FormLayout: 'vertical',
      DefaultPageSize: 20
    } as ReactGenerationOptions,
    configurationApiOptions: {
      generateHandlers: true,
      generateEndpoints: true,
      generateRepository: true,
      generateModel: true,
      generateExceptions: true,
      generateStoredProcedures: true,
      generatePagination: true,
      outputStructure: 'vertical-slice' as const,
      useFluentValidation: true,
      useDapper: true
    } as ConfigurationApiGenerationOptions
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  // Reload generation types when framework changes
  useEffect(() => {
    const loadFrameworkSpecificTypes = async () => {
      try {
        const genTypes = await codeGenerationService.getGenerationTypes(options.FrameworkType);
        setGenerationTypes(genTypes);
        console.log('Loaded framework-specific generation types:', genTypes, 'for framework:', options.FrameworkType);
      } catch (error) {
        console.error('Error loading framework-specific generation types:', error);
      }
    };

    // Only reload if we have frameworks loaded (to avoid initial double-load)
    if (frameworks.length > 0) {
      loadFrameworkSpecificTypes();
    }
  }, [options.FrameworkType, frameworks.length]);

  const loadInitialData = async () => {
    try {
      const [dbList, genTypes, supportedFrameworks] = await Promise.all([
        databaseService.getDatabases(),
        codeGenerationService.getGenerationTypes(),
        codeGenerationService.getSupportedFrameworks()
      ]);
      
      setDatabases(dbList);
      setGenerationTypes(genTypes);
      setFrameworks(supportedFrameworks);
      
      // Debug logging
      console.log('Loaded generation types:', genTypes);
      console.log('Supported frameworks:', supportedFrameworks);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  // Handle framework selection with auto-checking of all generation types
  const handleFrameworkChange = async (newFramework: FrameworkType) => {
    // Update framework type
    setOptions(prev => ({ ...prev, FrameworkType: newFramework }));
    
    // Auto-select all checkboxes based on framework
    if (newFramework === FrameworkType.React) {
      // For React, check all React options
      setOptions(prev => ({
        ...prev,
        FrameworkType: newFramework,
        ReactOptions: {
          ...prev.ReactOptions!,
          GenerateApi: true,
          GenerateInterfaces: true,
          GenerateComponents: true,
          GeneratePages: true,
          GenerateRedux: true
        }
      }));
    } else if (newFramework === FrameworkType.ConfigurationAPI) {
      // For Configuration.API, check all Configuration.API options
      setOptions(prev => ({
        ...prev,
        FrameworkType: newFramework,
        configurationApiOptions: {
          ...prev.configurationApiOptions!,
          generateHandlers: true,
          generateEndpoints: true,
          generateRepository: true,
          generateModel: true,
          generateExceptions: true,
          generateStoredProcedures: true
        }
      }));
    } else if (newFramework === FrameworkType.ServicesAPI) {
      // For Services.API, we'll use the services-api-full generation type
      setSelectedTypes(['services-api-full']);
    } else {
      // For .NET and other frameworks, select all available generation types
      try {
        const genTypes = await codeGenerationService.getGenerationTypes(newFramework);
        const allTypeValues = genTypes.map(type => type.value);
        setSelectedTypes(allTypeValues);
      } catch (error) {
        console.error('Error loading generation types for auto-selection:', error);
      }
    }
  };

  // Filter generation types based on selected framework
  const getFilteredGenerationTypes = () => {
    if (options.FrameworkType === FrameworkType.React) {
      // For React, we don't use the standard generation types since we have custom UI
      return [];
    }
    
    if (options.FrameworkType === FrameworkType.ConfigurationAPI) {
      // For Configuration.API, we don't use the standard generation types since we have custom UI
      return [];
    }
    
    // For .NET, filter out React-specific and Configuration.API-specific types
    return generationTypes.filter(type => 
      !type.label.includes('React') && 
      !type.label.includes('TypeScript') &&
      !type.label.includes('Configuration.API') &&
      !type.value.includes('react') &&
      !type.value.includes('typescript') &&
      !type.value.includes('configuration-api')
    );
  };

  const handleDatabaseSelect = async (databaseName: string) => {
    try {
      setLoading(true);
      const database = await databaseService.getDatabaseTables(databaseName);
      setSelectedDatabase(database);
      setSelectedTable(null);
    } catch (error) {
      console.error('Error loading database tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = async (tableName: string, schema: string = 'dbo') => {
    if (!selectedDatabase) return;
    
    try {
      setLoading(true);
      const table = await databaseService.getTableColumns(selectedDatabase.name, tableName, schema);
      setSelectedTable(table);
    } catch (error) {
      console.error('Error loading table columns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!selectedDatabase || !selectedTable) {
      alert('Please select a database and table');
      return;
    }

    // Check if React generation
    if (options.FrameworkType === FrameworkType.React) {
      return handleGenerateReactCode();
    }

    // Check if Configuration.API generation
    if (options.FrameworkType === FrameworkType.ConfigurationAPI) {
      return handleGenerateConfigurationApiCode();
    }

    // Original .NET generation
    if (selectedTypes.length === 0) {
      alert('Please select at least one generation type');
      return;
    }

    const request: CodeGenerationRequest = {
      DatabaseName: selectedDatabase.name,
      TableName: selectedTable.name,
      Schema: selectedTable.schema,
      GenerationTypes: selectedTypes,
      Options: options
    };

    try {
      setLoading(true);
      const results = await codeGenerationService.generateCode(request);
      setGeneratedCode(results);
      setReactGeneratedFiles(null); // Clear React results
      setConfigurationApiGeneratedFiles(null); // Clear Configuration.API results
    } catch (error: any) {
      console.error('Error generating code:', error);
      alert('Error generating code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateConfigurationApiCode = async () => {
    if (!options.configurationApiOptions) {
      alert('Configuration.API options not configured');
      return;
    }

    const hasSelectedComponents = options.configurationApiOptions.generateHandlers || 
                                  options.configurationApiOptions.generateEndpoints || 
                                  options.configurationApiOptions.generateRepository || 
                                  options.configurationApiOptions.generateModel || 
                                  options.configurationApiOptions.generateExceptions || 
                                  options.configurationApiOptions.generateStoredProcedures;

    if (!hasSelectedComponents) {
      alert('Please select at least one Configuration.API component to generate');
      return;
    }

    // Map Configuration.API options to generation types
    const configurationApiTypes: string[] = [];
    if (options.configurationApiOptions.generateHandlers) configurationApiTypes.push('configuration-api-handlers');
    if (options.configurationApiOptions.generateEndpoints) configurationApiTypes.push('configuration-api-endpoints');
    if (options.configurationApiOptions.generateRepository) configurationApiTypes.push('configuration-api-repository');
    if (options.configurationApiOptions.generateModel) configurationApiTypes.push('configuration-api-model');
    if (options.configurationApiOptions.generateExceptions) configurationApiTypes.push('configuration-api-exceptions');
    if (options.configurationApiOptions.generateStoredProcedures) configurationApiTypes.push('configuration-api-storedprocs');

    // If all components are selected, use the full-stack generation type
    if (configurationApiTypes.length >= 5) {
      configurationApiTypes.length = 0;
      configurationApiTypes.push('configuration-api-full');
    }

    const request: CodeGenerationRequest = {
      DatabaseName: selectedDatabase!.name,
      TableName: selectedTable!.name,
      Schema: selectedTable!.schema,
      GenerationTypes: configurationApiTypes,
      Options: options
    };

    try {
      setLoading(true);
      const results = await codeGenerationService.generateCode(request);
      setConfigurationApiGeneratedFiles(results); // Set Configuration.API specific results
      setGeneratedCode([]); // Clear .NET results
      setReactGeneratedFiles(null); // Clear React results
    } catch (error: any) {
      console.error('Error generating Configuration.API code:', error);
      alert('Error generating Configuration.API code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReactCode = async () => {
    if (!options.ReactOptions) {
      alert('React options not configured');
      return;
    }

    const hasSelectedLayers = options.ReactOptions.GenerateApi || 
                              options.ReactOptions.GenerateComponents || 
                              options.ReactOptions.GenerateInterfaces || 
                              options.ReactOptions.GeneratePages || 
                              options.ReactOptions.GenerateRedux;

    if (!hasSelectedLayers) {
      alert('Please select at least one React layer to generate');
      return;
    }

    const request: CodeGenerationRequest = {
      DatabaseName: selectedDatabase!.name,
      TableName: selectedTable!.name,
      Schema: selectedTable!.schema,
      GenerationTypes: ['react-module'], // Special type for React generation
      Options: options
    };

    try {
      setLoading(true);
      const results = await codeGenerationService.generateReactModule(request);
      setReactGeneratedFiles(results);
      setGeneratedCode([]); // Clear .NET results
      setConfigurationApiGeneratedFiles(null); // Clear Configuration.API results
    } catch (error: any) {
      console.error('Error generating React code:', error);
      
      // Provide more detailed error information
      let errorMessage = 'Error generating React code. Please try again.';
      
      if (error.response) {
        // API returned an error response
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400 && data?.errors) {
          // Validation errors
          const validationErrors = Object.entries(data.errors)
            .map(([field, messages]: [string, any]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          errorMessage = `Validation Error:\n${validationErrors}`;
        } else if (status === 401) {
          errorMessage = 'Authentication required. Please log in.';
        } else if (status === 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        } else {
          errorMessage = `API Error (${status}): ${data?.message || data?.title || 'Unknown error'}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        // Other error
        errorMessage = `Error: ${error.message || 'Unknown error occurred'}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelection = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Code copied to clipboard!');
  };

  const downloadCode = (code: GeneratedCode) => {
    const blob = new Blob([code.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = code.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getConfigurationApiFileLabel = (fileName: string): string => {
    if (fileName.includes('Handler')) return 'Handler';
    if (fileName.includes('Endpoint')) return 'Endpoint';
    if (fileName.includes('Repository')) return 'Repository';
    if (fileName.includes('Exception')) return 'Exception';
    if (fileName.includes('.sql')) return 'Stored Procedures';
    if (fileName.includes('Model')) return 'Entity Model';
    return 'Generated File';
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Code Generator</h1>
        </div>
      </div>

      <div className="row">
        {/* Database & Table Selection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Select Database & Table</h5>
            </div>
            <div className="card-body">
              {/* Database Selection */}
              <div className="mb-3">
                <label className="form-label">Database:</label>
                <select 
                  className="form-select"
                  onChange={(e) => handleDatabaseSelect(e.target.value)}
                  value={selectedDatabase?.name || ''}
                >
                  <option value="">Select Database</option>
                  {databases.map(db => (
                    <option key={db.name} value={db.name}>
                      {db.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table Selection */}
              {selectedDatabase && (
                <div className="mb-3">
                  <label className="form-label">Table:</label>
                  <select 
                    className="form-select"
                    onChange={(e) => {
                      const [tableName, schema] = e.target.value.split('|');
                      handleTableSelect(tableName, schema);
                    }}
                    value={selectedTable ? `${selectedTable.name}|${selectedTable.schema}` : ''}
                  >
                    <option value="">Select Table</option>
                    {selectedDatabase.tables.map(table => (
                      <option key={`${table.schema}.${table.name}`} value={`${table.name}|${table.schema}`}>
                        {table.schema}.{table.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Table Columns Preview */}
              {selectedTable && (
                <div>
                  <h6>Columns ({selectedTable.columns.length}):</h6>
                  <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTable.columns.map(col => (
                          <tr key={col.name}>
                            <td>{col.name}</td>
                            <td>{col.dataType}{col.maxLength ? `(${col.maxLength})` : ''}</td>
                            <td>
                              {col.isPrimaryKey && <span className="badge bg-primary">PK</span>}
                              {col.isIdentity && <span className="badge bg-info">ID</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generation Options */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Generation Options</h5>
            </div>
            <div className="card-body">
              {/* Show React options when React framework is selected */}
              {options.FrameworkType === FrameworkType.React ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label">
                      🚀 <strong>React Architecture Layers:</strong>
                    </label>
                    <small className="d-block text-muted mb-2">
                      Generate code following your Company module patterns
                    </small>
                    
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="generateApi"
                        checked={options.ReactOptions?.GenerateApi || false}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          ReactOptions: { ...prev.ReactOptions!, GenerateApi: e.target.checked }
                        }))}
                      />
                      <label className="form-check-label" htmlFor="generateApi">
                        <strong>📡 Apis</strong> - RTK Query API slice
                        <br />
                        <small className="text-muted">src/Apis/[Entity]/[entity]Api.ts</small>
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="generateInterfaces"
                        checked={options.ReactOptions?.GenerateInterfaces || false}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          ReactOptions: { ...prev.ReactOptions!, GenerateInterfaces: e.target.checked }
                        }))}
                      />
                      <label className="form-check-label" htmlFor="generateInterfaces">
                        <strong>🏷️ Interfaces</strong> - TypeScript types
                        <br />
                        <small className="text-muted">src/Interfaces/Settings/[entity]Types.ts</small>
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="generateComponents"
                        checked={options.ReactOptions?.GenerateComponents || false}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          ReactOptions: { ...prev.ReactOptions!, GenerateComponents: e.target.checked }
                        }))}
                      />
                      <label className="form-check-label" htmlFor="generateComponents">
                        <strong>⚛️ Components</strong> - List + FormModal
                        <br />
                        <small className="text-muted">src/Components/Page/Settings/[Entity]/</small>
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="generatePages"
                        checked={options.ReactOptions?.GeneratePages || false}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          ReactOptions: { ...prev.ReactOptions!, GeneratePages: e.target.checked }
                        }))}
                      />
                      <label className="form-check-label" htmlFor="generatePages">
                        <strong>📄 Pages</strong> - Route wrappers
                        <br />
                        <small className="text-muted">src/Pages/Settings/[Entity]Page/[Entity].tsx</small>
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="generateRedux"
                        checked={options.ReactOptions?.GenerateRedux || false}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          ReactOptions: { ...prev.ReactOptions!, GenerateRedux: e.target.checked }
                        }))}
                      />
                      <label className="form-check-label" htmlFor="generateRedux">
                        <strong>🗃️ Redux</strong> - Redux Toolkit slices
                        <br />
                        <small className="text-muted">src/Storage/Redux/Settings/[Entity]/[entity]Slice.ts</small>
                      </label>
                    </div>

                    <hr />
                    <div className="d-flex gap-2">
                      <button 
                        type="button" 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setOptions(prev => ({
                          ...prev,
                          ReactOptions: {
                            ...prev.ReactOptions!,
                            GenerateApi: true,
                            GenerateInterfaces: true,
                            GenerateComponents: true,
                            GeneratePages: true,
                            GenerateRedux: true
                          }
                        }))}
                      >
                        ✅ Select All
                      </button>
                      
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setOptions(prev => ({
                          ...prev,
                          ReactOptions: {
                            ...prev.ReactOptions!,
                            GenerateApi: false,
                            GenerateInterfaces: false,
                            GenerateComponents: false,
                            GeneratePages: false,
                            GenerateRedux: false
                          }
                        }))}
                      >
                        ❌ Clear All
                      </button>
                    </div>
                  </div>
                </div>
              ) : options.FrameworkType !== FrameworkType.ConfigurationAPI ? (
                /* Show .NET generation types for .NET framework (but not for Configuration.API) */
                <div className="mb-3">
                  <label className="form-label">Code Types:</label>
                  {getFilteredGenerationTypes().map(type => (
                    <div key={type.value} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onChange={() => handleTypeSelection(type.value)}
                      />
                      <label className="form-check-label" htmlFor={type.value}>
                        <strong>{type.label}</strong>
                        <br />
                        <small className="text-muted">{type.description}</small>
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Namespace - Show for all frameworks */}
              <div className="mb-3">
                <label className="form-label">Namespace:</label>
                <input
                  type="text"
                  className="form-control"
                  value={options.Namespace}
                  onChange={(e) => setOptions(prev => ({ ...prev, Namespace: e.target.value }))}
                />
              </div>

              {/* Framework Type */}
              <div className="mb-3">
                <label className="form-label">Framework:</label>
                <select 
                  className="form-select"
                  value={options.FrameworkType}
                  onChange={(e) => handleFrameworkChange(e.target.value as FrameworkType)}
                >
                  {frameworks.map(fw => (
                    <option key={fw.value} value={fw.value}>
                      {fw.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <button 
                className="btn btn-success w-100"
                onClick={handleGenerateCode}
                disabled={loading || !selectedTable || (options.FrameworkType !== FrameworkType.React && options.FrameworkType !== FrameworkType.ConfigurationAPI && selectedTypes.length === 0)}
              >
                {loading ? 'Generating...' : 
                 options.FrameworkType === FrameworkType.React ? '🚀 Generate React Module' : 
                 options.FrameworkType === FrameworkType.ConfigurationAPI ? '🏗️ Generate Configuration.API Feature' : 
                 'Generate Code'}
              </button>
            </div>
          </div>
          
          {/* React Generation Options - Show when React is selected */}
          {options.FrameworkType === FrameworkType.React && options.ReactOptions && (
            <ReactGenerationOptionsComponent
              options={options.ReactOptions}
              onChange={(ReactOptions) => setOptions(prev => ({ ...prev, ReactOptions }))}
            />
          )}

          {/* Configuration.API Generation Options - Show when Configuration.API is selected */}
          {options.FrameworkType === FrameworkType.ConfigurationAPI && options.configurationApiOptions && (
            <ConfigurationApiGenerationOptionsComponent
              options={options.configurationApiOptions}
              onChange={(configurationApiOptions) => setOptions(prev => ({ ...prev, configurationApiOptions }))}
            />
          )}
        </div>

        {/* Generated Code Results */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Generated Code</h5>
            </div>
            <div className="card-body">
              {/* React Results */}
              {reactGeneratedFiles && (
                <div>
                  <h6 className="text-success">🚀 React Module Generated</h6>
                  <p className="text-muted">Following your architecture patterns:</p>
                  
                  {reactGeneratedFiles.apiFile && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>📡 API</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.apiFile.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.apiFile!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.apiFile!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {reactGeneratedFiles.interfaceFile && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>🏷️ Interface</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.interfaceFile.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.interfaceFile!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.interfaceFile!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {reactGeneratedFiles.listComponent && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>📋 List Component</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.listComponent.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.listComponent!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.listComponent!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {reactGeneratedFiles.formComponent && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>📝 Form Modal</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.formComponent.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.formComponent!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.formComponent!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {reactGeneratedFiles.pageComponent && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>📄 Page</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.pageComponent.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.pageComponent!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.pageComponent!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {reactGeneratedFiles.reduxSlice && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>🗃️ Redux Slice</strong>
                          <small className="d-block text-muted">{reactGeneratedFiles.reduxSlice.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(reactGeneratedFiles.reduxSlice!.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(reactGeneratedFiles.reduxSlice!)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr />
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => {
                      // Download all files as ZIP
                      alert('Download all functionality will be implemented next');
                    }}
                  >
                    📦 Download All Files
                  </button>
                </div>
              )}

              {/* Configuration.API Results */}
              {configurationApiGeneratedFiles && configurationApiGeneratedFiles.length > 0 && (
                <div>
                  <h6 className="text-success">🏗️ Configuration.API Feature Generated</h6>
                  <p className="text-muted">Following vertical slice architecture patterns:</p>
                  
                  {configurationApiGeneratedFiles.map((code, index) => (
                    <div key={index} className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>
                            {code.fileName.includes('Handler') ? '⚡' :
                             code.fileName.includes('Endpoint') ? '🌐' :
                             code.fileName.includes('Repository') ? '🗃️' :
                             code.fileName.includes('Exception') ? '⚠️' :
                             code.fileName.includes('.sql') ? '🗂️' :
                             code.fileName.includes('Model') ? '📊' : '📄'} {getConfigurationApiFileLabel(code.fileName)}
                          </strong>
                          <small className="d-block text-muted">{code.fileName}</small>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(code.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(code)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <hr />
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => {
                      // Download all Configuration.API files as ZIP
                      alert('Download all Configuration.API files functionality will be implemented next');
                    }}
                  >
                    📦 Download All Configuration.API Files
                  </button>
                </div>
              )}

              {/* .NET Results */}
              {generatedCode.length === 0 && !reactGeneratedFiles && !configurationApiGeneratedFiles ? (
                <p className="text-muted">No code generated yet. Select options and click "Generate Code".</p>
              ) : generatedCode.length > 0 ? (
                <div>
                  <p className="text-success">{generatedCode.length} file(s) generated!</p>
                  {generatedCode.map((code, index) => (
                    <div key={index} className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>{code.fileName}</strong>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => copyToClipboard(code.content)}
                          >
                            Copy
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadCode(code)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Code Preview Modal would go here */}
      {generatedCode.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Code Preview</h5>
              </div>
              <div className="card-body">
                {generatedCode.map((code, index) => (
                  <div key={index} className="mb-4">
                    <h6>{code.fileName}</h6>
                    <pre className="bg-light p-3" style={{ fontSize: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                      <code>{code.content}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
