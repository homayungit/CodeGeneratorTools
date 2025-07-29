import React, { useState } from 'react';

interface DatabaseConnectionProps {
  onConnectionTest?: (isValid: boolean) => void;
}

const DatabaseConnection: React.FC<DatabaseConnectionProps> = ({ onConnectionTest }) => {
  const [connectionString, setConnectionString] = useState(
    localStorage.getItem('targetConnectionString') || ''
  );
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleConnectionStringChange = (value: string) => {
    setConnectionString(value);
    localStorage.setItem('targetConnectionString', value);
  };

  const testConnection = async () => {
    if (!connectionString.trim()) {
      setConnectionStatus('error');
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      // TODO: Add API endpoint to test connection
      // For now, just simulate a test
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus('success');
      onConnectionTest?.(true);
    } catch (error) {
      setConnectionStatus('error');
      onConnectionTest?.(false);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Database Connection</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="connectionString" className="form-label">
            SQL Server Connection String
          </label>
          <textarea
            id="connectionString"
            className="form-control"
            rows={3}
            value={connectionString}
            onChange={(e) => handleConnectionStringChange(e.target.value)}
            placeholder="Server=your-server;Database=your-database;Trusted_Connection=true;"
          />
          <div className="form-text">
            Enter the connection string for the SQL Server database you want to generate code from.
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={testConnection}
            disabled={isTestingConnection || !connectionString.trim()}
          >
            {isTestingConnection ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Testing...
              </>
            ) : (
              'Test Connection'
            )}
          </button>

          {connectionStatus === 'success' && (
            <span className="text-success">
              <i className="bi bi-check-circle-fill me-1"></i>
              Connection successful
            </span>
          )}

          {connectionStatus === 'error' && (
            <span className="text-danger">
              <i className="bi bi-x-circle-fill me-1"></i>
              Connection failed
            </span>
          )}
        </div>

        {connectionString && (
          <div className="mt-3">
            <h6>Quick Examples:</h6>
            <div className="small">
              <div><strong>Windows Authentication:</strong></div>
              <code>Server=localhost;Database=MyDB;Trusted_Connection=true;</code>
              
              <div className="mt-2"><strong>SQL Server Authentication:</strong></div>
              <code>Server=localhost;Database=MyDB;User Id=sa;Password=mypassword;</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseConnection;
