import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  @ViewChild("editInput") inputEl: ElementRef;
  @ViewChild("usersEdit") usersEl: ElementRef;
  userInput: string;
  isInEditMode = false;
  showTable = false;
  showText = true;
  jsonConvert = false;
  toJSONButton = true;
  users: unknown[] = [];
  selectedUser: unknown;
  selectedColumn: string;
  columnNames: any[];
  json: any;
  newObj: unknown[] = [];

  getData(): void {
    this.showTable = true;
    this.showText = false;
    this.users = JSON.parse(this.userInput);
    if (this.users.length) {
      this.columnNames = Object.keys(this.users[0]);
      let id = 0;
      this.users.forEach((user) => {
        user["id"] = id;
        id++;
      });
    }
  }

  toJSON(): void {
    this.toJSONButton = false;
    this.jsonConvert = true;
    this.users.forEach((user) => {
      delete user["id"];
    });

    this.json = JSON.stringify(this.users);
  }

  onEditCell(user: unknown, colName: string): void {
    this.selectedColumn = colName;
    this.selectedUser = this.users.find((us) => us[colName] === user[colName]);
    this.isInEditMode = true;
  }

  onSaveValue(): void {
    this.selectedUser[this.selectedColumn] = this.inputEl.nativeElement.value;
    this.isInEditMode = false;
    this.selectedUser = null;
    this.selectedColumn = null;
  }

  onDeleteCell(user): void {
    const idx: number = this.users.findIndex((us) => us["id"] === user["id"]);
    if (idx > -1) {
      this.users.splice(idx, 1);
    }
  }
}
