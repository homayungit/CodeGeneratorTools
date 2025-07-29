import React from 'react';
import { ConfigurationApiGenerationOptions } from '../types';

interface ConfigurationApiGenerationOptionsProps {
  options: ConfigurationApiGenerationOptions;
  onChange: (options: ConfigurationApiGenerationOptions) => void;
}

const ConfigurationApiGenerationOptionsComponent: React.FC<ConfigurationApiGenerationOptionsProps> = ({ 
  options, 
  onChange 
}) => {
  const handleOptionChange = (key: keyof ConfigurationApiGenerationOptions, value: boolean | string) => {
    onChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration.API Generation Options</h3>
        <p className="text-sm text-gray-600 mb-6">
          Generate Configuration.API-style code with CQRS, Carter endpoints, Dapper repositories, and vertical slice architecture.
        </p>
      </div>

      {/* Core Components */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">Core Components</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateHandlers}
              onChange={(e) => handleOptionChange('generateHandlers', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>CQRS Handlers</strong> - Generate MediatR command/query handlers with validation
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateEndpoints}
              onChange={(e) => handleOptionChange('generateEndpoints', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Carter Endpoints</strong> - Generate minimal API endpoints with error handling
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateRepository}
              onChange={(e) => handleOptionChange('generateRepository', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Repository Pattern</strong> - Generate interface + Dapper implementation
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateModel}
              onChange={(e) => handleOptionChange('generateModel', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Entity Model</strong> - Generate entity with EF Core annotations
            </span>
          </label>
        </div>
      </div>

      {/* Additional Components */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">Additional Components</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateExceptions}
              onChange={(e) => handleOptionChange('generateExceptions', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Custom Exceptions</strong> - Generate NotFoundException classes
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generateStoredProcedures}
              onChange={(e) => handleOptionChange('generateStoredProcedures', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Stored Procedures</strong> - Generate complete CRUD stored procedures
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.generatePagination}
              onChange={(e) => handleOptionChange('generatePagination', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Pagination Support</strong> - Include GetAllWithPagination handlers
            </span>
          </label>
        </div>
      </div>

      {/* Architecture Options */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">Architecture Options</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Structure
            </label>
            <select 
              value={options.outputStructure}
              onChange={(e) => handleOptionChange('outputStructure', e.target.value as 'vertical-slice' | 'layered')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="vertical-slice">Vertical Slice Architecture</option>
              <option value="layered">Traditional Layered Architecture</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Vertical slice organizes code by feature, layered by technical concerns
            </p>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.useFluentValidation}
              onChange={(e) => handleOptionChange('useFluentValidation', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>FluentValidation</strong> - Include command validators
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.useDapper}
              onChange={(e) => handleOptionChange('useDapper', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              <strong>Dapper ORM</strong> - Use Dapper for data access instead of EF Core
            </span>
          </label>
        </div>
      </div>

      {/* Generation Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-800 mb-2">Generation Summary</h4>
        <p className="text-sm text-gray-600">
          This will generate a complete feature following Configuration.API patterns:
        </p>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• <strong>CommonSettings/[Entity]/</strong> - Feature folders with CQRS operations</li>
          <li>• <strong>Models/[Entity].cs</strong> - Entity model with annotations</li>
          <li>• <strong>Infrastructure/Repositories/</strong> - Repository interface + implementation</li>
          <li>• <strong>Exceptions/[Entity]NotFoundException.cs</strong> - Custom exceptions</li>
          <li>• <strong>Scripts/[Entity]CRUDStoredProcedures.sql</strong> - Database procedures</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigurationApiGenerationOptionsComponent;
