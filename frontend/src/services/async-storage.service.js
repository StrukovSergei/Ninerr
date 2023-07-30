export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

async function query(entityType, delay = 500) {
    try {
        const entities = JSON.parse(localStorage.getItem(entityType)) || []
        await new Promise(resolve => setTimeout(resolve, delay))
        return entities
    } catch (error) {
        console.error("Error occurred while querying:", error)
        throw error
    }
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType);
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) {
            throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }
        return entity
    } catch (error) {
        console.error("Error occurred while getting:", error)
        throw error
    }
}

async function post(entityType, newEntity) {
    try {
        if (!newEntity._id) {
            newEntity._id = _makeId()
        }
        const entities = await query(entityType)
        entities.push(newEntity)
        await _save(entityType, entities)
        return newEntity
    } catch (error) {
        console.error("Error occurred while posting the entity:", error)
        throw error
    }
}

async function put(entityType, updatedEntity) {
    try {
        updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) {
            throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        }
        entities.splice(idx, 1, updatedEntity)
        await _save(entityType, entities)
        return updatedEntity
    } catch (error) {
        console.error("Error occurred while updating the entity:", error)
        throw error
    }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) {
            throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }
        entities.splice(idx, 1)
        await _save(entityType, entities)
    } catch (error) {
        console.error("Error occurred while removing the entity:", error)
        throw error
    }
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}











// 




// export const storageService = {
//     query,
//     get,
//     post,
//     put,
//     remove,
// }

// function query(entityType, delay = 500) {
//     var entities = JSON.parse(localStorage.getItem(entityType)) || []
//     return new Promise(resolve => setTimeout(() => resolve(entities), delay))
// }

// function get(entityType, entityId) {
//     return query(entityType).then(entities => {
//         const entity = entities.find(entity => entity._id === entityId)
//         if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
//         return entity
//     })
// }

// function post(entityType, newEntity) {
//     newEntity = JSON.parse(JSON.stringify(newEntity))    
//     newEntity._id = _makeId()
//     return query(entityType).then(entities => {
//         entities.push(newEntity)
//         _save(entityType, entities)
//         return newEntity
//     })
// }

// function post(entityType, newEntity) {
//     return query(entityType).then(entities => {
//         if (!newEntity._id) {
//             newEntity._id = _makeId()
//         }
//         entities.push(newEntity)
//         _save(entityType, entities)
//         return newEntity
//     })
// }

// function put(entityType, updatedEntity) {
//     updatedEntity = JSON.parse(JSON.stringify(updatedEntity))    
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//         if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
//         entities.splice(idx, 1, updatedEntity)
//         _save(entityType, entities)
//         return updatedEntity
//     })
// }

// function remove(entityType, entityId) {
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === entityId)
//         if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
//         entities.splice(idx, 1)
//         _save(entityType, entities)
//     })
// }

// // Private functions

// function _save(entityType, entities) {
//     localStorage.setItem(entityType, JSON.stringify(entities))
// }

// function _makeId(length = 5) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }