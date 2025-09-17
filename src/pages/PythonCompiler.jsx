import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Database, Code, Search, Users, Shield, Zap, BookOpen, CheckCircle, Copy, Play } from 'lucide-react';

const SQLGuide = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState(new Set(['introduction']));
  const [copiedCode, setCopiedCode] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  //     const progress = (window.scrollY / totalHeight) * 100;
  //     setScrollProgress(progress);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const CodeBlock = ({ code, language = 'sql' }) => (
    <div className="relative bg-gray-900 rounded-lg p-4 my-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-blue-400 uppercase tracking-wide">{language}</span>
        <button
          onClick={() => copyToClipboard(code)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          <Copy size={12} />
          {copiedCode === code ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction to SQL',
      icon: <BookOpen className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">What is SQL?</h3>
            <p className="mb-4">SQL (Structured Query Language) is the standard language for interacting with relational database management systems (RDBMS). It allows you to create, read, update, and delete data in databases.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded">
                <h4 className="font-semibold">🎯 Declarative Language</h4>
                <p className="text-sm">Specify what you want, not how to get it</p>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <h4 className="font-semibold">🌐 Standardized</h4>
                <p className="text-sm">Works across different database systems</p>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <h4 className="font-semibold">💪 Powerful</h4>
                <p className="text-sm">Handles complex data operations and queries</p>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <h4 className="font-semibold">📈 Scalable</h4>
                <p className="text-sm">Manages small to enterprise-level databases</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Basic SQL Structure</h4>
            <CodeBlock code={`-- Basic structure of SQL statement
SELECT column1, column2
FROM table_name
WHERE condition;`} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { category: 'DDL', purpose: 'Define database structure', commands: 'CREATE, ALTER, DROP, TRUNCATE', color: 'bg-red-100 text-red-800' },
              { category: 'DML', purpose: 'Manipulate data', commands: 'INSERT, UPDATE, DELETE', color: 'bg-blue-100 text-blue-800' },
              { category: 'DQL', purpose: 'Query data', commands: 'SELECT', color: 'bg-green-100 text-green-800' },
              { category: 'DCL', purpose: 'Control access', commands: 'GRANT, REVOKE', color: 'bg-yellow-100 text-yellow-800' },
              { category: 'TCL', purpose: 'Control transactions', commands: 'COMMIT, ROLLBACK, SAVEPOINT', color: 'bg-purple-100 text-purple-800' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md border">
                <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${item.color}`}>
                  {item.category}
                </div>
                <h5 className="font-semibold text-gray-800">{item.purpose}</h5>
                <p className="text-sm text-gray-600 mt-1">{item.commands}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'ddl',
      title: 'Data Definition Language (DDL)',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">DDL Commands</h3>
            <p>Define and manage the structure of database objects like tables, databases, and indexes.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">CREATE</span>
                Creating Objects
              </h4>
              <p className="text-gray-600 mb-4">Creates new database objects like tables, databases, indexes.</p>
              
              <h5 className="font-semibold mb-2">Creating a Database:</h5>
              <CodeBlock code={`CREATE DATABASE company_db;`} />

              <h5 className="font-semibold mb-2">Creating a Table:</h5>
              <CodeBlock code={`CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(dept_id)
);`} />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-blue-800 mb-2">💡 Real-world Example - E-commerce Product Table:</h6>
                <CodeBlock code={`CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);`} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">ALTER</span>
                Modifying Structure
              </h4>
              <p className="text-gray-600 mb-4">Modifies existing table structure.</p>
              
              <h5 className="font-semibold mb-2">Adding a Column:</h5>
              <CodeBlock code={`ALTER TABLE employees
ADD COLUMN phone_number VARCHAR(15);`} />

              <h5 className="font-semibold mb-2">Modifying Column Data Type:</h5>
              <CodeBlock code={`ALTER TABLE employees
MODIFY COLUMN salary DECIMAL(12,2);`} />

              <h5 className="font-semibold mb-2">Dropping a Column:</h5>
              <CodeBlock code={`ALTER TABLE employees
DROP COLUMN phone_number;`} />

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-green-800 mb-2">🔧 Real-world Example - Adding Audit Columns:</h6>
                <CodeBlock code={`-- Adding audit columns to track changes
ALTER TABLE products
ADD COLUMN last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
ADD COLUMN updated_by VARCHAR(50);`} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">DROP vs TRUNCATE vs DELETE</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2">Command</th>
                    <th className="text-left p-2">Purpose</th>
                    <th className="text-left p-2">Rollback</th>
                    <th className="text-left p-2">Speed</th>
                    <th className="text-left p-2">Structure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-semibold text-red-600">DELETE</td>
                    <td className="p-2">Remove specific rows</td>
                    <td className="p-2 text-green-600">Yes</td>
                    <td className="p-2 text-yellow-600">Slower</td>
                    <td className="p-2 text-green-600">Preserved</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-semibold text-orange-600">TRUNCATE</td>
                    <td className="p-2">Remove all rows</td>
                    <td className="p-2 text-red-600">No</td>
                    <td className="p-2 text-green-600">Faster</td>
                    <td className="p-2 text-green-600">Preserved</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-red-800">DROP</td>
                    <td className="p-2">Remove entire table</td>
                    <td className="p-2 text-red-600">No</td>
                    <td className="p-2 text-green-600">Fastest</td>
                    <td className="p-2 text-red-600">Destroyed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded">
                <h6 className="font-semibold text-red-600 mb-1">DROP Example</h6>
                <CodeBlock code={`DROP TABLE IF EXISTS temp_employees;`} />
              </div>
              <div className="bg-white p-3 rounded">
                <h6 className="font-semibold text-orange-600 mb-1">TRUNCATE Example</h6>
                <CodeBlock code={`TRUNCATE TABLE audit_logs;`} />
              </div>
              <div className="bg-white p-3 rounded">
                <h6 className="font-semibold text-blue-600 mb-1">Database Drop</h6>
                <CodeBlock code={`DROP DATABASE test_db;`} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dml',
      title: 'Data Manipulation Language (DML)',
      icon: <Code className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">DML Commands</h3>
            <p>Manipulate data within tables - the core CRUD operations for your database.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">INSERT</span>
                Adding New Records
              </h4>
              
              <h5 className="font-semibold mb-2">Single Row Insert:</h5>
              <CodeBlock code={`INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id)
