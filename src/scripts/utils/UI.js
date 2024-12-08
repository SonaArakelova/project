// homework
// createElement(element, attributes, children);
// render(element, target);



     function createElement(element, attributes = {}, children) {
        if (!element) {
            throw new Error("Element is required");
        }

        const domElement = document.createElement(element);

        for (const [key, value] of Object.entries(attributes)) {
            domElement.setAttribute(key, value);
        }

        // Handle children
        if (typeof children === 'string') {
            domElement.innerText = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (child instanceof Node) {
                    domElement.appendChild(child);
                } else if (typeof child === 'string') {
                    domElement.appendChild(document.createTextNode(child));
                } else {
                    throw new Error("Invalid child element");
                }
            });
        } else if (children instanceof Node) {
            domElement.appendChild(children);
        }

        return domElement;
    }

     function render(element, target) {
        if (!(element instanceof Node)) {
            throw new Error("The provided element is not valid");
        }
        if (!(target instanceof Node)) {
            throw new Error("The target element is not valid");
        }

        target.appendChild(element);
        return target;
    }


    const UI = {
    render,
    createElement
}

export default UI ; 