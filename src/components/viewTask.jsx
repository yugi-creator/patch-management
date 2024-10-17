// src/components/ViewTask.jsx
import React from 'react';
import './static/css/viewTask.css';
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from 'material-react-table';
import { Box, Button,Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; // or use your library of choice here

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor('sno', {
    header: 'S.No',
    size: 40,
  }),
  columnHelper.accessor('cusName', {
    header: 'Customer Name',
    size: 120,
  }),
  columnHelper.accessor('hostName', {
    header: 'Host Name',
    size: 120,
  }),
  columnHelper.accessor('os', {
    header: 'OS',
    size: 120,
  }),
  columnHelper.accessor('pubIpAddr', {
    header: 'Public IP Address',
    size: 120,
  }),
  columnHelper.accessor('priIpAddr', {
    header: 'Private IP Address',
    size: 120,
  }),
  columnHelper.accessor('groupName', {
    header: 'Group Name',
    size: 120,
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    size: 120,
  }),
  columnHelper.accessor('scheduleDate', {
    header: 'Schedule Date',
    size: 120,
  }),
  columnHelper.accessor('scheduleTime', {
    header: 'Schedule Time',
    size: 120,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    size: 120,
  }),
];

// Sample data for the table
const data = [
  {
    sno: 1,
    cusName: 'Customer 1',
    hostName: 'Host 1',
    os: 'Windows',
    pubIpAddr: '192.168.1.1',
    priIpAddr: '10.0.0.1',
    groupName: 'Group 1',
    location: 'Location 1',
    scheduleDate: '2024-10-20',
    scheduleTime: '10:00 AM',
    status: 'Scheduled',
  },
  {
    sno: 2,
    cusName: 'Customer 2',
    hostName: 'Host 2',
    os: 'Linux',
    pubIpAddr: '192.168.1.2',
    priIpAddr: '10.0.0.2',
    groupName: 'Group 2',
    location: 'Location 2',
    scheduleDate: '2024-10-21',
    scheduleTime: '11:00 AM',
    status: 'Not Patched',
  },
  // Add more data as needed
];

// CSV configuration
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const ViewTask = () => {
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <div>
      {/* <Typography variant="h5" component="h2" gutterBottom>
        Task View
      </Typography> */}
      {/* Table rendering */}
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ViewTask;
