import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/observable";

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
      projectName: new FormControl(
        null,
        [Validators.required],
        [this.asyncFobiddenProjNames.bind(this)]
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl()
    });

    this.projectForm.statusChanges.subscribe(status => {
      console.log(`Form is ${status}`);
    });
  }

  // This is the same custom Validator as bellow except this one is sybchronus.

  // forbiddenProjNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.invalidProjNames.indexOf(control.value) !== -1) {
  //     return { forbiddenProjectName: true };
  //   } else {
  //     return null;
  //   }
  // }

  asyncFobiddenProjNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        if (this.invalidProjNames.indexOf(control.value) !== -1) {
          res({ forbiddenProjectName: true });
        } else {
          res(null);
        }
      }, 1000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
