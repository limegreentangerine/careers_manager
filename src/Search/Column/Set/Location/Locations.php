<?php

namespace CareersManager\Search\Column\Set\Location;

use Concrete\Core\Search\Column\Set;
use Concrete\Core\Search\Column\Column;

class Locations extends Set
{
    public function __construct()
    {
        $this->addColumn(new Column(
            'l.id',
            t('ID'),
            'getID',
            true,
        ));

        $this->addColumn(new Column(
            'l.handle',
            t('Handle'),
            'getHandle',
            false,
        ));

        $this->addColumn(new Column(
            'l.name',
            t('Name'),
            'getName',
            true,
        ));

        $this->addColumn(new Column(
            '',
            t('Is Primary?'),
            'getIsPrimaryString',
            false,
        ));

        $defaultSortColumn = $this->getColumnByKey('l.id');
        $this->setDefaultSortColumn($defaultSortColumn, 'asc');
    }
}