VALUES ('John', 'Doe', 'john.doe@company.com', '2024-01-15', 75000.00, 1);`} />

              <h5 className="font-semibold mb-2">Multiple Row Insert:</h5>
              <CodeBlock code={`INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id)
VALUES
    ('Jane', 'Smith', 'jane.smith@company.com', '2024-02-01', 80000.00, 2),
    ('Mike', 'Johnson', 'mike.johnson@company.com', '2024-02-15', 70000.00, 1),
    ('Sarah', 'Wilson', 'sarah.wilson@company.com', '2024-03-01', 85000.00, 3);`} />

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-green-800 mb-2">💡 Insert from Another Table:</h6>
                <CodeBlock code={`INSERT INTO employees_backup (employee_id, first_name, last_name, email)
SELECT employee_id, first_name, last_name, email
FROM employees
WHERE department_id = 1;`} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">UPDATE</span>
                Modifying Records
              </h4>
              
              <h5 className="font-semibold mb-2">Single Column Update:</h5>
              <CodeBlock code={`UPDATE employees
SET salary = 82000.00
WHERE employee_id = 1;`} />

              <h5 className="font-semibold mb-2">Multiple Column Update:</h5>
              <CodeBlock code={`UPDATE employees
SET salary = salary * 1.10,
    last_updated = CURRENT_TIMESTAMP
WHERE department_id = 2;`} />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-blue-800 mb-2">🔄 Conditional Update with JOIN:</h6>
                <CodeBlock code={`UPDATE employees e
JOIN departments d ON e.department_id = d.dept_id
SET e.salary = e.salary * 1.15
WHERE d.dept_name = 'Engineering';`} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">DELETE</span>
              Removing Records
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Delete Specific Records:</h5>
                <CodeBlock code={`DELETE FROM employees
WHERE hire_date < '2020-01-01';`} />
              </div>
              <div>
                <h5 className="font-semibold mb-2">Delete with Subquery:</h5>
                <CodeBlock code={`DELETE FROM employees
