/**
 * ReactGenerationOptions Component
 * Options panel for React code generation following your architecture patterns
 */
import React from 'react';
import { ReactGenerationOptions } from '../types';

interface ReactGenerationOptionsProps {
  options: ReactGenerationOptions;
  onChange: (options: ReactGenerationOptions) => void;
}

const ReactGenerationOptionsComponent: React.FC<ReactGenerationOptionsProps> = ({
  options,
  onChange
}) => {
  const handleOptionChange = (key: keyof ReactGenerationOptions, value: any) => {
    onChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5 className="mb-0">🚀 React Code Generation - Following Your Architecture Plan</h5>
        <small className="text-muted">Generate code matching your Company module patterns</small>
      </div>
      <div className="card-body">
        {/* Generation Layers */}
        <div className="row">
          <div className="col-md-6">
            <h6>📁 Architecture Layers</h6>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="generateApi"
                checked={options.GenerateApi}
                onChange={(e) => handleOptionChange('GenerateApi', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="generateApi">
                <strong>Apis</strong> - RTK Query API slice
              </label>
              <small className="d-block text-muted">src/Apis/[Entity]/[entity]Api.ts</small>
            </div>

            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="generateInterfaces"
                checked={options.GenerateInterfaces}
                onChange={(e) => handleOptionChange('GenerateInterfaces', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="generateInterfaces">
                <strong>Interfaces</strong> - TypeScript types
              </label>
              <small className="d-block text-muted">src/Interfaces/Settings/[entity]Types.ts</small>
            </div>

            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="generateComponents"
                checked={options.GenerateComponents}
                onChange={(e) => handleOptionChange('GenerateComponents', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="generateComponents">
                <strong>Components</strong> - List + FormModal
              </label>
              <small className="d-block text-muted">src/Components/Page/Settings/[Entity]/</small>
            </div>
          </div>

          <div className="col-md-6">
            <h6>📄 Additional Layers</h6>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="generatePages"
                checked={options.GeneratePages}
                onChange={(e) => handleOptionChange('GeneratePages', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="generatePages">
                <strong>Pages</strong> - Route wrappers
              </label>
              <small className="d-block text-muted">src/Pages/Settings/[Entity]Page/[Entity].tsx</small>
            </div>

            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="generateRedux"
                checked={options.GenerateRedux}
                onChange={(e) => handleOptionChange('GenerateRedux', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="generateRedux">
                <strong>Redux</strong> - Redux Toolkit slices
              </label>
              <small className="d-block text-muted">src/Storage/Redux/Settings/[Entity]/[entity]Slice.ts</small>
            </div>

            <div className="mt-2">
              <label htmlFor="componentStyle" className="form-label">
                <strong>Component Style</strong>
              </label>
              <select 
                className="form-select" 
                id="componentStyle"
                value={options.ComponentStyle}
                onChange={(e) => handleOptionChange('ComponentStyle', e.target.value)}
              >
                <option value="functional">Functional Components</option>
                <option value="class">Class Components</option>
              </select>
              <small className="text-muted">Determines component architecture</small>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h6>🛠 Advanced Features</h6>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="enableBulkOperations"
                checked={options.EnableBulkOperations}
                onChange={(e) => handleOptionChange('EnableBulkOperations', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="enableBulkOperations">
                Bulk Operations
              </label>
            </div>

            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="enableExport"
                checked={options.EnableExport}
                onChange={(e) => handleOptionChange('EnableExport', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="enableExport">
                Export Functionality
              </label>
            </div>

            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="enableAdvancedFiltering"
                checked={options.EnableAdvancedFiltering}
                onChange={(e) => handleOptionChange('EnableAdvancedFiltering', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="enableAdvancedFiltering">
                Advanced Filtering
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="formLayout" className="form-label">
              <strong>Form Layout</strong>
            </label>
            <select 
              className="form-select" 
              id="formLayout"
              value={options.FormLayout}
              onChange={(e) => handleOptionChange('FormLayout', e.target.value)}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
            <small className="text-muted d-block">Form field arrangement</small>

            <label htmlFor="defaultPageSize" className="form-label mt-2">
              <strong>Default Page Size</strong>
            </label>
            <input 
              type="number" 
              className="form-control" 
              id="defaultPageSize"
              value={options.DefaultPageSize}
              onChange={(e) => handleOptionChange('DefaultPageSize', parseInt(e.target.value) || 20)}
              min="10"
              max="100"
            />
            <small className="text-muted">Items per page in tables</small>
          </div>
        </div>

        {/* Quick Actions */}
        <hr />
        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-outline-primary btn-sm"
            onClick={() => onChange({
              ...options,
              GenerateApi: true,
              GenerateInterfaces: true,
              GenerateComponents: true,
              GeneratePages: true,
              GenerateRedux: true
            })}
          >
            ✅ Select All Layers
          </button>
          
          <button 
            type="button" 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onChange({
              ...options,
              GenerateApi: false,
              GenerateInterfaces: false,
              GenerateComponents: false,
              GeneratePages: false,
              GenerateRedux: false
            })}
          >
            ❌ Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactGenerationOptionsComponent;
