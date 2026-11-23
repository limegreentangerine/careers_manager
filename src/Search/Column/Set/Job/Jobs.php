<?php

namespace CareersManager\Search\Column\Set\Job;

use Concrete\Core\Search\Column\Set;
use Concrete\Core\Search\Column\Column;

class Jobs extends Set
{
    public function __construct()
    {
        $this->addColumn(new Column(
            'j.id',
            t('ID'),
            'getID',
            true,
        ));

        $this->addColumn(new Column(
            'j.slug',
            t('Slug'),
            'getSlug',
            false,
        ));

        $this->addColumn(new Column(
            'j.title',
            t('Title'),
            'getTitle',
            true,
        ));

        $this->addColumn(new Column(
            'j.department',
            t('Department'),
            'getDepartment',
            false,
        ));

        $this->addColumn(new Column(
            '',
            t('Location'),
            'getLocationName',
            false,
        ));

        $this->addColumn(new Column(
            '',
            t('Application Method'),
            'getApplyMethod',
            false,
        ));

        $defaultSortColumn = $this->getColumnByKey('j.id');
        $this->setDefaultSortColumn($defaultSortColumn, 'asc');
    }
}
