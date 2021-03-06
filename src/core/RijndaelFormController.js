/**
 * handles everything regarding the rijndael form
 * 
*/

import Rijndael from "./aes/rijndael-block.js"
import Utils from "./aes/utils.js"

import {intToHexStringArray} from "../utils/conversions"

const FORM_BTN_ID = "rijndael-form-button"
const OUTPUT_FIELD_ID = "rijndael-form-ouput"
const KEY_FIELD_ID = "rijndael-form-key-input"
const PLAINTEXT_FIELD_ID = "rijndael-form-plaintext-input"
const FORM_ERROR_FIELD = "rijndael-form-error-field"

class RijndaelFormController{

    constructor(controller){
        this.controller = controller

        this.formButton = document.getElementById(FORM_BTN_ID)
        this.outputField = document.getElementById(OUTPUT_FIELD_ID)
        this.KeyField = document.getElementById(KEY_FIELD_ID)
        this.plaintextField = document.getElementById(PLAINTEXT_FIELD_ID)
        this.errorField = document.getElementById(FORM_ERROR_FIELD)
        this.errors = null;

        // add event listener
        this.formButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.onEcryptClick(true);
        })

        // prime store
        this.onEcryptClick();
    }


    excuteRijndaelAES({plaintext, key}){
        const cipher = new Rijndael(key, 'ecb');
        const [ciphertext, info] = cipher.encrypt(plaintext, 128);
        return [ciphertext, info]
    }


    prepareRijndaelDataForDisplay(aesInfo){
        const {block0, keySize, mode, key} = aesInfo;

        let temp = {...block0};


  
        Object.keys(temp).forEach(key => {
            const val = temp[key].slice();

            switch(key){
                case "key-schedule":
                    for(let i = 0; i < val.length / 16; i++){
                        const slice = val.slice(i*16, i*16+16)
                        temp[`key-${i}`] = intToHexStringArray(this.toGridByRow(4,4, slice));
                    }
                    return;
                case "key-shedule-subbed-bytes":
                    temp[key] = val;
                    temp["key-schedule-sub-bytes-grid"] = intToHexStringArray(val.splice(0,16));
                    return;

                case "sbox":
                    temp[key] = intToHexStringArray(val)
           
                    return;
                default: 
                    temp[key] = intToHexStringArray(this.toGridByRow(4,4, val))
                    return;
            }

        })

  

        return {
            keySize, 
            mode, 
            key,
            ...temp,
            // custom rcon
           // rcon: [...new Array()]
        }
    }


    toGridByRow = (rows, cols, elements) => {
        let newArr = new Array(elements.length)
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                newArr[j*rows+i] = elements[i*cols+j]
            }
        }
        return newArr;
    }


    gatherFormData(){
        return {
            plaintext: this.plaintextField.value,
            key: this.KeyField.value,
        }
    }

    validateFormData(data){
        console.log(data)
        // hexadecimal regex
        var re = /[0-9A-Fa-f]{6}/g;

        const key = data.key
        // check if 32 cipher hexadecimal.
        if(key.length == 32 && re.test(key)) {
            this.errorField.innerHTML = "" 
            return true;
        }

        this.errorField.innerHTML = this.controller.locale.getLocaleText("formErrorMessage")
        return false;
    }


    

    onEcryptClick(update=false){
        const formData = this.gatherFormData();

        if(this.validateFormData(formData)){
      
            const [ciphertext, info] = this.excuteRijndaelAES(formData);

            // update output field
            this.outputField.value = ciphertext;

            // prepare data for animation
            const preparedInfo = this.prepareRijndaelDataForDisplay(info)
            // call data controller to update
            this.controller.data.updateStoreByObject(preparedInfo)
            if(update)
                this.controller.timeline.saveAndRebuildTimeline();
        }
    }
}

export default RijndaelFormController