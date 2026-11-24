<?php

namespace Concrete\Package\CareersManager\Controller\SinglePage\Dashboard\CareersManager;

use Page;
use DateTime;
use CareersManager\Entity\Job;
use CareersManager\Enum\Apply;
use CareersManager\Entity\Location;
use CareersManager\Entity\Department;
use Concrete\Core\Filesystem\Element;
use Concrete\Core\Filesystem\ElementManager;
use Concrete\Core\Http\ResponseFactoryInterface;
use Concrete\Core\Page\Controller\DashboardPageController;
use CareersManager\Search\ItemList\Location\Locations as LocationList;
use CareersManager\Search\ItemList\Department\Departments as DepartmentList;
use Concrete\Package\CareersManager\Controller\Search\Job\Jobs as SearchController;

class Jobs extends DashboardPageController
{
    protected $helpers = [
        'form',
        'form/date_time',
    ];

    protected ?Element $headerSearch = null;

    protected function getHeaderSearch()
    {
        if (!isset($this->headerSearch)) {
            $this->headerSearch = $this->app->make(ElementManager::class)->get(
                'dashboard/search/jobs',
                [ 'headerSearchAction' => Page::getCurrentPage()->getCollectionLink() ],
                'careers_manager',
            );
        }

        return $this->headerSearch;
    }

    protected function validate(
        ?int $id,
        string $title,
        string $slug,
        ?Department $department,
        ?Location $location,
        string $closingDateString,
        bool $isActive,
        string $applicationMethod,
        string $applyEmail,
        string $applyUrl,
    ) {
        $vstrings = app()->make('helper/validation/strings');

        if (!$vstrings->notempty($title)) {
            $this->error->add(t('Title is required'));
        }

        if (!$vstrings->notempty($slug)) {
            $this->error->add(t('Slug is required'));
        }

        $h = Job::getByColumnAndValue('slug', $slug);
        if ($id === null && $h) {
            $this->error->add(t('Job with slug (%s) exists', $slug));
        }

        if (!$department || !$department instanceof Department) {
            $this->error->add(t('Department is required'));
        }

        if (!$location || !$location instanceof Location) {
            $this->error->add(t('Location is required'));
        }

        if (!$vstrings->notempty($closingDateString)) {
            $this->error->add(t('Closing date is required'));
        }

        if (!isset($isActive) || !is_bool($isActive)) {
            $this->error->add(t('Is Active should be true or false'));
        }

        if (!$vstrings->notempty($applicationMethod)) {
            $this->error->add(t('Application method is required'));
        }

        if ($applicationMethod === Apply::EMAIL->value && !$vstrings->notempty($applyEmail)) {
            $this->error->add(t('Application email is required'));
        }

        if ($applicationMethod === Apply::URL->value && !$vstrings->notempty($applyUrl)) {
            $this->error->add(t('Application URL is required'));
        }
    }

    protected function includeFormJS()
    {
        $html = app()->make('helper/html');
        $this->addFooterItem($html->javascript('job-form.js', 'careers_manager'));
    }

    public function hasLocations(): bool
    {
        $ll = new LocationList();
        return (count($ll->getResults()) > 0) ? true : false;
    }

    public function view()
    {
        $reset = false;

        if ($this->request->isPost()) {
            if (!$this->token->validate('job-search')) {
                $this->error->add($this->token->getErrorMessage());
            } else {
                $reset = true;
            }
        }

        $search = $this->app->make(SearchController::class);
        $search->search($reset);

        $result = $search->getSearchResultObject();

        $this->set('result', $result);
        $this->set('items', $result->getItems());
        $this->set('pagination', $result->getPaginationHTML());

        $allowed_num_results = array_combine(
            $search->getAllowedPaginationSizes(),
            $search->getAllowedPaginationSizes(),
        );

        $params = $search->getStickyRequest()->getSearchRequest();
        $this->set('name', isset($params['name']) ? $params['name'] : '');

        if (isset($params['num_results']) && isset($allowed_num_results[$params['num_results']])) {
            $num_results = (int) $params['num_results'];
        } else {
            $num_results = $search->getDefaultPaginationSize();
        }

        $this->set('num_results', $num_results);
        $this->set('params', $params);
        $this->set('allowed_num_results', $allowed_num_results);

        $headerSearch = $this->getHeaderSearch();
        $this->set('headerSearch', $headerSearch);
    }