WHERE department_id IN (
    SELECT dept_id
    FROM departments
    WHERE dept_name = 'Temporary'
);`} />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-600">⚠️</span>
                <h6 className="font-semibold text-red-800">Safety Tips for DELETE Operations</h6>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Always use WHERE clause to avoid deleting all records</li>
                <li>• Test your WHERE condition with SELECT first</li>
                <li>• Consider using transactions for rollback capability</li>
                <li>• Backup important data before mass deletions</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dql',
      title: 'Data Query Language (DQL)',
      icon: <Search className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">Data Query Language (DQL)</h3>
            <p>The heart of SQL - retrieving and analyzing data from your database with powerful SELECT statements.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4">Basic SELECT Operations</h4>
              
              <h5 className="font-semibold mb-2">Simple Select:</h5>
              <CodeBlock code={`SELECT first_name, last_name, salary
FROM employees;`} />

              <h5 className="font-semibold mb-2">Select All Columns:</h5>
              <CodeBlock code={`SELECT * FROM employees;`} />

              <h5 className="font-semibold mb-2">Select with Alias:</h5>
              <CodeBlock code={`SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    salary * 12 AS "Annual Salary"
FROM employees;`} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4">WHERE Clause Filtering</h4>
              
              <h5 className="font-semibold mb-2">Basic Conditions:</h5>
              <CodeBlock code={`SELECT * FROM employees
WHERE salary > 70000;

SELECT * FROM employees
WHERE department_id = 1 AND salary BETWEEN 60000 AND 80000;

SELECT * FROM employees
WHERE first_name IN ('John', 'Jane', 'Mike');`} />

              <div className="bg-green-50 p-3 rounded-lg mt-4">
                <h6 className="font-semibold text-green-800 mb-1">🎯 Pattern Matching:</h6>
                <CodeBlock code={`-- Names starting with 'J'
SELECT * FROM employees WHERE first_name LIKE 'J%';

-- Emails containing 'gmail'
SELECT * FROM employees WHERE email LIKE '%gmail%';`} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4">Advanced Querying Techniques</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">ORDER BY</span>
                  Sorting Results
                </h5>
                <CodeBlock code={`-- Ascending order (default)
SELECT * FROM employees ORDER BY salary;

-- Descending order
SELECT * FROM employees ORDER BY hire_date DESC;

-- Multiple columns
SELECT * FROM employees 
ORDER BY department_id ASC, salary DESC;`} />
              </div>

              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">GROUP BY</span>
                  Aggregating Data
                </h5>
                <CodeBlock code={`SELECT 
    department_id, 
    COUNT(*) as employee_count, 
    AVG(salary) as avg_salary
FROM employees
GROUP BY department_id;

-- With HAVING clause
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 75000;`} />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-4">
              <h6 className="font-semibold text-gray-800 mb-2">📊 Real-world Example - Sales Report:</h6>
              <CodeBlock code={`SELECT
    YEAR(order_date) as sales_year,
    MONTH(order_date) as sales_month,
    COUNT(*) as total_orders,
    SUM(order_amount) as total_revenue,
    AVG(order_amount) as avg_order_value
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY YEAR(order_date), MONTH(order_date)
HAVING SUM(order_amount) > 100000
ORDER BY sales_year DESC, sales_month DESC;`} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4">LIMIT and Pagination</h4>
              <CodeBlock code={`-- Top 5 highest paid employees
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Skip first 10 records, then get next 5
SELECT * FROM employees
ORDER BY employee_id
LIMIT 5 OFFSET 10;`} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4">DISTINCT - Remove Duplicates</h4>
              <CodeBlock code={`SELECT DISTINCT department_id FROM employees;

