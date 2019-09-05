import { Component } from "@angular/core";

@Component({
    selector: "float-btn",
    moduleId: module.id,
    template: `
        <StackLayout class="float-btn">
            <Label class="float-btn-text" text="+"></Label>
        </StackLayout>
    `,
    styles: [`
        .float-btn {
            background-color: #30bcff;
            width: 56;
            height: 56;
            text-align: centerl;
            vertial-align: middle;
        }
        .float-btn-text {
            color: #ffffff;
            font-size: 36;
        }
    `]
})
export class FloatBtnComponenet {

}