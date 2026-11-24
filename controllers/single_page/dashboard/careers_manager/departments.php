<?php

namespace Concrete\Package\CareersManager\Controller\SinglePage\Dashboard\CareersManager;

use Page;
use CareersManager\Entity\Department;
use Concrete\Core\Filesystem\Element;
use Concrete\Core\Filesystem\ElementManager;
use Concrete\Core\Http\ResponseFactoryInterface;
use Concrete\Core\Page\Controller\DashboardPageController;
use Concrete\Package\CareersManager\Controller\Search\Department\Departments as SearchController;

class Departments extends DashboardPageController
{
    protected $helpers = [
        'form',
    ];

    protected ?Element $headerSearch = null;

    protected function getHeaderSearch()
    {
        if (!isset($this->headerSearch)) {
            $this->headerSearch = $this->app->make(ElementManager::class)->get(
                'dashboard/search/departments',
                [ 'headerSearchAction' => Page::getCurrentPage()->getCollectionLink() ],
                'careers_manager',
            );
        }

        return $this->headerSearch;
    }

    protected function validate(string $name, ?int $id = null)
    {
        $vstrings = app()->make('helper/validation/strings');

        if (!$vstrings->notempty($name)) {
            $this->error->add(t('Name required'));
        }
    }

    public function view()
    {
        $reset = false;

        if ($this->request->isPost()) {
            if (!$this->token->validate('department-search')) {
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

    public function add() {}

    public function details(?int $id = null)
    {
        // if (!$id) {
        //     $this->flash('success', t('Location with ID (%s) not found', $id));
        //     return $this->buildRedirect('/dashboard/careers_manager/locations/add');
        // }

        // $entity = Location::getByID($id);
        // if (!$entity) {
        //     $this->flash('success', t('Location with ID (%s) not found', $id));
        //     return $this->buildRedirect('/dashboard/careers_manager/locations/add');
        // }

        // $this->set('entity', $entity);
    }

    public function save()
    {
        if (!$this->request->isPost()) {
            $this->error->add(t('Invalid request method'));
        }

        if (!$this->token->validate('submit')) {
            $this->error->add($this->token->getErrorMessage());
        }

        $id = $this->request->get('id');
        $name = $this->request->get('name');

        $this->validate($name, $id);

        $this->set('formContent', [
            'id' => $id,
            'name' => $name,
        ]);

        if (!$this->error->has()) {
            $entity = ($id) ? Department::getByID($id) : new Department();
            if (!$entity) {
                $entity = new Department();
            }

            $entity->setName($name);

            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $this->flash('success', t('Department saved'));
            return $this->buildRedirect('/dashboard/careers_manager/departments');
        }
    }

    public function delete(?int $id = null)
    {
        $rf = $this->app->make(ResponseFactoryInterface::class);

        if (!$this->token->validate('delete-department-' . $id)) {
            $this->error->add($this->token->getErrorMessage());
        } elseif ($id !== null) {
            $entity = Department::getByID($id);

            if ($entity && $entity->getID() > 0) {
                // Set deleted message
                $this->flash('success', t('Department Deleted.'));

                // run the delete.
                $this->entityManager->remove($entity);
                $this->entityManager->flush();

                return $rf->json(true);
            }
            $this->error->add(t('Unable to find the specified Department details.'));
        } else {
            $this->error->add(t('Unable to find the specified Department details.'));
        }

        return $rf->json($this->error->jsonSerialize());
    }
}