SELECT DISTINCT first_name, last_name FROM employees;`} />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'joins',
      title: 'SQL Joins',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">SQL Joins</h3>
            <p>Combine data from multiple tables based on relationships - the key to relational database power.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">Sample Tables for Examples</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold mb-2">👥 Employees Table</h5>
                <div className="text-sm">
                  <div className="grid grid-cols-4 gap-2 font-bold border-b pb-2">
                    <span>ID</span><span>Name</span><span>Dept</span><span>Salary</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-1">
                    <span>1</span><span>John Doe</span><span>1</span><span>75000</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-1">
                    <span>2</span><span>Jane Smith</span><span>2</span><span>80000</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-1">
                    <span>5</span><span>Bob Brown</span><span>NULL</span><span>65000</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold mb-2">🏢 Departments Table</h5>
                <div className="text-sm">
                  <div className="grid grid-cols-3 gap-2 font-bold border-b pb-2">
                    <span>ID</span><span>Name</span><span>Location</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>1</span><span>Engineering</span><span>NY</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>2</span><span>Marketing</span><span>LA</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1">
                    <span>4</span><span>HR</span><span>Boston</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">INNER JOIN</span>
                Matching Records Only
              </h4>
              <p className="text-gray-600 mb-4">Returns only records that have matches in both tables.</p>
              <CodeBlock code={`SELECT e.name, e.salary, d.dept_name, d.location
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;`} />
              <div className="bg-blue-50 p-3 rounded mt-3">
                <span className="text-xs text-blue-600 font-bold">RESULT:</span>
                <div className="text-sm mt-1">John Doe, Jane Smith, Mike Johnson, Sarah Wilson (4 rows)</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">LEFT JOIN</span>
                All Left + Matching Right
              </h4>
              <p className="text-gray-600 mb-4">Returns all records from left table and matching from right.</p>
              <CodeBlock code={`SELECT e.name, e.salary, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;`} />
              <div className="bg-green-50 p-3 rounded mt-3">
                <span className="text-xs text-green-600 font-bold">RESULT:</span>
                <div className="text-sm mt-1">Includes Bob Brown with NULL dept_name (5 rows)</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">RIGHT JOIN</span>
                All Right + Matching Left
              </h4>
              <p className="text-gray-600 mb-4">Returns all records from right table and matching from left.</p>
              <CodeBlock code={`SELECT e.name, d.dept_name, d.location
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;`} />
              <div className="bg-orange-50 p-3 rounded mt-3">
                <span className="text-xs text-orange-600 font-bold">RESULT:</span>
                <div className="text-sm mt-1">Includes HR department with NULL employee name (4 rows)</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">SELF JOIN</span>
                Table Joins Itself
              </h4>
              <p className="text-gray-600 mb-4">Joins a table with itself to find relationships within the same table.</p>
              <CodeBlock code={`-- Find employees with same salary
SELECT e1.name AS employee1, e2.name AS employee2, e1.salary
FROM employees e1
JOIN employees e2 ON e1.salary = e2.salary AND e1.emp_id < e2.emp_id;`} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4">Advanced Join Techniques</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2 text-red-600">FULL OUTER JOIN</h5>
                <CodeBlock code={`SELECT e.name, d.dept_name, d.location
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;`} />
                <p className="text-sm text-gray-600">Returns all records from both tables</p>
              </div>

              <div>
                <h5 className="font-semibold mb-2 text-yellow-600">CROSS JOIN</h5>
                <CodeBlock code={`SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;`} />
                <p className="text-sm text-gray-600">Returns Cartesian product of both tables</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-4">
              <h6 className="font-semibold text-gray-800 mb-2">🔗 Multiple Table Joins Example:</h6>
              <CodeBlock code={`SELECT
    e.name,
    d.dept_name,
    p.project_name,
    p.budget
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
JOIN employee_projects ep ON e.emp_id = ep.emp_id
JOIN projects p ON ep.project_id = p.project_id
WHERE p.budget > 100000;`} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">📋 Join Types Quick Reference</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">I</div>
                <h6 className="font-semibold text-blue-600">INNER</h6>
                <p className="text-xs text-gray-600">Only matches</p>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">L</div>
                <h6 className="font-semibold text-green-600">LEFT</h6>
                <p className="text-xs text-gray-600">All left + matches</p>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">R</div>
                <h6 className="font-semibold text-orange-600">RIGHT</h6>
                <p className="text-xs text-gray-600">All right + matches</p>
              </div>
              <div className="bg-white p-3 rounded text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">F</div>
                <h6 className="font-semibold text-red-600">FULL</h6>
                <p className="text-xs text-gray-600">All records</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'functions',
      title: 'SQL Functions',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">SQL Functions</h3>
            <p>Built-in functions for data manipulation, calculations, and transformations.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">📊</span>
                Aggregate Functions
              </h4>
              <p className="text-gray-600 mb-4">Perform calculations on groups of rows.</p>
              
              <CodeBlock code={`SELECT
    COUNT(*) AS total_employees,
    COUNT(dept_id) AS employees_with_dept,
    SUM(salary) AS total_salary,
    AVG(salary) AS average_salary,
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary,
    STDDEV(salary) AS salary_std_deviation
