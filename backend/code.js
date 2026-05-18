/**
 * Job Applicant Management System - Backend (GAS)
 * 
 * Instructions:
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Copy this code into the editor.
 * 4. Deploy as a Web App (Execute as: Me, Access: Anyone).
 */

const SHEET_NAME = 'Applicants';

function doGet(e) {
  return handleResponse(getApplicants());
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch (action) {
      case 'CREATE':
        return handleResponse(createApplicant(data.payload));
      case 'UPDATE':
        return handleResponse(updateApplicant(data.payload));
      case 'DELETE':
        return handleResponse(deleteApplicant(data.payload.id));
      default:
        return handleResponse({ error: 'Invalid action' }, 400);
    }
  } catch (err) {
    return handleResponse({ error: err.toString() }, 500);
  }
}

function handleResponse(data, status = 200) {
  const output = JSON.stringify(data);
  // ContentService JSON output automatically handles CORS redirection
  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Could not find the active spreadsheet. Please ensure the script is created via 'Extensions > Apps Script' within a Google Sheet.");
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'name', 'phone', 'email', 'position', 'status', 'note', 'created_at']);
  }
  return sheet;
}

function getApplicants() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  return data.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

function createApplicant(payload) {
  const { name, phone, email, position, note } = payload;
  
  // Validation
  if (!name || !phone || !email || !position) {
    return { error: 'Missing required fields' };
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email format' };
  }
  
  // Phone validation (numbers only)
  if (!/^\d+$/.test(phone)) {
    return { error: 'Phone must be numbers only' };
  }

  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  // Duplicate check
  for (let i = 1; i < data.length; i++) {
    if (data[i][2] == phone || data[i][3] == email) {
      return { error: 'Email or Phone already exists' };
    }
  }

  const id = Utilities.getUuid();
  const createdAt = new Date().toISOString();
  const status = 'Applied';
  
  sheet.appendRow([id, name, phone, email, position, status, note || '', createdAt]);
  
  return { success: true, id };
}

function updateApplicant(payload) {
  const { id, status, name, phone, email, position, note } = payload;
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(row => row[0] === id);
  
  if (rowIndex === -1) {
    return { error: 'Applicant not found' };
  }

  const currentStatus = data[rowIndex][5];
  
  // Status Flow Logic
  if (status && status !== currentStatus) {
    if (currentStatus === 'Passed' && status === 'Applied') {
      return { error: 'Passed applicants cannot be moved back to Applied' };
    }
    if (currentStatus === 'Rejected' && status === 'Interview') {
      return { error: 'Rejected applicants cannot be moved back to Interview' };
    }
  }

  // Update values
  const updatedRow = [...data[rowIndex]];
  if (name) updatedRow[1] = name;
  if (phone) updatedRow[2] = phone;
  if (email) updatedRow[3] = email;
  if (position) updatedRow[4] = position;
  if (status) updatedRow[5] = status;
  if (note !== undefined) updatedRow[6] = note;

  sheet.getRange(rowIndex + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
  
  return { success: true };
}

function deleteApplicant(id) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(row => row[0] === id);
  
  if (rowIndex === -1) {
    return { error: 'Applicant not found' };
  }
  
  sheet.deleteRow(rowIndex + 1);
  return { success: true };
}
