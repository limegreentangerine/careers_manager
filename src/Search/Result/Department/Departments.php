<?php

namespace CareersManager\Search\Result\Department;

use ClassKit\Search\Result as SearchResult;

class Departments extends SearchResult
{
    /**
     * @param mixed $result
     */
    public function getItemDetails($result)
    {
        return new Item\Departments($this, $this->listColumns, $result);
    }
}
