

class PermissionUtil{
    static isSubset(selectedPermissions,rolePermissions){

        // it check and compare for each permission in each category 
        return Object.keys(selectedPermissions).every(category=>
            rolePermissions[category] && selectedPermissions[category]
            .every(Permission=> rolePermissions[category].includes(Permission))
        )
    }
}


export default PermissionUtil