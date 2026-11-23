<?php

namespace Concrete\Package\CareersManager\Controller\Search\Location;

use Concrete\Core\Search\StickyRequest;
use Concrete\Core\Controller\AbstractController;
use CareersManager\Search\ItemList\Location\Locations as SearchList;
use CareersManager\Search\Result\Location\Locations as SearchResult;
use CareersManager\Search\Column\Set\Location\Locations as ColumnSet;

class Locations extends AbstractController
{
    public const LISTING_URI = 'dashboard/careers_manager/locations';

    private ?StickyRequest $stickyRequest = null;

    private ?SearchList $searchList = null;

    private ?SearchResult $searchResult = null;

    protected function getSearchList()
    {
        if ($this->searchList === null) {
            $this->searchList = $this->app->make(SearchList::class, [$this->getStickyRequest()]);
        }

        return $this->searchList;
    }

    public function getStickyRequest()
    {
        if ($this->stickyRequest === null) {
            $this->stickyRequest = new StickyRequest('cm.locations');
        }

        return $this->stickyRequest;
    }

    public function getAllowedPaginationSizes()
    {
        return [
            10,
            20,
            50,
            100,
        ];
    }

    public function getDefaultPaginationSize()
    {
        $allAllowed = $this->getAllowedPaginationSizes();

        return $allAllowed[1];
    }

    public function search($reset = false)
    {
        $stickyRequest = $this->getStickyRequest();
        $searchList = $this->getSearchList();

        if ($reset) {
            $stickyRequest->resetSearchRequest();
        }

        $req = $stickyRequest->getSearchRequest();

        $columnSet = new ColumnSet();

        if (!$searchList->getActiveSortColumn()) {
            $sortColumn = $columnSet->getDefaultSortColumn();
            $searchList->sanitizedSortBy($sortColumn->getColumnKey(), $sortColumn->getColumnDefaultSortDirection());
        }

        $vnumbers = $this->app->make('helper/validation/numbers');
        $req = $stickyRequest->getSearchRequest();

        foreach ($req as $key => $value) {
            if ($value !== null && $value !== '') {
                $searchList->filterBy($key, $value);
            }
        }

        $paginationSize = null;
        $q = isset($req['num_results']) ? $req['num_results'] : null;
        if ($q && $vnumbers->integer($q)) {
            $q = (int) $q;
            $paginationSizes = $this->getAllowedPaginationSizes();
            if (in_array($q, $paginationSizes, true)) {
                $paginationSize = (int) $q;
            }
        }

        if ($paginationSize === null) {
            $paginationSize = $this->getDefaultPaginationSize();
        }

        $searchList->setItemsPerPage($paginationSize);

        $this->searchResult = new SearchResult(
            $columnSet,
            $searchList,
            $this->app->make('url/manager')->resolve([self::LISTING_URI]),
        );
    }

    /**
     * Get the search result (once the search() method has been called).
     *
     * @return SearchResult|null
     */
    public function getSearchResultObject()
    {
        return $this->searchResult;
    }
}
