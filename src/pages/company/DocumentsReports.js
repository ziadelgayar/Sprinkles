import React, { useState } from 'react';

const DocumentsReports = () => {
  const [documents, setDocuments] = useState([]);
  const [reports, setReports] = useState([]);

  return (
    <div className="main-content">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="page-header mb-6">
          <h1 className="text-2xl font-bold">Documents & Reports</h1>
        </div>

        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Company Documents</h2>
          <div className="flex justify-end mb-4">
            <button className="accept-btn">Upload New Document</button>
          </div>
          <div className="space-y-4">
            {documents.length === 0 ? (
              <p className="text-gray-500">No documents available</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="custom-box bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="document-info mb-2 md:mb-0">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-xs text-gray-500">Type: {doc.type}</p>
                    <p className="text-xs text-gray-400">Last Updated: {doc.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="accept-btn">View</button>
                    <button className="save-btn">Download</button>
                    <button className="reject-btn">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="custom-box mb-6">
          <h2 className="text-xl font-bold mb-4">Reports</h2>
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            <select className="p-2 border rounded bg-white text-gray-900">
              <option>All Reports</option>
              <option>Internship Reports</option>
              <option>Application Reports</option>
              <option>Evaluation Reports</option>
            </select>
            <input type="date" className="p-2 border rounded bg-white text-gray-900" placeholder="Select Date Range" />
          </div>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <p className="text-gray-500">No reports available</p>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="custom-box bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-xs text-gray-400">Generated: {report.generatedDate}</p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button className="save-btn">Generate Report</button>
                    <button className="accept-btn">Download</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsReports;
