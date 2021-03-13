import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SeparatorPipe } from '../pipe/separator.pipe';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NotificationsService } from 'src/app/core/notifications/notifications.service';
interface Action {
  item: object;
  index: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomUtilityService {
  public dateFormat = 'yyyy-MM-dd, HH:mm:ss';
  public transportModeList = [
    { id: 0, value: 'barges', label: 'Barge' },
    { id: 1, value: 'person', label: 'Person' },
    { id: 2, value: 'vehicle', label: 'Vehicle' },
    { id: 3, value: 'train', label: 'Rail-Engine' }
    // { id: 4, value: 'wagon', label: 'wagon' }
  ];
  constructor(
    private http: HttpClient,
    private decimalPipe2: DecimalPipe,
    private datePipe: DatePipe,
    private separatorPipe: SeparatorPipe,
    private currencyPipe: CurrencyPipe,
    private notificationService: NotificationsService
  ) {}

  // !========================== Delete these Functions ===============================

  /**
   * It shows results in a console, only if it's not in production mode
   * @param message any
   * @param optionalParams any
   */
  consoleLog(message?: any, ...optionalParams: any[]): void {
    if (!environment.production) {
      if (message) {
        console.log(message, optionalParams);
      } else {
        console.log(optionalParams);
      }
    }
  }

  // !========================== Checking Functions ===============================

  /**
   * Returns a Boolean value (true) that indicates a value is null or undefined or ''
   * @param value any value
   */
  isNullUndefined(value: any) {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      typeof value === undefined
    ) {
      return true;
    }
  }
  allHaveValue(array: any[]) {
    let returnValue = true;
    for (const iterator of array) {
      if (this.isNullUndefined(iterator)) {
        returnValue = false;
      }
    }
    return returnValue;
  }
  /**
   * Returns a Boolean value (true) that indicates an object is empty (has no property)
   * @param obj any object
   */
  isEmpty(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  emptyStringToNull(valueString) {
    if (!this.isNullUndefined(valueString)) {
      if (valueString.trim() === '') {
        return null;
      } else {
        return valueString;
      }
    } else {
      return null;
    }
  }
  ObjectHas(obj, key: string) {
    return key.split('.').every((x) => {
      if (typeof obj != 'object' || obj === null || !(x in obj)) return false;
      obj = obj[x];
      return true;
    });
  }

  // if(has(user, 'loc.lat')) ...
  // !========================== Date Functions ===============================
  toDateObject(value: any, yyyymmdd?: boolean) {
    if (this.isNullUndefined(value)) {
      return null;
    }
    if (value.length === 10) {
      const splitDate1: string = value.split('/');
      const year = splitDate1[2];
      const month = splitDate1[1];
      const day = splitDate1[0];
      if (!!yyyymmdd) {
        return year + month + day;
      } else {
        return new Date(`${year}/${month}/${day}`);
      }
    } else if (value.length === 8) {
      const year = value.substring(0, 4);
      const month = value.substring(4, 6);
      const day = value.substring(6, 8);
      return new Date(`${year}/${month}/${day}`);
    } else {
      return value;
    }
  }

  /**
   * Returns Boolean
   * @param dateObj date Object
   */
  isDateObj(dateObj: Date): boolean {
    return dateObj instanceof Date && !isNaN(dateObj.valueOf());
  }

  /**
   * Returns TANCIS data string yyyymmdd or dd/mm/yyyy;
   * @param myDate I think it takes date string
   */
  getFormattedDate(myDate, DD_MM_YYYY?: boolean): string {
    if (!this.isNullUndefined(myDate)) {
      const x = new Date(myDate);
      const y = x.getFullYear().toString();
      let m = (x.getMonth() + 1).toString();
      let d = x.getDate().toString();
      if (d.length === 1) {
        d = '0' + d;
      }
      if (m.length === 1) {
        m = '0' + m;
      }
      if (!!DD_MM_YYYY) {
        return d + '/' + m + '/' + y;
      } else {
        const yyyymmdd = y + m + d;
        return yyyymmdd;
      }
    }
    return null;
  }

  // !========================== Form Functions ===============================

  /**
   *
   * @param formGroup Form Name
   */
  validateAllFormFields(formGroup, showLogs = true) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        // ! Delete this after production
        if (
          !environment.production &&
          formGroup.controls[field].status === 'INVALID'
        ) {
          if (showLogs) {
            this.consoleLog(
              'Error FormControlName is: ' + field,
              formGroup.controls[field]
            );

            this.notificationService.error(
              `Input field [${field}] is [${formGroup.controls[field].status}]`
            );
          }
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control, showLogs);
      } else if (control instanceof FormArray) {
        for (let index = 0; index < control.value.length; index++) {
          const element = control as FormArray;
          this.validateAllFormFields(element.controls[index], showLogs);
        }
      }
    });
  }

  /**
   * On select change fill the name input filled
   * @param form : FormGroup Name
   * @param selectedObject : Selected Object
   * @param formControlName : FormControlName to fill
   * @param objectKey : if Type of Data is not CommonCode pass object key to fill in formControlName
   */
  onSelectChanges(
    form: FormGroup,
    selectedObject: any,
    formControlName: string,
    objectKey?: string
  ) {
    if (objectKey) {
      if (!!selectedObject) {
        form.get(formControlName).setValue(selectedObject[objectKey]);
      } else {
        form.get(formControlName).setValue(null);
      }
    } else {
      if (!!selectedObject) {
        console.log(objectKey, selectedObject);
        form.get(formControlName).setValue(selectedObject.code_name);
      } else {
        form.get(formControlName).setValue(null);
      }
    }
  }

  // TODO
  /* onSearch(data, selectAfter, selectName) {
    if (data.term.length === selectAfter && data.items.length === 1) {
      this.closeSelect(selectName);
    }
  }
  closeSelect(select: NgSelectComponent) {
    select.select;
  } */
  /**
   * Reset form
   * @param form : FormGroup Name
   */
  clearForm(form: FormGroup) {
    form.reset();
  }
  /**
   * Reset form fields
   * @param form : FormGroup Name
   * @param formControlNames : Array of FormControlNames to reset
   */
  resetFormFields(form: FormGroup, formControlNames: string[]) {
    for (const iterator of formControlNames) {
      form.get(iterator).reset();
    }
  }

  /**
   * Clear Validators form fields
   * @param form : FormGroup Name
   * @param formControlNames : Array of FormControlNames to reset
   */
  clearValidatorsFormFields(form: FormGroup, formControlNames: string[]) {
    for (const iterator of formControlNames) {
      form.get(iterator).enable();
      form.get(iterator).clearValidators();
      form.controls[iterator].updateValueAndValidity();
    }
  }
  /**
   * Set Validators form fields
   * @param form : FormGroup Name
   * @param formControlNames : Array of FormControlNames to reset
   */
  setValidatorsFormFields(form: FormGroup, formControlNames: string[]) {
    for (const iterator of formControlNames) {
      form.get(iterator).enable();
      form.controls[iterator].setValidators([Validators.required]);
      form.controls[iterator].updateValueAndValidity();
    }
  }
  /**
   * Disable form fields
   * @param form : FormGroup Name
   * @param formControlNames : Array of FormControlNames to reset
   */
  disableFormFields(form: FormGroup, formControlNames: string[]) {
    for (const iterator of formControlNames) {
      form.get(iterator).reset();
      form.get(iterator).disable();
      form.controls[iterator].updateValueAndValidity();
    }
  }

  /**
   * Returns a number rounded number
   * @param amount amount to be rounded
   * @param decPlaces number of decimal place
   */
  mathRound(amount, decPlaces: number) {
    let rtnValue;
    if (this.isNullUndefined(amount)) {
      rtnValue = 0;
    } else {
      rtnValue = +amount.toFixed(decPlaces);
    }
    return Number(rtnValue);
  }
  pipeNumber(value: any, digitsInfo?: string, locale?: string): string {
    return this.decimalPipe2.transform(value, digitsInfo, locale);
  }
  pipeDate(
    date: any,
    format = this.dateFormat,
    timezone?: string,
    locale?: string
  ) {
    return this.datePipe.transform(date, format, timezone, locale);
  }
  pipeCurrency(currency: any) {
    return this.currencyPipe.transform(currency, 'TZS');
  }
  pipeNumberArry(arrayToPipe: any, arrayKeysToPipe: any, digitsInfo?: string) {
    let newOBJ = arrayToPipe.map((obj: any) => {
      let elemet = { ...obj };
      for (let index = 0; index < arrayKeysToPipe.length; index++) {
        let element = arrayKeysToPipe[index];
        elemet[element + index] = this.pipeNumber(elemet[element], digitsInfo);
      }

      return elemet;
    });
    return newOBJ;
  }

  pipeSeparator(value: any, ...args: any) {
    return this.separatorPipe.transform(value, ...args);
  }
  getImage(imageUrl: string) {
    return this.http
      .get(imageUrl, { responseType: 'blob' })
      .pipe(switchMap((blob) => this.getBase64(blob)));
  }
  getBase64(blob) {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };

      reader.onerror = (event: any) => {
        observer.next(event.target.error.code);
        observer.complete();
      };
    });
  }
  // ! Immutable Arry Functions
  removeItem(array: any[], action: Action) {
    return array.filter((item, index) => index !== action.index);
  }
  insertItem(array: any[], action: Action) {
    let newArray = array.slice();
    newArray.splice(action.index, 0, action.item);
    return newArray;
  }
  updateObjectInArray(array: any[], action: Action) {
    return array.map((item, index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...action.item
      };
    });
  }

  // !========================== Format values Functions ===============================
  evalCustom(obj) {
    return Function('"use strict";return (' + obj + ')')();
  }
  sadReplaceAll(strTemp: number | string, strOld: string) {
    let rtnValue = strTemp
      .toString()
      .replace(this.evalCustom('/' + strOld + '/g'), '');
    return rtnValue;
  }
  sadMathRound(strAmt: number | string, decPlaces: number) {
    let rtnValue: number;
    if (this.isNullUndefined(strAmt)) {
      rtnValue = 0;
    } else {
      let factor = Math.pow(10, decPlaces);
      rtnValue = Number(this.sadReplaceAll(strAmt, ','));
      rtnValue = Math.round(+(rtnValue * factor).toFixed(decPlaces)) / factor;
    }
    return Number(rtnValue);
  }
  sadTransAmt(strAmt) {
    let result;
    if (this.isNullUndefined(strAmt)) {
      result = 0;
    } else {
      result = this.sadReplaceAll(strAmt, ',');
    }
    return Number(result);
  }
  sadFormatCommaCur(objStr, objPointLength) {
    objStr = objStr + '';
    if (objStr == '' || objStr == null) {
      objStr = '0';
    }
    var arr_val = objStr.split('.');
    var vMinus = '';
    if (objStr.substring(0, 1) == '-') vMinus = '-';

    var vStr = arr_val[0].replace(/[^0123456789]/g, '');
    var i,
      result = '',
      cnt = 0;

    for (i = vStr.length - 1; i >= 0; i--, cnt++) {
      if (cnt > 0 && cnt % 3 == 0) result = ',' + result;
      result = vStr.substring(i, i + 1) + result;
    }
    if (objPointLength == 0) {
      return result;
    }
    if (arr_val.length > 1) {
      vStr = arr_val[1].replace(/[^0123456789]/g, '');

      if (vStr.length >= objPointLength) {
        result += '.' + vStr.substring(0, objPointLength);
      } else {
        result += '.' + vStr;
      }
    } else {
      if (objPointLength > 0) {
        result = result;
      }
    }
    return vMinus + result;
  }

  resetResults(obj) {
    for (const key of Object.keys(obj)) {
      obj[key] = null;
    }
  }

  nullToEmptyString(dateNull) {
    if (dateNull === null) {
      return '';
    } else {
      return dateNull;
    }
  }
  isValidURL(u: string) {
    let elm;
    elm = document.createElement('input');
    elm.setAttribute('type', 'url');
    elm.value = u;
    return elm.validity.valid;
  }
  /**
   * Returns array of Objects with new Value
   * @param arrayOfObj Array of Objects with value to be replaced
   * @param oldValue current value of object to be replaced
   * @param newValue new value to assign to oldValue
   */
  replaceObjectValue(arrayOfObj: any, oldValue: any, newValue: any) {
    if (arrayOfObj !== null) {
      /*  console.log("is Array", Array.isArray(arrayOfObj));
       console.log(
         "is Object",
         typeof arrayOfObj === "object" && arrayOfObj !== null
       ); */
      if (Array.isArray(arrayOfObj)) {
        for (const iterator of arrayOfObj) {
          for (const key in iterator) {
            if (iterator.hasOwnProperty(key)) {
              if (iterator[key] === oldValue) {
                iterator[key] = newValue;
              }
            }
          }
        }
        return arrayOfObj;
      } else if (typeof arrayOfObj === 'object' && arrayOfObj !== null) {
        for (const key in arrayOfObj) {
          if (arrayOfObj.hasOwnProperty(key)) {
            if (arrayOfObj[key] === oldValue) {
              arrayOfObj[key] = newValue;
            }
          }
        }
        return arrayOfObj;
      }
    } else {
      return arrayOfObj;
    }
  }
  /**
   * Go to element
   * @param elementId
   */
  goTo(elementId: string) {
    if (document.getElementById(elementId)) {
      // element which needs to be scrolled to
      var element = document.getElementById(elementId);
      // scroll to element
      element.scrollIntoView();
    }
  }

  splintText(text: string) {
    if (text.includes('_')) {
      return text.replace('_', ' ');
    }
  }

  customErrorMessage(payload: any) {
    let errorMessage = '';

    if (payload.error.status === 500) {
      if (payload.error.error.error === 'Internal Server Error')
        errorMessage = 'Ooooops connection to the server lost, please retry';
      else errorMessage = payload.error.error.error;
    } else if (payload.error.status === 400) {
      let minErrorMessage = '';
      for (let index = 0; index < payload.error.error.errors.length; index++) {
        if (index === payload.error.error.errors.length - 1)
          minErrorMessage += payload.error.error.errors[index].defaultMessage;
        else
          minErrorMessage +=
            payload.error.error.errors[index].defaultMessage + ' , ';
      }

      errorMessage = minErrorMessage;
    }

    return errorMessage;
  }
}
