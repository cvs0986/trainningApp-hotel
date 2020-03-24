import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments: any[];
  opened = false;
  openedEdit = false;
  openedAddDep = false;
  departmentData = { id: '', name: '' };

  constructor() {}

  ngOnInit() {
    this.departments = [
      { id: 1, name: 'Front Office' },
      { id: 2, name: 'Housekeeping' }
    ];
  }

  openPromt(dep) {
    this.opened = !this.opened;
    this.departmentData = dep;
    console.log(dep, this.departmentData);
  }

  openEdit(dep) {
    this.openedEdit = !this.openedEdit;
    this.departmentData = dep;
  }

  openAdd() {
    this.openedAddDep = !this.openedAddDep;
  }

  cancel() {
    this.opened = false;
  }

  editCancel() {
    this.openedEdit = false;
  }
}
