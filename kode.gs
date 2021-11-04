function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}

function uuid() {
  var uuid_array = [];
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA");
  var getLastRow = dataSheet.getLastRow();
  if(getLastRow > 1) {
    var uuid_values = dataSheet.getRange(2, 1, getLastRow - 1, 1).getValues(); 
    for(i = 0; i < uuid_values.length; i++)
    {
      uuid_array.push(uuid_values[i][0]);
    }
    var x_count = 0;
    do {
    var y = 'false';
    var uuid_value = Utilities.getUuid(); 

    if(uuid_array.indexOf(uuid_value) == -1.0)
    {
      y = 'true';
      Logger.log(uuid_value);
      return uuid_value;   
    } 
    x_count++;
    } while (y == 'false' && x_count < 5);
  } else {
    return Utilities.getUuid();
  }
}

function UpdateRecord(record_id, nama, kelas, gender, nisn, t1, t2, t3, t4, pts, us) {
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 11).getValues();
  for(i = 0; i < table_values.length; i++)
  {
    if(table_values[i][0] == record_id)
    {
      dataSheet.getRange(i+2, 2).setValue(nama);
      dataSheet.getRange(i+2, 3).setValue(kelas);
      dataSheet.getRange(i+2, 4).setValue(gender);
      dataSheet.getRange(i+2, 5).setValue(nisn);
      dataSheet.getRange(i+2, 6).setValue(t1);
      dataSheet.getRange(i+2, 7).setValue(t2);
      dataSheet.getRange(i+2, 8).setValue(t3);
      dataSheet.getRange(i+2, 9).setValue(t4);
      dataSheet.getRange(i+2, 10).setValue(pts);
      dataSheet.getRange(i+2, 11).setValue(us);
    }
    
  }
  return 'SUCCESS';
}

function DeleteRecord(record_id)
{
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  var table_values = dataSheet.getRange(2, 1, getLastRow - 1, 11).getValues();
  for(i = 0; i < table_values.length; i++)
  {
    if(table_values[i][0] == record_id)
    {
      var rowNumber = i+2;
      dataSheet.getRange('A' + rowNumber +':K' + rowNumber).clearContent();
      
    }   
  }
  return 'SUCCESS';
}

function AddRecord(nama, kelas, gender, nisn, t1, t2, t3, t4, pts, us) {
  var uniqueID = uuid();
  var found_record = false;
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA");
  var getLastRow = dataSheet.getLastRow();
  for(i = 2; i < getLastRow; i++)
  {
    if(dataSheet.getRange(i, 1).getValue() == '')
    {
      dataSheet.getRange('A' + i + ':K' + i).setValues([[uniqueID, nama, kelas, gender, nisn, t1, t2, t3, t4, pts, us, new Date()]]);
      found_record = true;
      break;
    }
  }
  if(found_record == false)
  { 
    dataSheet.appendRow([uniqueID, nama, kelas, gender, nisn, t1, t2, t3, t4, pts, us, new Date()]);
  }
  return 'SUCCESS';
  
}

function searchRecords(nama, kelas, gender, nisn, t1, t2, t3, t4, pts, us) 
{

  var returnRows = [];
  var allRecords = getRecords();

  allRecords.forEach(function(value, index) {

    var evalRows = [];
    if(nama != '')
    {
      if(value[1].toUpperCase() == nama.toUpperCase()) {
        evalRows.push('true');
      } else {
        evalRows.push('false');
      }
    }
    else
    {
       evalRows.push('true');
    }

    if(kelas != '')
    {
       if(value[2].toUpperCase() == kelas.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(gender != '')
    {
       if(value[3].toUpperCase() == gender.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(nisn != '')
    {
       if(value[4].toUpperCase() == nisn.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(t1 != '')
    {
       if(value[5].toUpperCase() == t1.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(t2 != '')
    {
       if(value[6] == t2) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(t3 != '')
    {
       if(value[7].toUpperCase() == t3.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

     if(t4 != '')
    {
       if(value[8].toUpperCase() == t4.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

     if(pts != '')
    {
       if(value[9].toUpperCase() == pts.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

     if(us != '')
    {
       if(value[10].toUpperCase() == us.toUpperCase()) {
         evalRows.push('true');
       } else {
         evalRows.push('false');
       }
    }
    else
    {
       evalRows.push('true');
    }

    if(evalRows.indexOf("false") == -1)
    {
      returnRows.push(value);    
    }

  });

  return returnRows;
}

function getRecords() { 
  var return_Array = [];
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("DATA"); 
  var getLastRow = dataSheet.getLastRow();
  for(i = 2; i <= getLastRow; i++)
  {
    if(dataSheet.getRange(i, 1).getValue() != '')
    {
      return_Array.push([dataSheet.getRange(i, 1).getValue(), 
      dataSheet.getRange(i, 2).getValue(),
      dataSheet.getRange(i, 3).getValue(),
      dataSheet.getRange(i, 4).getValue(),
      dataSheet.getRange(i, 5).getValue(),
      dataSheet.getRange(i, 6).getValue(), 
      dataSheet.getRange(i, 7).getValue(),
      dataSheet.getRange(i, 8).getValue(),
      dataSheet.getRange(i, 9).getValue(), 
      dataSheet.getRange(i, 10).getValue(),   
      dataSheet.getRange(i, 11).getValue()]);
    }
  }  
  return return_Array;  
}