FROM employees;`} />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-blue-800 mb-2">📈 Aggregate with GROUP BY:</h6>
                <CodeBlock code={`SELECT
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    SUM(e.salary) AS total_dept_salary
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY avg_salary DESC;`} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">📝</span>
                String Functions
              </h4>
              <p className="text-gray-600 mb-4">Manipulate and format text data.</p>
              
              <CodeBlock code={`SELECT
    UPPER(first_name) AS uppercase_name,
    LOWER(last_name) AS lowercase_surname,
    CONCAT(first_name, ' ', last_name) AS full_name,
    LENGTH(first_name) AS name_length,
    SUBSTRING(email, 1, LOCATE('@', email) - 1) AS username,
    TRIM(' ' FROM ' John Doe ') AS trimmed_name,
    REPLACE(phone, '-', '') AS clean_phone,
    LEFT(first_name, 3) AS first_3_chars,
    RIGHT(last_name, 3) AS last_3_chars
FROM employees;`} />

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-green-800 mb-2">🔍 Advanced String Operations:</h6>
                <CodeBlock code={`-- Extract domain from email
SELECT
    email,
    SUBSTRING(email, LOCATE('@', email) + 1) AS email_domain
FROM employees;`} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">📅</span>
                Date and Time Functions
              </h4>
              
              <CodeBlock code={`SELECT
    CURRENT_DATE() AS today,
    CURRENT_TIME() AS current_time,
    NOW() AS current_datetime,
    YEAR(hire_date) AS hire_year,
    MONTH(hire_date) AS hire_month,
    DAY(hire_date) AS hire_day,
    DAYNAME(hire_date) AS hire_day_name,
    DATEDIFF(CURRENT_DATE, hire_date) AS days_employed,
    DATE_ADD(hire_date, INTERVAL 1 YEAR) AS first_anniversary,
    DATE_FORMAT(hire_date, '%M %d, %Y') AS formatted_hire_date
FROM employees;`} />

              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-purple-800 mb-2">🎂 Age Calculation:</h6>
                <CodeBlock code={`SELECT
    name,
    birth_date,
    FLOOR(DATEDIFF(CURRENT_DATE, birth_date) / 365.25) AS age_years
FROM employees;`} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">🧮</span>
                Mathematical Functions
              </h4>
              
              <CodeBlock code={`SELECT
    salary,
    ROUND(salary * 1.05, 2) AS salary_with_raise,
    CEIL(salary / 12) AS monthly_salary_ceiling,
    FLOOR(salary / 12) AS monthly_salary_floor,
    ABS(salary - 75000) AS salary_difference,
    POWER(salary / 1000, 2) AS salary_squared,
    SQRT(salary) AS salary_sqrt,
    MOD(emp_id, 2) AS even_odd_indicator
FROM employees;`} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="bg-indigo-500 text-white px-2 py-1 rounded text-sm">🔄</span>
              Conditional Functions
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2">CASE Statement:</h5>
                <CodeBlock code={`SELECT
    name,
    salary,
    CASE
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 70000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category,
    CASE dept_id
        WHEN 1 THEN 'Engineering'
        WHEN 2 THEN 'Marketing'
        WHEN 3 THEN 'Sales'
        ELSE 'Other'
    END AS department_name
FROM employees;`} />
              </div>

              <div>
                <h5 className="font-semibold mb-2">IF Function & COALESCE:</h5>
                <CodeBlock code={`SELECT
    name,
    salary,
    IF(salary > 75000, 'Above Average', 'Below Average') AS salary_status,
    COALESCE(phone, 'No phone provided') AS contact_phone,
    COALESCE(dept_id, 0) AS department_id
