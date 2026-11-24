<?php

namespace CareersManager\Search\Column\Set\Department;

use Concrete\Core\Search\Column\Set;
use Concrete\Core\Search\Column\Column;

class Departments extends Set
{
    public function __construct()
    {
        $this->addColumn(new Column(
            'd.id',
            t('ID'),
            'getID',
            true,
        ));

        $defaultSortColumn = $this->getColumnByKey('d.id');
        $this->setDefaultSortColumn($defaultSortColumn, 'asc');
    }
}
