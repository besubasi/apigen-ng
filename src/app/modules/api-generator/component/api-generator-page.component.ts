import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf, NgStyle} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiGeneratorService} from "../service/api-generator-service";
import {ApiGeneratorModel} from "../model/api-generator-model";
import {PropertyModel} from "../model/property-model";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {FormMode} from "../../../common/form-mode";
import {v4 as uuid} from 'uuid';


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
        ReactiveFormsModule,
        NgIf,
        ToolbarModule,
        CardModule,
        CheckboxModule,
        RippleModule,
    ],
    styleUrls: ['./api-generator-page.component.scss'],
    templateUrl: './api-generator-page.component.html'
})
export class ApiGeneratorPageComponent implements OnInit {

    form: UntypedFormGroup;
    propertyForm: UntypedFormGroup;
    propertyList: PropertyModel[] = [];
    formMode: string;
    selectedModel: PropertyModel;

    constructor(
        private fb: FormBuilder,
        private apiGeneratorService: ApiGeneratorService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.formMode = FormMode.NONE;
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            apiPackage: [null, [Validators.required]],
            apiName: [null, [Validators.required]],
            tableName: [null, [Validators.required]],
        });
    }

    buildPropertyForm() {
        this.propertyForm = this.fb.group({
            uuid: [null, [Validators.nullValidator]],
            type: [null, [Validators.required]],
            name: [null, [Validators.required]],
            dbName: [null, [Validators.required]],
            notNull: [null, [Validators.required]],
            useSearchParameter: [null, [Validators.required]],
        });
    }

    onAdd() {
        this.formMode = FormMode.ADD;
        this.buildPropertyForm();
        this.propertyForm.patchValue({uuid: uuid()});
    }

    onCopy() {
        this.formMode = FormMode.COPY;
        this.buildPropertyForm();
        this.propertyForm.patchValue(this.selectedModel);
        this.propertyForm.patchValue({uuid: uuid()});
    }

    onUpdate() {
        this.formMode = FormMode.EDIT;
        this.buildPropertyForm();
        this.propertyForm.patchValue(this.selectedModel);
    }

    onDelete() {
        this.propertyList = this.propertyList.filter(x => x.uuid !== this.selectedModel.uuid);
    }

    onCancel() {
        this.formMode = FormMode.NONE;
        this.form.reset();
        this.propertyForm.reset();
        this.propertyList = [];
        this.buildForm();
        this.buildPropertyForm();
    }

    onGenerateApi() {
        let apiModel: ApiGeneratorModel = this.form.value;
        apiModel.propertyList = this.propertyList;

        const model: ApiGeneratorModel = this.form.value;
        this.apiGeneratorService.generate(apiModel).subscribe(
            response => {
                //this.messageService.add({severity: 'success', summary: 'Success', detail: response + ""});
            },
            error => {
                //this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
            }
        )
    }

    onBack() {
        this.formMode = FormMode.NONE;
    }

    onOkay() {
        let propertyModel: PropertyModel = this.propertyForm.value;
        if (this.formMode == FormMode.EDIT) {
            const index = this.propertyList.findIndex(x => x.uuid === propertyModel.uuid);
            this.propertyList[index] = propertyModel;
        } else {
            this.propertyList.push(propertyModel);
        }
        this.selectedModel = null;
        this.formMode = FormMode.NONE;
    }

    get FormMode() {
        return FormMode;
    }
}
