
export class Storage {
    static save(key, value) {
        try {
            if (!key || value === undefined) {
                throw new Error("Key and value are required");
            }
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error.message);
        }
    }

    static get(key) {
        try {
            const value = localStorage.getItem(key);
            if (!value) {
                return [];  
            }
            return JSON.parse(value); 
        } catch (error) {
            console.error("Error reading from localStorage:", error.message);
            return [];  
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage:", error.message);
        }
    }
}



