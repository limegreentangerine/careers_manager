<?php

namespace Concrete\Package\CareersManager\Block\JobList;

use Page;
use CareersManager\Entity\Job;
use Concrete\Core\Block\BlockController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use CareersManager\Search\ItemList\Job\Jobs as JobList;
use CareersManager\Search\ItemList\Department\Departments as DepartmentList;

class Controller extends BlockController
{
    protected $btTable = 'btJobList';
    protected $btDefaultSet = 'basic';
    protected $btInterfaceWidth = 600;
    protected $btInterfaceHeight = 450;
    protected $btCacheBlockOutput = false;

    public bool $showLocationSearch;
    public int $perPage;
    public array $radiusOptions = [10, 25, 50];

    protected function getResultUrl(Page $page, Job $result): string
    {
        return sprintf('%sdetail/%s', $page->getCollectionLink(), $result->getSlug());
    }

    protected function getDepartmentOptions()
    {
        $departments = [];

        $dl = new DepartmentList();
        $dl->sortBy('name', 'asc');
        $results = $dl->getResults();

        foreach ($results as $result) {
            $departments[$result->getID()] = $result->getName();
        }

        return $departments;
    }

    public function getBlockTypeName()
    {
        return t('Job List');
    }

    public function getBlockTypeDescription()
    {
        return t('Searchable list of current vacancies from the Careers jobs manager.');
    }

    public function view()
    {
        $this->set('mode', 'list');

        $radiusOptions = [];
        foreach ($this->radiusOptions as $miles) {
            $radiusOptions[$miles] = t('Within %s miles', $miles);
        }
        $radiusOptions[0] = t('Any distance');

        $this->set('radiusOptions', $radiusOptions);
        $this->set('showLocationSearch', $this->showLocationSearch);
        $this->set('departments', $this->getDepartmentOptions());
        $this->set('perPage', $this->perPage);
    }

    public function listJobs(): Response
    {
        $response = [
            'request' => $_REQUEST,
        ];

        $page = Page::getByID($_REQUEST['cid']);

        $jl = new JobList();

        if (isset($_REQUEST['department'])) {
            $jl->filterByDepartment($_REQUEST['department']);
        }

        $jl->filterByLive();
        $jl->sortBy('date_created', 'desc');
        $jl->setItemsPerPage($_REQUEST['limit']);

        $pagination = $jl->getPagination();
        $pagination->setCurrentPage($_REQUEST['page']);
        $results = $pagination->getCurrentPageResults();
        $response['results'] = count($results);
        $response['page'] = $pagination->hasNextPage() ? ($_REQUEST['page'] + 1) : 0;

        ob_start();
        $view = new \View();
        if (count($results) > 0) {
            foreach ($results as $result) {
                $view->element('/frontend/job_list/result', [
                    'job' => $result,
                    'url' => $this->getResultUrl($page, $result),
                ], 'careers_manager');
            }
        } else {
            $view->element('/frontend/job_list/empty', [], 'careers_manager');
        }
        $response['html'] = ob_get_contents();
        ob_end_clean();

        return new JsonResponse($response, 200);
    }

    public function action_detail(?string $slug = null)
    {
        $this->set('mode', 'detail');
        $page = Page::getCurrentPage();

        $job = $slug ? Job::getByColumnAndValue('slug', $slug) : false;
        if ($job && $job->isLive()) {
            app()->make('helper/seo')->addTitleSegmentBefore($job->getTitle());
            $this->set('job', $job);
            $this->set('page', $page);
        } else {
            return $this->buildRedirect($page->getCollectionLink());
        }
    }

    public function save($args)
    {
        $args['showLocationSearch'] = (isset($args['showLocationSearch'])) ? 1 : 0;
        parent::save($args);
    }

    public function getBackLink(\Concrete\Core\Page\Page $page)
    {
        return $page->getCollectionLink();
    }
}
