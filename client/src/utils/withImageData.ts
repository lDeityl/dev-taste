export const withImageData = (data: any): FormData => {
    const formData = new FormData();

    const appendFormData = (key: string, value: any) => {
        if (value === undefined) {
            console.warn(`Value for key '${key}' is undefined.`);
            return; // Skip appending undefined values
        }

        if (key === 'file' && data?.[key]?.[0]) {
            formData.append('file', data[key][0]); // Append the file correctly
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    for (const subKey in item) {
                        appendFormData(`${key}[${index}][${subKey}]`, item[subKey]);
                    }
                } else {
                    formData.append(`${key}[]`, item.toString()); // Convert non-object items to string
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            for (const subKey in value) {
                appendFormData(`${key}[${subKey}]`, value[subKey]);
            }
        } else {
            formData.append(key, value.toString()); // Convert non-object values to string
        }
    };

    for (const key in data) {
        appendFormData(key, data[key]);
    }

    return formData;
};