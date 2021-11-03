//import { assert } from '@vue/compiler-core';
import { api, log } from './api.js';

function handleResult(result, caller) {
    log(`${caller} was called`);
    log(result);
    return (result['data']);
}


export async function run() {

    const create_general = {
        name: "createmock_general",
        quantity: 3,
        item_type: "profile"
    }

    let result = await api.createItem(create_general);
    const result1 = handleResult(result, 'testCreate');
    console.assert('id' in result1, "createItem no id in response");
    console.assert(result1.name === create_general.name, "createItem names not matching")
    console.assert(result1.quantity === create_general.quantity, "createItem quantity is not matching")

    let toupdate = { ...result1 };
    toupdate.item_type = "current";
    result = await api.updateItem(toupdate)
    const result2 = handleResult(result, 'testUpdate');
    console.assert(result2.id === result1.id, "updateItem ids not matching");
    console.assert(result2.name === result1.name, "updateItem name not matching");
    console.assert(result2.item_type !== result1.item_type, "updateItem item_types not different");

    let toincrement = { ...result2 };
    result = await api.increaseItem(toincrement);
    const result3 = handleResult(result, 'testIncrease');
    console.assert(result3.id === result2.id, "updateItem ids not matching");
    console.assert(result3.name === result2.name, "updateItem name not matching");
    console.assert(result3.item_type === result2.item_type, "updateItem item_types not matching");
    console.assert(result3.quantity === result2.quantity + 1, "updateItem item_types not matching");

    let todelete = { ...result3 };
    result = await api.deleteItem(todelete);
    log('testDelete was called')
    log(result)
    // let todecrement = {
    //     name: "createmock_general",
    //     quantity: 0,
    //     item_type: "profile"
    // };
    // result = await api.decreaseItem(todecrement);
    // const result4 = handleResult(result, 'testDecrease');
}




