<?php

namespace Concrete\Package\CareersManager\Controller\SinglePage\Dashboard\CareersManager;

use Page;
use CareersManager\Entity\Location;
use Concrete\Core\Filesystem\Element;
use Concrete\Core\Filesystem\ElementManager;
use Concrete\Core\Http\ResponseFactoryInterface;
use Concrete\Core\Page\Controller\DashboardPageController;
use Concrete\Package\CareersManager\Controller\Search\Location\Locations as SearchController;

class Locations extends DashboardPageController
{
    protected $helpers = [
        'form',
    ];

    protected ?Element $headerSearch = null;

    protected function getHeaderSearch()
    {
        if (!isset($this->headerSearch)) {
            $this->headerSearch = $this->app->make(ElementManager::class)->get(
                'dashboard/search/locations',
                [ 'headerSearchAction' => Page::getCurrentPage()->getCollectionLink() ],
                'careers_manager',
            );
        }

        return $this->headerSearch;
    }

    protected function validate(string $name, string $handle, bool $isPrimary, ?int $id = null)
    {
        $vstrings = app()->make('helper/validation/strings');

        if (!$vstrings->notempty($name)) {
            $this->error->add(t('Name required'));
        }

        if (!$vstrings->notempty($handle)) {
            $this->error->add(t('Handle required'));
        }

        $h = Location::getByColumnAndValue('handle', $handle);
        if ($id === null && $h) {
            $this->error->add(t('Location with handle (%s) exists', $handle));
        }

        if (!isset($isPrimary) || !is_bool($isPrimary)) {
            $this->error->add(t('Is Primary should be true or false'));
        }
    }

    protected function includeFormJS()
    {
        $html = app()->make('helper/html');
        $this->addFooterItem($html->javascript('location-form.js', 'careers_manager'));
    }

    protected function includeFormCSS()
    {
        $html = app()->make('helper/html');
        $this->addHeaderItem($html->css('form.css', 'careers_manager'));
    }

    public function on_start()
    {
        parent::on_start();
        $this->includeFormCSS();
    }

    public function view()
    {
        $reset = false;

        if ($this->request->isPost()) {
            if (!$this->token->validate('location-search')) {
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
        if (!$id) {
            $this->flash('success', t('Location with ID (%s) not found', $id));
            return $this->buildRedirect('/dashboard/careers_manager/locations/add');
        }

        $entity = Location::getByID($id);
        if (!$entity) {
            $this->flash('success', t('Location with ID (%s) not found', $id));
            return $this->buildRedirect('/dashboard/careers_manager/locations/add');
        }

        $this->set('entity', $entity);
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
        $handle = $this->request->get('handle');
        $isPrimary = ($this->request->get('isPrimary') !== null) ? true : false;

        $this->validate($name, $handle, $isPrimary, $id);

        $this->set('formContent', [
            'id' => $id,
            'name' => $name,
            'handle' => $handle,
            'isPrimary' => $isPrimary,
        ]);

        if (!$this->error->has()) {
            $entity = ($id) ? Location::getByID($id) : new Location();
            if (!$entity) {
                $entity = new Location();
            }

            $entity->setName($name);
            $entity->setHandle($handle);
            $entity->setIsPrimary($isPrimary);

            $this->entityManager->persist($entity);
            $this->entityManager->flush();

            $this->flash('success', t('Location saved'));
            return $this->buildRedirect('/dashboard/careers_manager/locations');
        }
    }

    public function delete(?int $id = null)
    {
        $rf = $this->app->make(ResponseFactoryInterface::class);

        if (!$this->token->validate('delete-location-' . $id)) {
            $this->error->add($this->token->getErrorMessage());
        } elseif ($id !== null) {
            $entity = Location::getByID($id);

            if ($entity && $entity->getID() > 0) {
                // Set deleted message
                $this->flash('success', t('Location Deleted.'));

                // run the delete.
                $this->entityManager->remove($entity);
                $this->entityManager->flush();

                return $rf->json(true);
            }
            $this->error->add(t('Unable to find the specified Location details.'));
        } else {
            $this->error->add(t('Unable to find the specified Location details.'));
        }

        return $rf->json($this->error->jsonSerialize());
    }
}
