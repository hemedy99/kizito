export module Enum {
    export function values<T>(enumData: any) {
        let values: T[] = Object.keys(enumData)
            .map(key => enumData[key])
            .filter(k => !(parseInt(k) >= 0));

        return values;
    }

    //this convert enum to select list options
    export function toSelectList(enumData:any) {
        let arrFromEnum = values<string>(enumData);
        //now convert array to key value pair
        let list = arrFromEnum.map(data => {
            return {
                label: data,
                value: data
            }
        });
        return list;
    }
}

export module MyUtils {
    export function isValidJSONString(jsonString: string) {
        try {
            JSON.parse(jsonString);
        } catch (e) {
            return false;
        }
        return true;
    }
    export function isValidJSONObject(jsonObject: any) {
        try {
            JSON.parse(JSON.stringify(jsonObject));
        } catch (e) {
            return false;
        }
        return true;
    }

    export function jsUcFirstChar(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    export function splitCamelCaseString(cameCaseString: string) {
        return jsUcFirstChar(cameCaseString.replace(/([a-z])([A-Z])/g, '$1 $2'));
    }

    export function chunk(array, size) {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunked_arr[chunked_arr.length - 1];
            if (!last || last.length === size) {
                chunked_arr.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunked_arr;
    }

}