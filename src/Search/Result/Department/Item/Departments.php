<?php

namespace CareersManager\Search\Result\Department\Item;

use URL;
use Concrete\Core\Search\Result\Item;
use ClassKit\Search\Result\Item\ItemTrait;

class Departments extends Item
{
    use ItemTrait;

    public function getViewUrl()
    {
        return URL::to('/dashboard/careers_manager/departments/details', $this->getID());
    }
}
