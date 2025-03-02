// import React, { useState, useMemo } from 'react';
// import { useState } from 'react'

// const StockManagementScreen = () => {
//   // Sample stock data
//   const initialStockData = [
//     {
//       id: 1,
//       companyName: 'Som Distilleries & Breweries Ltd.',
//       date: '03 Dec 2024',
//       quantity: 1212120,
//       price: 110,
//       percentageChange: 0.62,
//       action: 'Acquisition',
//       fundamentalAnalysis: 'No data',
//       marketCap: 95000,
//       enterpriseValue: 110000,
//       numberOfShares: 85000000,
//       pe: 15.8,
//       pb: 1.4,
//       dividendYield: 0.8,
//       cash: 12000,
//       debt: 27000,
//       promoterHolding: 45.2,
//       sales: 42000,
//       roe: 8.9,
//       roce: 10.2
//     },
//     {
//       id: 2,
//       companyName: 'Reliance Industries Ltd.',
//       date: '02 Dec 2024',
//       quantity: 500000,
//       price: 2450,
//       percentageChange: 1.25,
//       action: 'Purchase',
//       fundamentalAnalysis: 'Strong Buy',
//       marketCap: 1650000,
//       enterpriseValue: 1800000,
//       numberOfShares: 6753000000,
//       pe: 28.5,
//       pb: 2.8,
//       dividendYield: 0.35,
//       cash: 220000,
//       debt: 370000,
//       promoterHolding: 50.6,
//       sales: 640000,
//       roe: 12.8,
//       roce: 14.3
//     },
//     {
//       id: 3,
//       companyName: 'TCS Ltd.',
//       date: '01 Dec 2024',
//       quantity: 25000,
//       price: 3820,
//       percentageChange: -0.45,
//       action: 'Sale',
//       fundamentalAnalysis: 'Hold',
//       marketCap: 1380000,
//       enterpriseValue: 1320000,
//       numberOfShares: 3658000000,
//       pe: 26.4,
//       pb: 12.6,
//       dividendYield: 1.2,
//       cash: 85000,
//       debt: 25000,
//       promoterHolding: 72.3,
//       sales: 210000,
//       roe: 42.6,
//       roce: 45.8
//     }
//   ];

//   // Set default sort configuration for financial metrics
//   const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'descending' });
//   const [stockData, setStockData] = useState(initialStockData);
//   const [filters, setFilters] = useState({});
//   const [visibleColumns, setVisibleColumns] = useState({
//     companyName: true,
//     date: true,
//     quantity: true,
//     price: true,
//     percentageChange: true,
//     action: true,
//     fundamentalAnalysis: false,
//     marketCap: true,
//     enterpriseValue: true,
//     numberOfShares: true,
//     pe: true,
//     pb: true,
//     dividendYield: true,
//     cash: true,
//     debt: true,
//     promoterHolding: true,
//     sales: true,
//     roe: true,
//     roce: true
//   });
//   const [showColumnToggle, setShowColumnToggle] = useState(false);

//   // Financial metrics that should be sortable
//   const financialMetrics = [
//     'marketCap', 'enterpriseValue', 'numberOfShares', 'pe', 'pb', 
//     'dividendYield', 'cash', 'debt', 'promoterHolding', 'sales', 'roe', 'roce'
//   ];

//   // Extract unique dates for the dropdown
//   const uniqueDates = useMemo(() => {
//     const dates = [...new Set(stockData.map(item => item.date))];
//     return ['All Dates', ...dates];
//   }, [stockData]);

//   // Extract unique actions for the dropdown
//   const uniqueActions = useMemo(() => {
//     const actions = [...new Set(stockData.map(item => item.action))];
//     return ['All Actions', ...actions];
//   }, [stockData]);

//   // Handle sorting
//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Handle filter change
//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   // Toggle column visibility
//   const toggleColumnVisibility = (column) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [column]: !prev[column]
//     }));
//   };

//   // Apply sorting and filtering
//   const sortedAndFilteredData = useMemo(() => {
//     let filteredData = [...stockData];
    
