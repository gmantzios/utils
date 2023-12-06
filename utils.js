class Utils {
    /**
     * Searches for an object in the provided array based on the given key
     * and a specified property to search within the objects. By default, the property is set to "id".
     * If a match is found, the function returns the corresponding object.
     * If no match is found, the function returns null.
     *
     * @function
     * @param {(number)} key - The key to search for in the array of objects.
     * @param {Array.<Object>} arrayOfObjects - The array of objects to search through.
     * @param {string} [searchKey="id"] - The property within the objects to search for the key (defaults to "id").
     * @returns {?Object} - The found object, or null if no match is found.
     */
    findObjectInArray(key, arrayOfObjects, searchKey = "id") {
        if (
            !Array.isArray(arrayOfObjects) ||
            key === undefined ||
            key === null
        ) {
            return null;
        }

        const foundObject = arrayOfObjects.find(
            (obj) => obj[searchKey] === key
        );

        return foundObject || null;
    }

    /**
     * Finds and returns objects from the first array that have matching keys in the second array.
     *
     * @param {Array<Object>} array1 - The first array of objects to search within.
     * @param {Array<Object>} array2 - The second array of objects to compare against.
     * @param {string} [searchKey='id'] - The object key to use for comparison. Defaults to 'id'.
     * @returns {Array<Object>|null} An array of matching objects or null if no matches are found or input is invalid.
     */
    findMatchingObjects(array1, array2, searchKey = "id") {
        // Validate input
        if (!Array.isArray(array1) || !Array.isArray(array2)) {
            return null;
        }

        // Find matching objects
        const matchingObjects = array1.filter((obj1) =>
            array2.some((obj2) => obj1[searchKey] === obj2[searchKey])
        );
        return matchingObjects.length > 0 ? matchingObjects : null;
    }

    /**
     * Converts a string into a hex color code.
     * @param {string} string - The string to be converted into a color code.
     * @returns {string} The hex color code generated from the string.
     */
    stringToColor(string) {
        if (!string || typeof string !== "string") return;

        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            const minValue = 50;
            const adjustedValue = Math.max(value, minValue);
            color += `00${adjustedValue.toString(16)}`.slice(-2);
        }

        return color;
    }

    /**
     * Returns initials of a given name in a string format.
     * @param {string} name - The name to be converted into initials.
     * @returns {string} The initials of the name as a string.
     */
    getStringInitals(name) {
        if (!name || typeof name !== "string") return;
        const initials =
            name.split(" ").length > 1
                ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
                : `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`;

        return initials.toUpperCase();
    }

    /**
     * Returns the given string to camelCase format.
     * @param {string} key - The string to be converted to camelCase.
     * @returns {string} The converted camelCase string.
     */
    formatToCamelCase = (key) => {
        return key
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");
    };

    /**
     * Replaces spaces with hyphens in the given string.
     * @param {string} inputString - The string to process.
     * @returns {string} - The modified string with spaces replaced by hyphens.
     */
    replaceSpacesWithHyphens = (inputString) => {
        return inputString.replace(/\s+/g, "-");
    };

    /**
     * This function takes an array as input and returns the last item.
     *
     * @param {Array} array - The array from which to retrieve the last item.
     * @returns {any} The last item from the array. If the array is empty, returns `undefined`.
     */
    getLastItem(array) {
        const [last] = array.slice(-1);
        return last;
    }

    /**
     * Clear Empty Keys from an object.
     * Removes keys with empty, undefined, null, or empty array values.
     *
     * @param {Object} obj - The object to be processed.
     * @returns {Object} - The processed object with empty keys removed.
     */
    clearEmptyKeys(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (
                value === "" ||
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0)
            ) {
                delete obj[key];
            }
        }
        return obj;
    }

    /**
     * Recursively clears empty keys from an object or array.
     * Removes keys with empty strings, undefined, null, empty arrays, or empty objects.
     *
     * @param {Object|Array} obj - The object or array to be processed.
     * @returns {Object|Array} - The processed object or array with empty keys and empty objects removed.
     */
    clearDeepEmptyKeys(obj) {
        if (typeof obj !== "object" || obj === null) return obj;

        // Create a shallow copy of the object to avoid modifying read-only properties
        obj = Array.isArray(obj) ? [...obj] : { ...obj };

        if (Array.isArray(obj)) {
            return obj
                .map((value) => this.clearDeepEmptyKeys(value))
                .filter(
                    (value) =>
                        !(
                            typeof value === "object" &&
                            Object.keys(value).length === 0
                        )
                )
                .filter(
                    (value) =>
                        value !== null && value !== undefined && value !== ""
                );
        }

        for (const [key, value] of Object.entries(obj)) {
            if (
                value === "" ||
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0)
            ) {
                delete obj[key];
            } else if (typeof value === "object") {
                obj[key] = this.clearDeepEmptyKeys(value);
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }

    /**
     * Checks if an object is empty.
     *
     * @param {Object} obj - The object to check.
     * @returns {boolean} True if the object is empty or not an object, false otherwise.
     */
    isObjectEmpty(obj) {
        if (typeof obj !== "object" || obj === null) return true;
        return Object.keys(obj).length === 0;
    }

    /**
     * Scrolls smoothly to the top of the page.
     * @param {number} duration - The duration of the scroll animation in milliseconds.
     */
    scrollToTop(duration = 500) {
        const scrollStep = -window.scrollY / (duration / 15); // Adjust scrolling speed here
        const scrollAnimation = () => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
                requestAnimationFrame(scrollAnimation);
            }
        };
        requestAnimationFrame(scrollAnimation);
    }

    /**
     * Extracts the error message from the given error object.
     *
     * @param {object} errorObject - The object that containts the error.
     * @returns {string} Returns the string containing the error message.
     */
    extractErrorMessage = (errorObject) => {
        const keys = Object.keys(errorObject);
        if (keys.length === 0) return null;

        const firstKey = keys[0];
        const firstErrorMessage = errorObject[firstKey];

        // If it's an array, join the messages together with a space.
        const errorMessage = Array.isArray(firstErrorMessage)
            ? firstErrorMessage.join(" ")
            : firstErrorMessage;

        return `${errorMessage}`;
    };

    /*
     * Checks if 2 arrays have the same (primitive)items.
     * @param {Array} arr1 - The firtst array to check.
     * @param {Array} arr2 - The second array to check.
     * @returns {Boolean} Returns true if the arrays have the same items, false if not
     */
    areArraysEqual(arr1, arr2) {
        return (
            arr1?.length === arr2?.length &&
            arr1?.every((element, index) => element === arr2[index])
        );
    }

    /*
     * Adds debounce to a function call
     * @param func - The function to apply the debounce to.
     * @param delay - The delay added to the debounce
     */
    debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    getTypeOfValue = (value) => {
        if (Array.isArray(value)) {
            return "array";
        } else if (typeof value === "object") {
            return "object";
        }
        return typeof value;
    };
}

const service = new Utils();
export default service;
