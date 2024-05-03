function filterTypePokemon<T>(array1: T[], array2: T[]): boolean {
    for (let i = 0; i < array2.length; i++) {
        if (!array1.includes(array2[i])) {
            return false;
        }
    }
    return true;
}

export {
    filterTypePokemon
}