//     // Apply filters
//     Object.keys(filters).forEach(key => {
//       const filterValue = filters[key];
//       if (filterValue) {
//         if (key === 'date' && filterValue !== 'All Dates') {
//           filteredData = filteredData.filter(item => item[key] === filterValue);
//         } else if (key === 'action' && filterValue !== 'All Actions') {
//           filteredData = filteredData.filter(item => item[key] === filterValue);
//         } else if (filterValue !== 'All Dates' && filterValue !== 'All Actions') {
//           filteredData = filteredData.filter(item => {
//             if (typeof item[key] === 'string') {
//               return item[key].toLowerCase().includes(filterValue.toLowerCase());
//             } else if (typeof item[key] === 'number') {
//               return item[key].toString().includes(filterValue);
//             }
//             return false;
//           });
//         }
//       }
//     });
    
//     // Apply sorting
//     if (sortConfig.key) {
//       filteredData.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
    
//     return filteredData;
//   }, [stockData, sortConfig, filters]);

//   // Column definitions
//   const columns = [
//     { key: 'companyName', label: 'Company Name', type: 'text', group: 'basic' },
//     { key: 'date', label: 'Date', type: 'date', group: 'basic' },
//     { key: 'quantity', label: 'Quantity', type: 'number', group: 'basic' },
//     { key: 'price', label: 'Price', type: 'number', group: 'basic' },
//     { key: 'percentageChange', label: 'Percentage Change', type: 'number', group: 'basic' },
//     { key: 'action', label: 'Action', type: 'action', group: 'basic' },
//     { key: 'fundamentalAnalysis', label: 'Fundamental Analysis', type: 'text', group: 'basic' },
//     { key: 'marketCap', label: 'Market Cap', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'enterpriseValue', label: 'Enterprise Value', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'numberOfShares', label: 'Number of Shares', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'pe', label: 'P/E', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'pb', label: 'P/B', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'dividendYield', label: 'Dividend Yield', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'cash', label: 'Cash', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'debt', label: 'Debt', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'promoterHolding', label: 'Promoter Holding', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'sales', label: 'Sales', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'roe', label: 'ROE', type: 'number', isFinancial: true, group: 'financial' },
//     { key: 'roce', label: 'ROCE', type: 'number', isFinancial: true, group: 'financial' }
//   ];

//   // Group columns
//   const columnGroups = {
//     basic: columns.filter(col => col.group === 'basic'),
//     financial: columns.filter(col => col.group === 'financial')
//   };

//   // Render filter input based on column type
//   const renderFilterInput = (column) => {
//     if (column.key === 'date') {
//       return (
//         <select
//           className="border rounded p-1 w-full bg-white"
//           value={filters[column.key] || 'All Dates'}
//           onChange={(e) => handleFilterChange(column.key, e.target.value)}
//         >
//           {uniqueDates.map(date => (
//             <option key={date} value={date}>{date}</option>
//           ))}
//         </select>
//       );
//     } else if (column.key === 'action') {
//       return (
//         <select
//           className="border rounded p-1 w-full bg-white"
//           value={filters[column.key] || 'All Actions'}
//           onChange={(e) => handleFilterChange(column.key, e.target.value)}
//         >
//           {uniqueActions.map(action => (
//             <option key={action} value={action}>{action}</option>
//           ))}
//         </select>
//       );
//     } else {
//       return (
//         <input
//           type={column.type === 'number' ? 'number' : 'text'}
//           placeholder={`Filter ${column.label.toLowerCase()}`}
//           className="border rounded p-1 w-full"
//           value={filters[column.key] || ''}
//           onChange={(e) => handleFilterChange(column.key, e.target.value)}
//         />
//       );
//     }
//   };

//   // Format financial value based on type
//   const formatValue = (key, value) => {
//     if (key === 'percentageChange' || key === 'dividendYield' || key === 'roe' || key === 'roce' || key === 'promoterHolding') {
//       return `${value}%`;
//     } else if (typeof value === 'number') {
//       return value.toLocaleString();
//     }
//     return value;
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Stock Management</h1>
//         <button 
//           onClick={() => setShowColumnToggle(!showColumnToggle)}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           {showColumnToggle ? 'Hide Column Settings' : 'Customize Columns'}
//         </button>
//       </div>
      
//       {/* Column Visibility Panel (Hidden by default) */}
//       {showColumnToggle && (
//         <div className="mb-6 bg-white p-4 border rounded shadow-md">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-medium mb-2 text-gray-700">Basic Columns</h3>
//               <div className="flex flex-wrap gap-2">
//                 {columnGroups.basic.map(column => (
//                   <button
//                     key={column.key}
//                     className={`px-3 py-1 text-xs rounded transition-colors ${visibleColumns[column.key] ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                     onClick={() => toggleColumnVisibility(column.key)}
//                   >
//                     {column.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium mb-2 text-gray-700">Financial Metrics</h3>
//               <div className="flex flex-wrap gap-2">
//                 {columnGroups.financial.map(column => (
//                   <button
//                     key={column.key}
//                     className={`px-3 py-1 text-xs rounded transition-colors ${visibleColumns[column.key] ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                     onClick={() => toggleColumnVisibility(column.key)}
//                   >
//                     {column.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Active Filters Bar */}
//       <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
//         <div className="flex items-center">
//           <span className="text-sm font-medium mr-2">Sort by:</span>
//           <select 
//             className="border rounded p-1 bg-white"
//             value={sortConfig.key}
//             onChange={(e) => handleSort(e.target.value)}
//           >
//             {columns.filter(col => visibleColumns[col.key]).map(column => (
//               <option key={column.key} value={column.key}>{column.label}</option>
//             ))}
//           </select>
//           <button 
//             className="ml-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
//             onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'ascending' ? 'descending' : 'ascending' }))}
//           >
//             {sortConfig.direction === 'ascending' ? '↑' : '↓'}
//           </button>
//         </div>
        
//         <div className="flex items-center ml-auto">
//           <input
//             type="text"
//             placeholder="Quick search..."
//             className="border rounded p-1"
//             value={filters.companyName || ''}
//             onChange={(e) => handleFilterChange('companyName', e.target.value)}
//           />
//         </div>
//       </div>
      
//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.filter(col => visibleColumns[col.key]).map(column => (
//                 <th 
//                   key={column.key}
//                   className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${column.isFinancial ? 'bg-blue-50' : ''}`}
//                   onClick={() => handleSort(column.key)}
//                 >
//                   <div className="flex items-center">
//                     {column.label}
//                     {sortConfig.key === column.key && (
//                       <span className="ml-1">
//                         {sortConfig.direction === 'ascending' ? '↑' : '↓'}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
            
//             {/* Filter Row */}
//             <tr className="bg-gray-100">
//               {columns.filter(col => visibleColumns[col.key]).map(column => (
//                 <th key={`filter-${column.key}`} className="px-1 py-2">
//                   {renderFilterInput(column)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sortedAndFilteredData.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 {columns.filter(col => visibleColumns[col.key]).map(column => (
//                   <td 
//                     key={column.key} 
//                     className={`px-4 py-2 whitespace-nowrap ${column.isFinancial ? 'text-right font-medium' : ''}`}
//                   >
//                     {formatValue(column.key, item[column.key])}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {sortedAndFilteredData.length === 0 && (
//               <tr>
//                 <td 
//                   colSpan={columns.filter(col => visibleColumns[col.key]).length} 
//                   className="px-6 py-4 text-center text-gray-500"
//                 >
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Financial Metrics Quick Sort */}
//       <div className="flex flex-wrap items-center gap-2">
//         <span className="text-sm font-medium">Quick Sort:</span>
//         {financialMetrics.filter(metric => visibleColumns[metric]).map(metric => (
//           <button
//             key={metric}
//             className={`px-2 py-1 text-xs rounded transition-colors ${sortConfig.key === metric ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//             onClick={() => handleSort(metric)}
//           >
//             {columns.find(col => col.key === metric)?.label} {sortConfig.key === metric ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StockManagementScreen;