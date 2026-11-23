<?php

namespace CareersManager\Search\Result\Job;

use ClassKit\Search\Result as SearchResult;

class Jobs extends SearchResult
{
    /**
     * @param mixed $result
     */
    public function getItemDetails($result)
    {
        return new Item\Jobs($this, $this->listColumns, $result);
    }
}
