import DomUtil from "../Utilities/DomUtil";
import CustomElement from "../Utilities/CustomElement.decorator";
import * as tingle from "tingle.js";
import UrlUtil from "../Utilities/UrlUtil";
import MakeRequest from "../Utilities/MakeRequest";
import { User } from "../Model/UserModel";

@CustomElement({
    selector: 'user-editor',
    template: `<div></div>`,
    style: ``,
    useShadow: true,
})


export class UserEditor extends HTMLElement {
    private userId: string;
    private domUtil: DomUtil;
    public registrationMode: boolean;
    private urlUtil: UrlUtil;
    constructor() {
        super();
    }

    connectedCallback(): void {
        this.domUtil = new DomUtil(this);
        this.urlUtil = new UrlUtil();
        this.init();
    }

    init(): void {
        this.parseData();
        this.bindEvents();
        //this.registrationMode

        const userModelUrl = `${this.urlUtil.baseUrl()}/api/modal/UserEditor?id=${this.userId}`;

        new MakeRequest(userModelUrl)
            .send()
            .then(data => {
                const modal = new tingle.modal({
                    footer: true,
                    stickyFooter: false,
                    closeMethods: ["overlay", "button", "escape"],
                    closeLabel: "Close",
                    cssClass: ["custom-class-1", "custom-class-2"],
                    beforeClose: () => { this.remove(); return true; },
                    onClose: () => { modal.destroy(); }
                });
                modal.setContent(data);
                modal.open();
                this.addUserSubmitDataListener();

            })
            .catch(err => {
                console.error("Augh, there was an error!", err.statusText);
            });
    }

    addUserSubmitDataListener() {
        var submitUser = document.getElementById("submit-user");
        submitUser.addEventListener("click", () => {
            if (this.registrationMode == true) {
                this.submitUser();
            } else
                this.updateUser();
        });
    }

    private submitUser(): void {
        let userData = new User();
        userData.GetUserData();
        const userUpdateDataUrl = `${this.urlUtil.baseUrl()}/api/user/Add`;

        new MakeRequest(userUpdateDataUrl, "post")
            .send(JSON.stringify(userData))
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error("Augh, there was an error!", err.statusText);
            });
    }

    private updateUser(): void {
        let userData = new User();
        userData.GetUserData();
        const userUpdateDataUrl = `${this.urlUtil.baseUrl()}/api/user/Change?id=${this.userId}`;

        new MakeRequest(userUpdateDataUrl, "patch")
            .send(JSON.stringify(userData))
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error("Augh, there was an error!", err.statusText);
            });
    }

    private parseData(): void {
        this.userId = this.getAttribute("user-id");
    }

    private bindEvents(): void {
    }


}
