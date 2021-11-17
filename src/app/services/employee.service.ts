import { Employee } from 'src/models/Employee';
import { EmployeeList } from 'src/models/EmployeeList';
let key = 'employees';
export class EmployeeService {
  constructor() {
    if (!localStorage.getItem(key)) {
      let employees: Employee[] = [];
      for (let i = 0; i < 27; i++) {
        let item: Employee = {
          id: i + 1,
          name: 'Thế Anh ' + (i + 1),
          salary: 100000 * Math.floor(Math.random() * (90 - 30 + 1) + 30),
        };
        employees.push(item);
      }
      localStorage.setItem(key, JSON.stringify(employees));
    }
  }

  retrieveEmployees(pageSize: number, pageIndex: number) {
    let result: EmployeeList = {
      data: [],
      length: 0,
      totalSalary: 0,
      highestSalaryEmployee: undefined,
    };
    let data: Employee[] = JSON.parse(localStorage.getItem(key) ?? '');
    result.length = data.length;
    // result.totalSalary = 0;
    // result.highestSalaryEmployee = data[0];
    // data.forEach((e) => {
    //   if (e.salary! > result.highestSalaryEmployee!.salary!) {
    //     result.highestSalaryEmployee = e;
    //   }
    //   result.totalSalary += e.salary!;
    // });
    result.data = data.splice(pageIndex * pageSize, pageSize);
    return result;
  }

  updateEmployee(item: Employee) {
    let employees: Employee[] = JSON.parse(localStorage.getItem(key) ?? '');
    let employee = employees.find((x) => x.id == item.id);
    employee!.name = item.name;
    employee!.salary = item.salary;
    localStorage.setItem(key, JSON.stringify(employees));
  }
}
