// Your code here
//Assumptions
function createEmployeeRecord ([firstName, familyName, title, hourlyRate]) {
    return {
        "firstName" : firstName,
        "familyName" : familyName,
        "title" : title,
        "payPerHour": hourlyRate,
        "timeInEvents": [],
        "timeOutEvents" : [],
    }
}

function createEmployeeRecords (employeeArray) {
     let result = [];
        employeeArray.forEach(element => {
            result.push(createEmployeeRecord(element))
        });
    //  for (let i =0; i < employeeArray.length; i++){
    //     result [i] = createEmployeeRecord (employeeArray[i])
    //  };
     return result;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    let time = dateStamp.split(" ");

    employeeRecord.timeInEvents.push ({
        "type": "TimeIn",
        "hour": parseFloat(time[1]),
        "date": time[0] 
    });

    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, dateStamp){
    let time = dateStamp.split(" ");

    employeeRecord.timeOutEvents.push ({
        "type": "TimeOut",
        "hour": parseFloat(time[1]),
        "date": time[0]
    });

    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date){
    let i = 0;
    for (let count = 0; count< employeeRecord.timeInEvents.length; count++){
        if (employeeRecord.timeInEvents[count].date === date) {
            i = count;
        }
    }
    let hourWorked = employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour;
    return Math.floor(hourWorked/100) + (hourWorked%100)/60;
}

function wagesEarnedOnDate (employeeRecord, date) {
    return hoursWorkedOnDate (employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor (employeeRecord) {
    let wages = 0
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++){
        wages = wages + wagesEarnedOnDate (employeeRecord, employeeRecord.timeInEvents[i].date);
    }
    return wages;
}

function findEmployeeByFirstName (employeeArray, firstName) {
    let result = 0 //[] if you want to see any possible identical firstName
    employeeArray.forEach(element => {
        if (element.firstName === firstName){
             result = element//result.push (element);
        }
    });
    return result;
}

function calculatePayroll (employeeArray){
    let sumOfPay = 0;
    employeeArray.forEach(element => {
        sumOfPay += allWagesFor (element);
    });
    return sumOfPay;
}