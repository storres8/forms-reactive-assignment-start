import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  invalidProjNames = ["Test"];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.forbiddenProjNames.bind(this)
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl()
    });
  }

  forbiddenProjNames(control: FormControl): { [s: string]: boolean } {
    if (this.invalidProjNames.indexOf(control.value) !== -1) {
      return { forbiddenProjectName: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