    public function add()
    {
        $this->includeFormJS();
    }

    public function details(?int $id = null)
    {
        $this->includeFormJS();

        if (!$id) {
            $this->flash('success', t('Job with ID (%s) not found', $id));
            return $this->buildRedirect('/dashboard/careers_manager/jobs/add');
        }

        $entity = Job::getByID($id);
        if (!$entity) {
            $this->flash('success', t('Job with ID (%s) not found', $id));
            return $this->buildRedirect('/dashboard/careers_manager/jobs/add');
        }

        $this->set('entity', $entity);
    }

    public function save()
    {
        $this->includeFormJS();

        if (!$this->request->isPost()) {
            $this->error->add(t('Invalid request method'));
        }

        if (!$this->token->validate('submit')) {
            $this->error->add($this->token->getErrorMessage());
        }

        $id = $this->request->get('id');
        $title = $this->request->get('title');
        $slug = $this->request->get('slug');
        $summary = ($this->request->get('summary') !== '') ? $this->request->get('summary') : null;
        $description = ($this->request->get('description') !== '') ? $this->request->get('description') : null;
        $department = Department::getByID($this->request->get('department'));
        $location = Location::getByID($this->request->get('location'));
        $closingDateString = $this->request->get('closingDate');
        $isActive = $this->request->get('isActive') ? true : false;
        $applicationMethod = $this->request->get('applicationMethod');
        $applyEmail = $this->request->get('applyEmail');
        $applyUrl = $this->request->get('applyUrl');
        $closingDate = new DateTime($closingDateString);

        $this->validate(
            $id,
            $title,
            $slug,
            $department,
            $location,
            $closingDateString,
            $isActive,
            $applicationMethod,
            $applyEmail,
            $applyUrl,
        );

        $this->set('formContent', [
            'id' => $id,
            'title' => $title,
            'slug' => $slug,
            'summary' => $summary,
            'description' => $description,
            'department' => $department->getID() ?? 0,
            'location' => $location->getID() ?? 0,
            'closingDateString' => $closingDateString,
            'isActive' => $isActive,
            'applicationMethod' => $applicationMethod,
            'applyEmail' => $applyEmail,
            'applyUrl' => $applyUrl,
        ]);

        if (!$this->error->has()) {
            $entity = ($id) ? Job::getByID($id) : new Job();
            if (!$entity) {
                $entity = new Job();
            }

            $entity->setTitle($title);
            $entity->setSlug($slug);
            $entity->setSummary($summary);
            $entity->setDescription($description);
            // $entity->setDepartment($department);
            // $entity->setLocation($location);
            $entity->setClosingDate($closingDate);
            $entity->setApplyMethod($applicationMethod);
            $entity->setApplyEmail($applyEmail);
            $entity->setApplyUrl($applyUrl);

            $location->addJob($entity);
            $department->addJob($entity);

            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $this->flash('success', t('Job saved'));
            return $this->buildRedirect('/dashboard/careers_manager/jobs');
        }
    }

    public function getLocations()
    {
        $ll = new LocationList();
        $ll->sortBy('name', 'asc');
        $ll->sortBy('isPrimary', 'asc');

        return $ll->getResults();
    }

    public function getDepartments()
    {
        $dl = new DepartmentList();
        $dl->sortBy('name', 'asc');

        return $dl->getResults();
    }

    public function getApplicationTypes()
    {
        return array_map(
            fn(Apply $case) => [
                'value' => $case->value,
                'label' => ucfirst($case->value),
            ],
            Apply::cases(),
        );
    }

    public function delete(?int $id = null)
    {
        $rf = $this->app->make(ResponseFactoryInterface::class);

        if (!$this->token->validate('delete-job-' . $id)) {
            $this->error->add($this->token->getErrorMessage());
        } elseif ($id !== null) {
            $entity = Job::getByID($id);

            if ($entity && $entity->getID() > 0) {
                // Set deleted message
                $this->flash('success', t('Job Deleted.'));

                // run the delete.
                $this->entityManager->remove($entity);
                $this->entityManager->flush();

                return $rf->json(true);
            }
            $this->error->add(t('Unable to find the specified Job details.'));
        } else {
            $this->error->add(t('Unable to find the specified Job details.'));
        }

        return $rf->json($this->error->jsonSerialize());
    }
}
