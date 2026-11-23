class LocationForm extends HTMLElement {
    constructor() {
        super();

        this.nameField = this.querySelector('input[name=name]');
        this.handleField = this.querySelector('input[name=handle]');
        this.button = this.querySelector('[name=save]');
        console.log(this.button);
        this.feedbackContainer = this.querySelector('.feedback-container');
        if (!this.nameField || !this.handleField || !this.button || !this.feedbackContainer) return;

        this.checking = false;

        this.nameField.addEventListener('input', this.debounce(() => this.generateHandle(), 300));
        this.handleField.addEventListener('input', this.debounce(() => this.checkHandle(), 300));
        this.handleField.addEventListener('change', this.checkHandle());
    }

    debounce(callback, delay) {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback(...args), delay);
        };
    }

    generateHandle() {
        this.handleField.value = this.convertToHandle(this.nameField.value);
    }

    convertToHandle(str)
    {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^-|-$/g, '');
    }

    async checkHandle() {
        if (this.checking) return;

        this.feedbackContainer.classList.remove('help-block','text-danger');
        this.feedbackContainer.innerHTML = '';

        this.checking = true;

        await fetch(`/ajax/validation/location/handle?value=${this.handleField.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.count > 0) {
                this.feedbackContainer.classList.add('help-block', 'text-danger');
                this.feedbackContainer.innerHTML = `Location with handle ${this.handleField.value} exists`;
            }
        })
        .catch(error => console.error(error))
        .finally(() => (this.checking = false));
    }
}

if (!customElements.get('component-location-form')) {
    customElements.define('component-location-form', LocationForm);
}
