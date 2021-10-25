import { AlertType } from "./alert-type.enum";

export class Alert {
    id!: string;
    type!: AlertType;
    message!: string;
    timeout!: number;
    autoClose!: boolean;
    redirect!: boolean;
    redirectLink!: string;
    fade!: boolean;
    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}