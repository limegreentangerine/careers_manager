<?php

namespace CareersManager\Search\ItemList\Location;

use CareersManager\Entity\Location;
use ClassKit\Search\ItemList\ListTrait;
use Pagerfanta\Doctrine\DBAL\QueryAdapter;
use Concrete\Core\Search\Pagination\Pagination;
use Concrete\Core\Application\ApplicationAwareTrait;
use Concrete\Core\Search\ItemList\Database\ItemList;
use Concrete\Core\Application\ApplicationAwareInterface;

class Locations extends ItemList implements ApplicationAwareInterface
{
    use ListTrait;
    use ApplicationAwareTrait;

    protected $autoSortColumns = [
        'l.id',
        'l.name',
    ];

    protected function createPaginationObject()
    {
        $adapter = new QueryAdapter(
            $this->deliverQueryObject(),
            function (\Doctrine\DBAL\Query\QueryBuilder $query) {
                $query
                    ->resetQueryParts(['groupBy', 'orderBy'])
                    ->select('count(distinct l.id)')
                    ->setMaxResults(1);
            },
        );
        $pagination = new Pagination($this, $adapter);

        return $pagination;
    }

    public function createQuery()
    {
        $this->query->select('l.id')
            ->from('crsLocations', 'l')
        ;
    }

    public function getTotalResults()
    {
        $query = $this->deliverQueryObject();
        $query
            ->resetQueryParts(['groupBy', 'orderBy'])
            ->select('count(distinct l.id)')
            ->setMaxResults(1);
        $result = $query->execute()->fetchOne();

        return (int) $result;
    }

    /**
     * @param mixed $queryRow
     */
    public function getResult($queryRow)
    {
        return Location::getByID($queryRow['id']);
    }
}
