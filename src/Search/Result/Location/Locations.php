<?php

namespace CareersManager\Search\Result\Location;

use ClassKit\Search\Result as SearchResult;

class Locations extends SearchResult
{
    /**
     * @param mixed $result
     */
    public function getItemDetails($result)
    {
        return new Item\Locations($this, $this->listColumns, $result);
    }
}
