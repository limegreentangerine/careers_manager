class JobForm extends HTMLElement {
    constructor() {
        super();

        this.idField = this.querySelector('input[name=id]');
        this.nameField = this.querySelector('input[name=title]');
        this.handleField = this.querySelector('input[name=slug]');
        this.button = this.querySelector('[name=save]');
        this.feedbackContainer = this.querySelector('.feedback-container');
        this.applicationMethod = this.querySelector('[name=applicationMethod]');
        if (!this.nameField || !this.handleField || !this.button || !this.feedbackContainer || !this.applicationMethod) return;

        this.checking = false;
        this.handleApplicationChange();

        if (!this.idField) {
            this.nameField.addEventListener('input', this.debounce(() => this.generateHandle(), 300));
            this.handleField.addEventListener('input', this.debounce(() => this.checkHandle(), 300));
            this.handleField.addEventListener('change', this.checkHandle());
        }
        this.applicationMethod.addEventListener('change', this.handleApplicationChange.bind(this));
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

        await fetch(`/ajax/validation/job/slug?value=${this.handleField.value}`, {
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

    handleApplicationChange() {
        const value = this.applicationMethod.value;
        const appTypes = this.querySelectorAll('[data-apptype]');

        for (const type of appTypes) {
            type.classList.add('d-none');
        }

        const target = this.querySelector(`[data-apptype=${value}]`);
        if (target) {
            target.classList.remove('d-none');
        }
    }
}

if (!customElements.get('component-job-form')) {
    customElements.define('component-job-form', JobForm);
}
