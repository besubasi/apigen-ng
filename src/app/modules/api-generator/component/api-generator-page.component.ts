import {Component} from '@angular/core';
import {CurrencyPipe, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiGeneratorService} from "../service/api-generator-service";
import {ApiGeneratorModel} from "../model/api-generator-model";
import {PropertyModel} from "../model/property-model";


@Component({
    selector: 'app-api-generator-page',
    standalone: true,
    imports: [
        NgStyle,
        ButtonModule,
        CurrencyPipe,
        MenuModule,
        SharedModule,
        TableModule,
        ChartModule,
        InputTextModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./api-generator-page.component.scss'],
    templateUrl: './api-generator-page.component.html'
})
export class ApiGeneratorPageComponent {

    form: UntypedFormGroup = this.fb.group(new ApiGeneratorModel());
    propertyList: PropertyModel[] = [];

    constructor(
        private fb: FormBuilder,
        private apiGeneratorService: ApiGeneratorService,
        private router: Router,
    ) {
    }

    loginUser() {
        const model: ApiGeneratorModel = this.form.value;
        this.apiGeneratorService.generate(model).subscribe(
            response => {
                //this.messageService.add({severity: 'success', summary: 'Success', detail: response + ""});
            },
            error => {
                //this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
            }
        )
    }

    sayMyName() {
        this.apiGeneratorService.sayMyName().subscribe(
            response => {
                //this.msgs = [];
                //this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
                //this.messageService.add({severity: 'error', summary: 'Error', detail: 'email or password is wrong'});

            },
            error => {
                //this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
            }
        )
    }
}
