export const updateObjectInArray = (item: any, itemId: any, objPropsName: any, newObjProps: any) => {
    return item.map((u: any) => {
        if (u[objPropsName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    })
}