FROM employees;`} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-3">Advanced SQL Features</h3>
            <p>Master complex SQL concepts including subqueries, views, stored procedures, and performance optimization.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">🔍</span>
                Subqueries
              </h4>
              <p className="text-gray-600 mb-4">Queries nested within other queries for complex data retrieval.</p>
              
              <h5 className="font-semibold mb-2">Single-row Subquery:</h5>
              <CodeBlock code={`-- Find employee with highest salary
SELECT name, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);`} />

              <h5 className="font-semibold mb-2">Correlated Subquery:</h5>
              <CodeBlock code={`-- Find employees earning above their department average
SELECT e1.name, e1.salary, e1.dept_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.dept_id = e1.dept_id
);`} />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-blue-800 mb-2">EXISTS Example:</h6>
                <CodeBlock code={`-- Find departments with at least one employee
SELECT dept_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.dept_id = d.dept_id
);`} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">👁️</span>
                Views
              </h4>
              <p className="text-gray-600 mb-4">Virtual tables based on queries for simplified data access.</p>
              
              <h5 className="font-semibold mb-2">Creating a View:</h5>
              <CodeBlock code={`CREATE VIEW employee_summary AS
SELECT
    e.name,
    e.salary,
    d.dept_name,
    d.location,
    CASE
        WHEN e.salary >= 80000 THEN 'Senior'
        WHEN e.salary >= 70000 THEN 'Mid-level'
        ELSE 'Junior'
    END AS level
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;`} />

              <h5 className="font-semibold mb-2">Using the View:</h5>
              <CodeBlock code={`SELECT * FROM employee_summary WHERE level = 'Senior';`} />

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h6 className="font-semibold text-green-800 mb-2">💡 Benefits of Views:</h6>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Simplify complex queries</li>
                  <li>• Enhance security by limiting data access</li>
                  <li>• Provide consistent interface to data</li>
                  <li>• Hide implementation details</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">📊</span>
                Window Functions
              </h4>
              <p className="text-gray-600 mb-4">Perform calculations across related rows without grouping.</p>
              
              <h5 className="font-semibold mb-2">ROW_NUMBER & RANK:</h5>
              <CodeBlock code={`SELECT
    name,
    dept_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank,
    RANK() OVER (ORDER BY salary DESC) AS salary_rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_dense_rank
FROM employees;`} />

              <h5 className="font-semibold mb-2">Running Totals:</h5>
              <CodeBlock code={`SELECT
    name,
    salary,
    SUM(salary) OVER (ORDER BY salary DESC ROWS UNBOUNDED PRECEDING) AS running_total
FROM employees;`} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">🔒</span>
                Transactions & ACID
              </h4>
              <p className="text-gray-600 mb-4">Ensure data integrity with transaction control.</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-red-50 p-2 rounded text-center">
                  <div className="font-bold text-red-600">A</div>
                  <div className="text-xs">Atomicity</div>
                </div>
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="font-bold text-blue-600">C</div>
                  <div className="text-xs">Consistency</div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="font-bold text-green-600">I</div>
                  <div className="text-xs">Isolation</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded text-center">
                  <div className="font-bold text-yellow-600">D</div>
                  <div className="text-xs">Durability</div>
                </div>
              </div>

              <CodeBlock code={`START TRANSACTION;
UPDATE accounts SET balance = balance - 1000 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE account_id = 2;

-- Check if both updates succeeded
IF @@ERROR = 0
    COMMIT;
