import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import '@webcomponents/webcomponentsjs/webcomponents-loader.js';

import DomUtil from "./Utilities/DomUtil";
import { UserModel } from "./WebComponents/UserModal.component";
import { UserEditor } from "./WebComponents/UserEditor.component";

export default class App {
    constructor() { }

    execute() {
        try {
            this.setListeners();
        } catch (error) { }
    }

    setListeners() {
        this.viewUserListeners();
        this.editUserListeners();
        this.addUserListener();


       
    }


    viewUserListeners() {
        var usersRows = document.querySelectorAll(".user");
        [].slice
            .call(usersRows)
            .forEach((element: Element, index: number, array: HTMLElement[]) => {
                element.addEventListener("click", () => {
                    const domUtil = new DomUtil(element);
                    const userId = domUtil.getDataAttr("userid");

                    const userElement = new UserModel();

                    userElement.setAttribute("user-id", userId);
                    document.documentElement.append(userElement);
                }, false);
            });
    }

    editUserListeners() {
        var usersRows = document.querySelectorAll(".edit-user");
        [].slice
            .call(usersRows)
            .forEach((element: Element, index: number, array: HTMLElement[]) => {
                element.addEventListener("click", () => {

                  
                    const domUtil = new DomUtil(element);
                    const userId = domUtil.getDataAttr("userid");

                    const userEditorElement = new UserEditor();
                    userEditorElement.registrationMode = false;
                    userEditorElement.setAttribute("user-id", userId);
                    document.documentElement.append(userEditorElement);
                }, false);
            });
    }

    addUserListener() {
        var addUser = document.getElementById("add-user");
        addUser.addEventListener("click", () => {
            const userEditorElement = new UserEditor();
            userEditorElement.registrationMode = true;
            userEditorElement.setAttribute("user-id", "");
            document.documentElement.append(userEditorElement);
        }, false);
    }
}

document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        new App().execute();
    }
};