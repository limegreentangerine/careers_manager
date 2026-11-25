<?php
namespace Concrete\Package\CareersManager\Block\JobList;

use Careers\Ajax\JobList;
use Careers\Entity\Job;
use Careers\Service\Settings;
use Concrete\Core\Block\BlockController;
use Page;
use URL;

/**
 * Front-end jobs listing + detail view.
 * The listing is loaded over AJAX from Careers\Ajax\JobList (/ajax/careers/job-list).
 */
class Controller extends BlockController
{
    protected $btTable = 'btJobList';
    protected $btDefaultSet = 'basic';
    protected $btInterfaceWidth = 600;
    protected $btInterfaceHeight = 450;
    protected $btCacheBlockOutput = false;

    public string $title;
    public string $introText;
    public int $perPage;

    public function getBlockTypeName()
    {
        return t('Job List');
    }

    public function getBlockTypeDescription()
    {
        return t('Searchable list of current vacancies from the Careers jobs manager.');
    }

    public function save($args)
    {
        $args['perPage'] = max(1, min(JobList::MAX_LIMIT, (int) (isset($args['perPage']) ? $args['perPage'] : JobList::DEFAULT_LIMIT)));
        parent::save($args);
    }

    /**
     * Listing view: renders the search form; results are fetched by view.js.
     */
    public function view()
    {
        $this->set('mode', 'list');

        $settings = $this->app->make(Settings::class);
        $query = $this->request->query;

        $radiusOptions = [];
        foreach (Settings::RADIUS_OPTIONS as $miles) {
            $radiusOptions[$miles] = t('Within %s miles', $miles);
        }
        $radiusOptions[0] = t('Any distance');

        $page = Page::getCurrentPage();

        $this->set('postcodeInput', trim((string) $query->get('postcode', '')));
        $this->set('department', trim((string) $query->get('department', '')));
        $this->set('radius', JobList::sanitiseRadius($query->has('radius') ? $query->get('radius') : null, $settings));
        $this->set('radiusOptions', $radiusOptions);
        $this->set('departments', JobList::getLiveDepartments());
        $this->set('endpoint', (string) URL::to('/ajax/careers/job-list'));
        $this->set('cID', $page ? $page->getCollectionID() : 0);
        $this->set('limit', (int) $this->perPage ?: JobList::DEFAULT_LIMIT);
    }

    /**
     * Detail view: /{careers-page}/job/{id}/{slug}.
     */
    public function action_job($id = null, $slug = null)
    {
        $this->set('mode', 'detail');

        $job = $id ? Job::getByID((int) $id) : false;

        if ($job && $job->isLive()) {
            $this->set('job', $job);
            $this->app->make('helper/seo')->addTitleSegmentBefore($job->getTitle());
        } else {
            $this->set('job', null);
        }
    }

    /**
     * URL for the listing with the current search kept, plus any overrides.
     *
     * @return string
     */
    public function getListUrl(array $params = [])
    {
        return JobList::buildUrl((string) URL::to(Page::getCurrentPage()), array_merge($this->getSearchParams(), $params));
    }

    protected function getSearchParams()
    {
        $params = [];
        foreach (JobList::SEARCH_PARAMS as $key) {
            $value = $this->request->query->get($key);
            if (is_string($value) && $value !== '') {
                $params[$key] = $value;
            }
        }

        return $params;
    }
}
