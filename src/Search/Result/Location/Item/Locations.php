<?php

namespace CareersManager\Search\Result\Location\Item;

use URL;
use Concrete\Core\Search\Result\Item;
use ClassKit\Search\Result\Item\ItemTrait;

class Locations extends Item
{
    use ItemTrait;

    public function getViewUrl()
    {
        return URL::to('/dashboard/careers_manager/locations/details', $this->getID());
    }
}
