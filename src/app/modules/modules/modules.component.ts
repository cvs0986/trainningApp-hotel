import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  departments: any[];
  opened = false;
  openedEdit = false;
  openedAddDep = false;
  departmentData = { id: '', name: '' };

  constructor() {}

  ngOnInit() {
    this.departments = [
      { id: 1, name: 'Front Office Training' },
      { id: 2, name: 'Front Office Ready Reckoners' }
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
