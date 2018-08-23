import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Validateme from '@validate-me/core/Validateme';
import ValidatemeField from '@validate-me/core/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

@Component({
  selector: 'angular-validateme-demo',
  template: `
            <form #formHtml [formGroup]="myReactiveForm" (submit)="sendForm(myReactiveForm, $event)">
                <input type="text" name="name" formControlName="name">
                <button type="submit">Send</button>
            </form>
    `
})
export class AppComponent implements AfterViewInit {

  public myReactiveForm: FormGroup;
  private validateme: Validateme;
  @ViewChild('formHtml') formHtml: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    this.myReactiveForm = this.formBuilder.group({
      name: ['', []]
    });
  }

  ngAfterViewInit(): void {
    this.validateme = new Validateme({
      fields: [new ValidatemeField({ name: 'name' })],
    });
    vanillaConnector(this.validateme, this.formHtml.nativeElement);
  }

  sendForm(form: FormGroup, evt: any): void {
    evt.preventDefault();

    if (!this.validateme.validate()) {
      return;
    }

  }
}
