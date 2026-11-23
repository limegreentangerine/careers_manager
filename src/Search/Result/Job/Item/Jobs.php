<?php

namespace CareersManager\Search\Result\Job\Item;

use URL;
use Concrete\Core\Search\Result\Item;
use ClassKit\Search\Result\Item\ItemTrait;

class Jobs extends Item
{
    use ItemTrait;

    public function getViewUrl()
    {
        return URL::to('/dashboard/careers_manager/jobs/details', $this->getID());
    }
}
