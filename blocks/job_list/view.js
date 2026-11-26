class ComponentJobList extends HTMLElement {
	constructor() {
		super();

		this.department = this.querySelector('[name=department]');
		this.button = this.querySelector('.careers-manager__job-list--button');
		this.results = this.querySelector('.careers-manager__job-list--results');
		if (!this.department || !this.button || !this.results) return;

		this.postcode = this.querySelector('[name=postcode]');
		this.radius = this.querySelector('[name=radius]');
		this.perPage = this.button.dataset.limit ?? 10;

		this.department.addEventListener('change', this.resetAndSearch.bind(this));
		this.button.addEventListener('click', this.handleSearch.bind(this));

		this.handleSearch();
	}

	loader(color = 'text-white') {
		return `<div class="spinner-border spinner-border-sm ${color}" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
	}

	buildFilters() {
		let filters = {
			cid: this.button.dataset.cid,
			page: this.button.dataset.page ?? 1,
			limit: this.perPage
		};

		if (this.postcode && this.postcode.value !== '') {
			filters.postcode = this.postcode.value;
		}

		if (this.radius && this.radius.value !== '') {
			filters.radius = this.radius.value;
		}

		if (this.department && this.department.value !== '') {
			filters.department = this.department.value;
		}

		return filters;
	}

	async handleSearch() {
		if (this.button.dataset.page < 1) return;

		const buttonText = this.button.innerHTML;
		const filters = this.buildFilters();
		const params = new URLSearchParams(filters);
		this.button.innerHTML = this.loader();

		await fetch(`/ajax/careers/job/list?${params.toString()}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((response) => {
				this.button.dataset.page = response.page;
				this.results.insertAdjacentHTML('beforeend', response.html);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				this.button.innerHTML = buttonText;
			});
	}

	async resetAndSearch() {
		this.button.dataset.page = 1;
		this.results.innerHTML = '';
		await this.handleSearch();
	}
}

if (!customElements.get('component-job-list')) {
	customElements.define('component-job-list', ComponentJobList);
}