ELSE
    ROLLBACK;`} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h4 className="font-bold text-lg mb-4">Performance Optimization</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2 text-orange-600">Indexing Strategy:</h5>
                <CodeBlock code={`-- Single column index
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- Composite index
CREATE INDEX idx_employee_dept_salary ON employees(dept_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);`} />
                
                <div className="bg-orange-50 p-3 rounded-lg mt-2">
                  <h6 className="font-semibold text-orange-800 text-sm">When to Use Indexes:</h6>
                  <div className="text-xs text-orange-700 mt-1 space-y-1">
                    <div>✅ Columns in WHERE clauses</div>
                    <div>✅ Columns in JOIN conditions</div>
                    <div>❌ Small tables (&lt; 1000 rows)</div>
                    <div>❌ Frequently updated columns</div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2 text-blue-600">Query Optimization Tips:</h5>
                <div className="space-y-2 text-sm">
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-green-600 font-semibold">✅ Good:</span> Use specific columns in SELECT
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-red-600 font-semibold">❌ Bad:</span> SELECT * from large tables
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <span className="text-green-600 font-semibold">✅ Good:</span> Use EXISTS instead of IN
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="text-red-600 font-semibold">❌ Bad:</span> Functions in WHERE clauses
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="font-semibold text-blue-800 mb-2">Better Query Example:</h6>
                  <CodeBlock code={`-- More efficient
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM departments d
    WHERE d.dept_id = e.dept_id 
    AND d.location = 'New York'
);`} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-4">🛡️ Security Best Practices</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2 text-red-600">Prevent SQL Injection:</h5>
                <div className="space-y-2 text-sm">
                  <div className="bg-red-50 p-2 rounded border-l-4 border-red-500">
                    <span className="text-red-600 font-semibold">❌ Vulnerable:</span>
                    <div className="font-mono text-xs mt-1">"SELECT * FROM users WHERE username = '" + userInput + "'"</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded border-l-4 border-green-500">
                    <span className="text-green-600 font-semibold">✅ Secure:</span>
                    <div className="font-mono text-xs mt-1">Use parameterized queries/prepared statements</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2 text-blue-600">Access Control:</h5>
                <CodeBlock code={`-- Principle of least privilege
GRANT SELECT ON employees TO 'report_user'@'%';
GRANT SELECT, INSERT, UPDATE ON orders TO 'sales_app'@'10.0.0.%';

-- Revoke unnecessary permissions
REVOKE ALL PRIVILEGES ON company_db.* FROM 'temp_user'@'%';`} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const navigation = [
    { id: 'introduction', title: 'Introduction', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ddl', title: 'DDL Commands', icon: <Database className="w-4 h-4" /> },
    { id: 'dml', title: 'DML Commands', icon: <Code className="w-4 h-4" /> },
    { id: 'dql', title: 'DQL Queries', icon: <Search className="w-4 h-4" /> },
    { id: 'joins', title: 'SQL Joins', icon: <Users className="w-4 h-4" /> },
    { id: 'functions', title: 'Functions', icon: <Zap className="w-4 h-4" /> },
    { id: 'advanced', title: 'Advanced', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-purple-600 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Database className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SQL Comprehensive Guide
                </h1>
                <p className="text-gray-600 text-sm">Master Structured Query Language</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Portfolio Project</span>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-6 py-8" style={{marginTop: '80px'      }}>
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200 h-fit sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {sections.map((section) => (
                <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
                  <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Master SQL?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  This comprehensive guide covers essential SQL concepts from basic syntax to advanced features. 
                  Practice regularly with real databases to become proficient in database management and querying.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <h4 className="font-semibold mb-1">Practice</h4>
                    <p className="text-sm text-gray-300">Use sample databases to practice scenarios</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h4 className="font-semibold mb-1">Optimize</h4>
                    <p className="text-sm text-gray-300">Learn query optimization techniques</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <h4 className="font-semibold mb-1">Secure</h4>
                    <p className="text-sm text-gray-300">Follow security best practices</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium">MySQL</div>
                  <div className="bg-green-600 px-4 py-2 rounded-full text-sm font-medium">PostgreSQL</div>
                  <div className="bg-red-600 px-4 py-2 rounded-full text-sm font-medium">SQL Server</div>
                  <div className="bg-orange-600 px-4 py-2 rounded-full text-sm font-medium">Oracle</div>
                  <div className="bg-purple-600 px-4 py-2 rounded-full text-sm font-medium">SQLite</div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold">SQL Comprehensive Guide</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Created for portfolio demonstration • React + Tailwind CSS
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Scroll to top"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
        
        <button 
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="Run SQL playground"
          onClick={() => alert('SQL Playground feature - Connect to your preferred database!')}
        >
          <Play className="w-5 h-5" />
        </button>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-40 w-18 h-18 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
    </div>
  );
};

export default SQLGuide;